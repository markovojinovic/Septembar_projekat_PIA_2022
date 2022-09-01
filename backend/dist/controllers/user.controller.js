"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const zahtev_1 = __importDefault(require("../models/zahtev"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
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
            let zauzet_username = false;
            let zauzet_email = false;
            user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                zauzet_username = true;
            });
            zahtev_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                zauzet_username = true;
            });
            user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                zauzet_email = true;
            });
            zahtev_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                zauzet_email = true;
            });
            if (!zauzet_email && !zauzet_username) {
                let user = new zahtev_1.default({
                    ime_i_prezime: req.body.ime_prezime,
                    username: req.body.username,
                    password: req.body.password,
                    adresa: req.body.adresa,
                    tip_korisnika: req.body.type,
                    email: req.body.email,
                    telefon: req.body.telefon
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
                if (zauzet_username)
                    res.json({ "message": "Username je zauzet" });
                else if (zauzet_email)
                    res.json({ "message": "Email je zauzet" });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map