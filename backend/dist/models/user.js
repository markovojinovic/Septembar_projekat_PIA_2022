"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
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
    },
    baned: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('UserModel', User, 'korisnici');
//# sourceMappingURL=user.js.map