"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knjiga_controller_1 = require("../controllers/knjiga.controller");
const knjigaRouter = express_1.default.Router();
knjigaRouter.route('/allBooks').get((req, res) => new knjiga_controller_1.KnjigaController().getAllBooks(req, res));
knjigaRouter.route('/promeni').post((req, res) => new knjiga_controller_1.KnjigaController().izmena(req, res));
knjigaRouter.route('/dodaj').post((req, res) => new knjiga_controller_1.KnjigaController().dodaj(req, res));
knjigaRouter.route('/obrisi').post((req, res) => new knjiga_controller_1.KnjigaController().obrisi(req, res));
knjigaRouter.route('/vrati').post((req, res) => new knjiga_controller_1.KnjigaController().vrati(req, res));
knjigaRouter.route('/zaduzi').post((req, res) => new knjiga_controller_1.KnjigaController().zaduzi(req, res));
exports.default = knjigaRouter;
//# sourceMappingURL=knjiga.routes.js.map