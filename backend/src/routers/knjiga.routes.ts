import express from 'express'
import { KnjigaController } from '../controllers/knjiga.controller';

const knjigaRouter = express.Router();
const multer = require("multer");  

const MIME_TYPE_MAP = {  
    'image/png': 'png',  
    'image/jpeg': 'jpg',  
    'image/jpg': 'jpg'  
  };

const storage = multer.diskStorage({  
    destination: (req, file, cb)=>{  
        const isValid = MIME_TYPE_MAP[file.mimetype];  
        let error = new Error("Invalid Mime Type");  
        if(isValid){  
            error = null;  
        }  
        cb(error, "backend/src/images/books");  
        cb(null, "backend/src/images/books");  
    }, 
    filename: (req, file, cb)=>{  
        const name = file.originalname.toLowerCase().split(' ').join('_');  
        const ext = MIME_TYPE_MAP[file.mimetype];  
        cb(null, name+ '-'+ Date.now()+ '.'+ ext);  
    }  
});

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