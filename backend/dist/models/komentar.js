"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Komentar = new Schema({
    id_knjige: {
        type: Number
    },
    username: {
        type: String
    },
    datum: {
        type: Date
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Komentarodel', Komentar, 'komentari');
//# sourceMappingURL=komentar.js.map