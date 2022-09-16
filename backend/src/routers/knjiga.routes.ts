import express from 'express'
import { KnjigaController } from '../controllers/knjiga.controller';

const knjigaRouter = express.Router();

knjigaRouter.route('/allBooks').get(
    (req, res)=>new KnjigaController().getAllBooks(req, res)
)

knjigaRouter.route('/promeni').post(
    (req, res)=>new KnjigaController().izmena(req, res)
)

knjigaRouter.route('/dodaj').post(
    (req, res)=>new KnjigaController().dodaj(req, res)
)

knjigaRouter.route('/obrisi').post(
    (req, res)=>new KnjigaController().obrisi(req, res)
)

knjigaRouter.route('/vrati').post(
    (req, res)=>new KnjigaController().vrati(req, res)
)

knjigaRouter.route('/zaduzi').post(
    (req, res)=>new KnjigaController().zaduzi(req, res)
)

export default knjigaRouter;