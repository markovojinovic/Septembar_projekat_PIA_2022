"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zaduzenje = new Schema({
    id_knjige: {
        type: Number
    },
    username: {
        type: String
    },
    datumZaduzenja: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('ZaduzenModel', Zaduzenje, 'zaduzene_knjige');
//# sourceMappingURL=zaduzen.js.map