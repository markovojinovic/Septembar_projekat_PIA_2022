"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Istorija = new Schema({
    id_knjige: {
        type: Number
    },
    username: {
        type: String
    },
    datumZaduzenja: {
        type: Date
    },
    datumVracanja: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('IstorijaModel', Istorija, 'istorija_zaduzenja');
//# sourceMappingURL=istorija.js.map