"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knjiga_controller_1 = require("../controllers/knjiga.controller");
const knjigaRouter = express_1.default.Router();
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
        cb(error, "backend/src/images/books");
        cb(null, "backend/src/images/books");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
knjigaRouter.route('/allBooks').get((req, res) => new knjiga_controller_1.KnjigaController().getAllBooks(req, res));
knjigaRouter.route('/promeni').post((req, res) => new knjiga_controller_1.KnjigaController().izmena(req, res));
knjigaRouter.route('/dodaj').post((req, res) => new knjiga_controller_1.KnjigaController().dodaj(req, res));
knjigaRouter.route('/obrisi').post((req, res) => new knjiga_controller_1.KnjigaController().obrisi(req, res));
knjigaRouter.route('/vrati').post((req, res) => new knjiga_controller_1.KnjigaController().vrati(req, res));
knjigaRouter.route('/zaduzi').post((req, res) => new knjiga_controller_1.KnjigaController().zaduzi(req, res));
knjigaRouter.route('/zahtev').post((req, res) => new knjiga_controller_1.KnjigaController().zahtev(req, res));
knjigaRouter.route('/sviZahtevi').get((req, res) => new knjiga_controller_1.KnjigaController().sviZahtevi(req, res));
exports.default = knjigaRouter;
//# sourceMappingURL=knjiga.routes.js.map