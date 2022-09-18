"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const zahtev_1 = __importDefault(require("../models/zahtev"));
const user_1 = __importDefault(require("../models/user"));
const userRouter = express_1.default.Router();
const multer = require("multer");
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/src/images/users");
        cb(null, "backend/src/images/users");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
userRouter.route('/register').post(multer(storage).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (user == null) {
            zahtev_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (user == null) {
                    user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                        if (user == null) {
                            zahtev_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                                if (user == null) {
                                    let user = new zahtev_1.default({
                                        ime_i_prezime: req.body.ime_prezime,
                                        username: req.body.username,
                                        password: req.body.password,
                                        adresa: req.body.adresa,
                                        tip_korisnika: req.body.type,
                                        email: req.body.email,
                                        telefon: req.body.telefon,
                                        fotografija: url + "/images"
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
});
userRouter.route('/dodaj').post(multer(storage).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (user == null) {
            zahtev_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (user == null) {
                    user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                        if (user == null) {
                            zahtev_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                                if (user == null) {
                                    let user = new user_1.default({
                                        ime_i_prezime: req.body.ime_prezime,
                                        username: req.body.username,
                                        password: req.body.password,
                                        adresa: req.body.adresa,
                                        tip_korisnika: req.body.type,
                                        email: req.body.email,
                                        telefon: req.body.telefon,
                                        fotografija: url + "/images" + req.body.filename
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
});
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/login_admin').post((req, res) => new user_controller_1.UserController().login_admin(req, res));
userRouter.route('/promeni_ulogu').post((req, res) => new user_controller_1.UserController().promeni_ulogu(req, res));
userRouter.route('/promeni_dane').post((req, res) => new user_controller_1.UserController().promeni_dane(req, res));
userRouter.route('/dohvati_dane').get((req, res) => new user_controller_1.UserController().dohvati_dane(req, res));
userRouter.route('/obrisi').post((req, res) => new user_controller_1.UserController().obrisi(req, res));
userRouter.route('/izmena').post((req, res) => new user_controller_1.UserController().izmena(req, res));
userRouter.route('/izmenaPodataka').post((req, res) => new user_controller_1.UserController().izmenaPodataka(req, res));
userRouter.route('/promeni-lozinku').post((req, res) => new user_controller_1.UserController().promeni(req, res));
userRouter.route('/komentarisi').post((req, res) => new user_controller_1.UserController().komentarisi(req, res));
userRouter.route('/sviZahtevi').get((req, res) => new user_controller_1.UserController().sviZahtevi(req, res));
userRouter.route('/sviKomentari').get((req, res) => new user_controller_1.UserController().dohvatiKomentare(req, res));
userRouter.route('/sviKorisnici').get((req, res) => new user_controller_1.UserController().sviKorisnici(req, res));
userRouter.route('/odobri').post((req, res) => new user_controller_1.UserController().prihvati(req, res));
userRouter.route('/istorija').get((req, res) => new user_controller_1.UserController().istorija(req, res));
userRouter.route('/zaduzene').get((req, res) => new user_controller_1.UserController().zaduzena(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map