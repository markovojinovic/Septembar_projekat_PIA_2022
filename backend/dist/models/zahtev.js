"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zahtev = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    ime_i_prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    tip_korisnika: {
        type: String
    },
    fotografija: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ZahtevModel', Zahtev, 'zahtevi_za_registraciju');
//# sourceMappingURL=zahtev.js.map