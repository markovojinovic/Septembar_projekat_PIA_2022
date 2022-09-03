"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Knjiga = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    autor: {
        type: Array
    },
    zanr: {
        type: Array
    },
    izdavac: {
        type: String
    },
    godina_izdavanja: {
        type: Number
    },
    jezik: {
        type: String
    },
    slika_korice: {
        type: String
    },
    broj_na_stanju: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('KnjigaModel', Knjiga, 'knjige');
//# sourceMappingURL=knjiga.js.map