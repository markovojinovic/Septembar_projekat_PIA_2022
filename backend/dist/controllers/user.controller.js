"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const zahtev_1 = __importDefault(require("../models/zahtev"));
const user_1 = __importDefault(require("../models/user"));
const zaduzen_1 = __importDefault(require("../models/zaduzen"));
const globalna_1 = __importDefault(require("../models/globalna"));
const istorija_1 = __importDefault(require("../models/istorija"));
const komentar_1 = __importDefault(require("../models/komentar"));
const obavestenja_1 = __importDefault(require("../models/obavestenja"));
const fs_1 = __importDefault(require("fs"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let tip = req.body.tip;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err || user == null) {
                    res.json(err);
                }
                else if (user.type == "admin") {
                    res.json(err);
                }
                else
                    res.json(user);
            });
        };
        this.zabrani = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err || user.type == "admin")
                    console.log(err);
                else {
                    user_1.default.updateOne({ 'username': username }, { $set: { 'baned': true } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            let user = new obavestenja_1.default({
                                username: username,
                                tekst: "Admin je zabranio ovaj nalog",
                                nivo: "crvena"
                            });
                            user.save((err, resp) => {
                                if (err) {
                                    console.log(err);
                                    res.status(400).json({ "message": "error" });
                                }
                                else
                                    res.json({ "message": "ok" });
                            });
                        }
                    });
                }
            });
        };
        this.odblokiraj = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err || user.type == "admin")
                    console.log(err);
                else {
                    user_1.default.updateOne({ 'username': username }, { $set: { 'baned': false } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            obavestenja_1.default.deleteOne({ 'username': username, 'tekst': "Admin je zabranio ovaj nalog" }, (err, user) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ "message": "ok" });
                            });
                        }
                    });
                }
            });
        };
        this.obrisi = (req, res) => {
            let username = req.body.username;
            zaduzen_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user == null) {
                    user_1.default.deleteOne({ 'username': username }, (err, user) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(user);
                    });
                }
                else {
                    res.json({ "message": "Korisnik ima zaduzene knjige - ne moze se obrisati" });
                }
            });
        };
        this.login_admin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let tip = req.body.tip;
            user_1.default.findOne({ 'username': username, 'password': password, 'tip_korisnika': tip }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (user == null) {
                    zahtev_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                        if (user == null) {
                            user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                                if (user == null) {
                                    zahtev_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                                        if (user == null) {
                                            let slika = req.body.slika;
                                            let imeSlike = req.body.imeSlika;
                                            if (slika != null) {
                                                fs_1.default.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                                                    if (err) {
                                                        return console.log(err);
                                                    }
                                                });
                                            }
                                            else {
                                                imeSlike = 'default.jpg';
                                            }
                                            let user = new zahtev_1.default({
                                                ime_i_prezime: req.body.ime_prezime,
                                                username: req.body.username,
                                                password: req.body.password,
                                                adresa: req.body.adresa,
                                                tip_korisnika: req.body.type,
                                                email: req.body.email,
                                                telefon: req.body.telefon,
                                                fotografija: imeSlike
                                            });
                                            user.save((err, resp) => {
                                                if (err) {
                                                    console.log(err);
                                                    res.status(400).json({ "message": "error" });
                                                }
                                                else
                                                    res.json({ "message": "ok" });
                                            });
                                        }
                                        else {
                                            res.json({ "message": "Email je zauzet" });
                                        }
                                    });
                                }
                                else {
                                    res.json({ "message": "Email je zauzet" });
                                }
                            });
                        }
                        else {
                            res.json({ "message": "Username je zauzet" });
                        }
                    });
                }
                else {
                    res.json({ "message": "Username je zauzet" });
                }
            });
        };
        this.dodavanje = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (user == null) {
                    zahtev_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                        if (user == null) {
                            user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                                if (user == null) {
                                    zahtev_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                                        if (user == null) {
                                            let slika = req.body.slika;
                                            let imeSlike = req.body.imeSlika;
                                            if (slika != null) {
                                                fs_1.default.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                                                    if (err) {
                                                        return console.log(err);
                                                    }
                                                });
                                            }
                                            else {
                                                imeSlike = 'default.jpg';
                                            }
                                            let user = new user_1.default({
                                                ime_i_prezime: req.body.ime_prezime,
                                                username: req.body.username,
                                                password: req.body.password,
                                                adresa: req.body.adresa,
                                                tip_korisnika: req.body.type,
                                                email: req.body.email,
                                                telefon: req.body.telefon,
                                                fotografija: imeSlike
                                            });
                                            user.save((err, resp) => {
                                                if (err) {
                                                    console.log(err);
                                                    res.status(400).json({ "message": "error" });
                                                }
                                                else
                                                    res.json({ "message": "ok" });
                                            });
                                        }
                                        else {
                                            res.json({ "message": "Email je zauzet" });
                                        }
                                    });
                                }
                                else {
                                    res.json({ "message": "Email je zauzet" });
                                }
                            });
                        }
                        else {
                            res.json({ "message": "Username je zauzet" });
                        }
                    });
                }
                else {
                    res.json({ "message": "Username je zauzet" });
                }
            });
        };
        this.izmena = (req, res) => {
            let slika = req.body.slika;
            let imeSlike = req.body.imeSlika;
            if (slika != null) {
                fs_1.default.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
            else {
                imeSlike = 'default.jpg';
            }
            let user = new user_1.default({
                ime_i_prezime: req.body.ime_prezime,
                username: req.body.username,
                password: req.body.password,
                adresa: req.body.adresa,
                tip_korisnika: req.body.type,
                email: req.body.email,
                telefon: req.body.telefon,
                fotografija: imeSlike
            });
            let old_user = new user_1.default({
                ime_i_prezime: req.body.korisnik.ime_prezime,
                username: req.body.korisnik.username,
                password: req.body.korisnik.password,
                adresa: req.body.korisnik.adresa,
                tip_korisnika: req.body.korisnik.type,
                email: req.body.korisnik.email,
                telefon: req.body.korisnik.telefon,
                fotografija: req.body.korisnik.fotografija
            });
            if (user.username == null)
                user.username = old_user.username;
            if (user.ime_i_prezime == null)
                user.ime_i_prezime = old_user.ime_i_prezime;
            if (user.password == null)
                user.password = old_user.password;
            if (user.adresa == null)
                user.adresa = old_user.adresa;
            if (user.tip_korisnika == null)
                user.tip_korisnika = old_user.tip_korisnika;
            if (user.email == null)
                user.email = old_user.email;
            if (user.telefon == null)
                user.telefon = old_user.telefon;
            if (user.fotografija == null)
                user.fotografija = old_user.fotografija;
            let priv = user.fotografija;
            user.fotografija = user.username;
            user.fotografija += '_';
            user.fotografija += priv;
            user_1.default.updateOne({ 'username': old_user.username }, { $set: { 'password': user.password, 'username': user.username, 'ime_i_prezime': user.ime_i_prezime, 'adresa': user.adresa, 'tip_korisnika': user.tip_korisnika, 'email': user.email, 'telefon': user.telefon } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izmenaPodataka = (req, res) => {
            let slika = req.body.slika;
            let imeSlike = req.body.imeSlika;
            if (slika != null) {
                fs_1.default.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
            else {
                imeSlike = 'default.jpg';
            }
            let user = new user_1.default({
                ime_i_prezime: req.body.ime_prezime,
                username: req.body.username,
                password: req.body.korisnik.password,
                adresa: req.body.adresa,
                tip_korisnika: req.body.korisnik.type,
                email: req.body.email,
                telefon: req.body.telefon,
                fotografija: imeSlike
            });
            let old_user = new user_1.default({
                ime_i_prezime: req.body.korisnik.ime_prezime,
                username: req.body.korisnik.username,
                password: req.body.korisnik.password,
                adresa: req.body.korisnik.adresa,
                tip_korisnika: req.body.korisnik.type,
                email: req.body.korisnik.email,
                telefon: req.body.korisnik.telefon,
                fotografija: req.body.korisnik.fotografija
            });
            if (user.username == null)
                user.username = old_user.username;
            if (user.ime_i_prezime == null)
                user.ime_i_prezime = old_user.ime_i_prezime;
            if (user.adresa == null)
                user.adresa = old_user.adresa;
            if (user.email == null)
                user.email = old_user.email;
            if (user.telefon == null)
                user.telefon = old_user.telefon;
            if (user.fotografija == null)
                user.fotografija = old_user.fotografija;
            let priv = user.fotografija;
            user.fotografija = user.username;
            user.fotografija += '_';
            user.fotografija += priv;
            user_1.default.updateOne({ 'username': old_user.username }, { $set: { 'password': user.password, 'username': user.username, 'ime_i_prezime': user.ime_i_prezime, 'adresa': user.adresa, 'tip_korisnika': user.tip_korisnika, 'email': user.email, 'telefon': user.telefon } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.promeni = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.komentarisi = (req, res) => {
            let kom = new komentar_1.default({
                username: req.body.username,
                id_knjige: req.body.id,
                komentar: req.body.komentar,
                ocena: req.body.ocena,
                datum: new Date()
            });
            kom.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dohvatiKomentare = (req, res) => {
            let id = req.query.id;
            komentar_1.default.find({ 'id_knjige': id }, (err, komentari) => {
                if (err)
                    console.log(err);
                else
                    res.json(komentari);
            });
        };
        this.promeni_ulogu = (req, res) => {
            let username = req.body.username;
            let tip = "";
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (user.tip_korisnika == "moderator")
                    tip = "korisnik";
                else
                    tip = "moderator";
                user_1.default.updateOne({ 'username': username }, { $set: { 'tip_korisnika': tip } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'ok' });
                });
            });
        };
        this.promeni_dane = (req, res) => {
            let days = req.body.days;
            globalna_1.default.updateOne({}, { $set: { 'danaZaduzenja': days } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dohvati_dane = (req, res) => {
            globalna_1.default.findOne({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi.danaZaduzenja);
            });
        };
        this.sviZahtevi = (req, res) => {
            zahtev_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.svaObavestenja = (req, res) => {
            let username = req.query.username;
            obavestenja_1.default.find({ 'username': username }, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.sviKorisnici = (req, res) => {
            user_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.prihvati = (req, res) => {
            let username = req.body.username;
            let korisnik;
            zahtev_1.default.findOne({ 'username': username }, (err, zahtevi) => {
                korisnik = zahtevi;
                console.log(zahtevi.username);
                zahtev_1.default.deleteOne({ 'username': username }, (err, zah) => {
                    let user = new user_1.default({
                        ime_i_prezime: korisnik.ime_i_prezime,
                        username: korisnik.username,
                        password: korisnik.password,
                        adresa: korisnik.adresa,
                        tip_korisnika: "korisnik",
                        email: korisnik.email,
                        telefon: korisnik.telefon,
                        fotografija: korisnik.fotografija
                    });
                    user.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else
                            res.json({ "message": "ok" });
                    });
                });
            });
        };
        this.istorija = (req, res) => {
            let username = req.query.username;
            istorija_1.default.find({ 'username': username }, (err, istorija) => {
                if (err)
                    console.log(err);
                else
                    res.json(istorija);
            });
        };
        this.zaduzena = (req, res) => {
            let username = req.query.username;
            zaduzen_1.default.find({ 'username': username }, (err, istorija) => {
                if (err)
                    console.log(err);
                else
                    res.json(istorija);
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map