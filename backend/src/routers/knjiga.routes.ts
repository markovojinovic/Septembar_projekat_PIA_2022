import express from 'express'
import { KnjigaController } from '../controllers/knjiga.controller';

const knjigaRouter = express.Router();

knjigaRouter.route('/allBooks').get(
    (req, res)=>new KnjigaController().getAllBooks(req, res)
)

knjigaRouter.route('/promeni').post(
    (req, res)=>new KnjigaController().izmena(req, res)
)

knjigaRouter.route('/obrisi').post(
    (req, res)=>new KnjigaController().obrisi(req, res)
)

export default knjigaRouter;