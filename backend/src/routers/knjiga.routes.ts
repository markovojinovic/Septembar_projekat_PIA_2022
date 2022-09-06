import express from 'express'
import { KnjigaController } from '../controllers/knjiga.controller';

const knjigaRouter = express.Router();

knjigaRouter.route('/allBooks').get(
    (req, res)=>new KnjigaController().getAllBooks(req, res)
)

export default knjigaRouter;