import express from 'express'
import KnjigaModel from '../models/knjiga'

export class KnjigaController{

    getAllBooks = (req: express.Request, res: express.Response)=>{
        KnjigaModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

}