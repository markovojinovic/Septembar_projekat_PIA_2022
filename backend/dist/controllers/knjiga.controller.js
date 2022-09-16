"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnjigaController = void 0;
const knjiga_1 = __importDefault(require("../models/knjiga"));
const globalna_1 = __importDefault(require("../models/globalna"));
const zaduzen_1 = __importDefault(require("../models/zaduzen"));
const istorija_1 = __importDefault(require("../models/istorija"));
class KnjigaController {
    constructor() {
        this.getAllBooks = (req, res) => {
            knjiga_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.izmena = (req, res) => {
            let book = new knjiga_1.default({
                naziv: req.body.naziv,
                autor: req.body.autor,
                zanr: req.body.zanr,
                izdavac: req.body.izdavac,
                godina_izdavanja: req.body.godina_izdavanja,
                jezik: req.body.jezik,
                broj_na_stanju: req.body.broj_na_stanju
            });
            let old_book = new knjiga_1.default({
                id: req.body.knjiga.id,
                inaziv: req.body.knjiga.naziv,
                autor: req.body.knjiga.autor,
                zanr: req.body.knjiga.zanr,
                izdavac: req.body.knjiga.izdavac,
                godina_izdavanja: req.body.knjiga.godina_izdavanja,
                jezik: req.body.knjiga.jezik,
                broj_na_stanju: req.body.knjiga.broj_na_stanju
            });
            if (book.naziv == null)
                book.naziv = old_book.naziv;
            if (book.autor == null)
                book.autor = old_book.autor;
            if (book.zanr == null)
                book.zanr = old_book.zanr;
            if (book.izdavac == null)
                book.izdavac = old_book.izdavac;
            if (book.godina_izdavanja == null)
                book.godina_izdavanja = old_book.godina_izdavanja;
            if (book.jezik == null)
                book.jezik = old_book.jezik;
            if (book.broj_na_stanju == null)
                book.broj_na_stanju = old_book.broj_na_stanju;
            knjiga_1.default.updateOne({ 'id': old_book.id }, { $set: { 'naziv': book.naziv, 'autor': book.autor, 'zanr': book.zanr, 'izdavac': book.izdavac, 'godina_izdavanja': book.godina_izdavanja, 'jezik': book.jezik, 'broj_na_stanju': book.broj_na_stanju } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dodaj = (req, res) => {
            globalna_1.default.findOne({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else {
                    let book = new knjiga_1.default({
                        id: zahtevi.id_knjige,
                        naziv: req.body.naziv,
                        autor: req.body.autor,
                        zanr: req.body.zanr,
                        izdavac: req.body.izdavac,
                        godina_izdavanja: req.body.godina_izdavanja,
                        jezik: req.body.jezik,
                        broj_na_stanju: req.body.broj_na_stanju,
                        prosecna_ocena: 3.1,
                        slika_korice: "def_slika.jpg",
                        uzimana: 0,
                        zaduzena: 'false'
                    });
                    book.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else {
                            globalna_1.default.updateOne({}, { $set: { 'id_knjige': zahtevi.id_knjige + 1 } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ 'message': 'ok' });
                            });
                        }
                    });
                }
            });
        };
        this.obrisi = (req, res) => {
            let id = req.body.id;
            knjiga_1.default.findOne({ 'id': id }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user != null) {
                    if (!user.zaduzena) {
                        knjiga_1.default.deleteOne({ 'id': id }, (err, user) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json(user);
                            }
                        });
                    }
                    else {
                        res.json({ "message": "Knjiga je zaduzena - ne moze se obrisati" });
                    }
                }
                else {
                    res.json({ "message": "Knjiga ne postoji" });
                }
            });
        };
        this.zaduzi = (req, res) => {
            let id = req.body.id;
            let userna = req.body.username;
            knjiga_1.default.findOne({ 'id': id }, (err, knjiga) => {
                if (err)
                    console.log(err);
                else {
                    knjiga_1.default.updateOne({ 'id': id }, { $set: { 'broj_na_stanju': knjiga.broj_na_stanju - 1, 'zaduzena': true } }, (err, user) => {
                        if (err)
                            console.log(err);
                        else {
                            let zad = new zaduzen_1.default({
                                id_knjige: id,
                                username: userna,
                                datumZaduzenja: Date()
                            });
                            zad.save((err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.json({ 'message': 'ok' });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.vrati = (req, res) => {
            let id = req.body.id;
            let username = req.body.username;
            zaduzen_1.default.findOne({ 'id_knjige': id, 'username': username }, (err, zaduzen) => {
                if (err)
                    console.log(err);
                else {
                    let ist = new istorija_1.default({
                        id_knjige: zaduzen.id_knjige,
                        username: zaduzen.username,
                        datumZaduzenja: zaduzen.datumZaduzenja,
                        datumVracanja: new Date()
                    });
                    ist.save((err, resp) => {
                        if (err) {
                            res.status(400).json({ "message": "error" });
                        }
                        else {
                            zaduzen_1.default.deleteOne({ 'id_knjige': id, 'username': username }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else {
                                    knjiga_1.default.findOne({ 'id': id }, (err, knjiga) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            knjiga_1.default.updateOne({ 'id': id }, { $set: { 'broj_na_stanju': knjiga.broj_na_stanju + 1 } }, (err, resp) => {
                                                if (err)
                                                    console.log(err);
                                                else {
                                                    knjiga_1.default.updateOne({ 'id': id }, { $set: { 'uzimana': knjiga.uzimana + 1 } }, (err, resp) => {
                                                        if (err)
                                                            console.log(err);
                                                        else
                                                            res.json({ 'message': 'ok' });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.KnjigaController = KnjigaController;
//# sourceMappingURL=knjiga.controller.js.map