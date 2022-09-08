import express from 'express'
import KnjigaModel from '../models/knjiga'

export class KnjigaController{

    getAllBooks = (req: express.Request, res: express.Response)=>{
        KnjigaModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    izmena = (req: express.Request, res: express.Response)=>{
        let book = new KnjigaModel({
            naziv: req.body.naziv,
            autor: req.body.autor,
            zanr: req.body.zanr,
            izdavac: req.body.izdavac,
            godina_izdavanja: req.body.godina_izdavanja,
            jezik: req.body.jezik,
            broj_na_stanju: req.body.broj_na_stanju
        })
        let old_book = new KnjigaModel({
            id: req.body.knjiga.id,
            inaziv: req.body.knjiga.naziv,
            autor: req.body.knjiga.autor,
            zanr: req.body.knjiga.zanr,
            izdavac: req.body.knjiga.izdavac,
            godina_izdavanja: req.body.knjiga.godina_izdavanja,
            jezik: req.body.knjiga.jezik,
            broj_na_stanju: req.body.knjiga.broj_na_stanju
        })
        if(book.naziv == null)
            book.naziv = old_book.naziv
        if(book.autor == null)
            book.autor = old_book.autor
        if(book.zanr == null)
            book.zanr = old_book.zanr
        if(book.izdavac == null)
            book.izdavac = old_book.izdavac
        if(book.godina_izdavanja == null)
            book.godina_izdavanja = old_book.godina_izdavanja
        if(book.jezik == null)
            book.jezik = old_book.jezik
        if(book.broj_na_stanju == null)
            book.broj_na_stanju = old_book.broj_na_stanju

        KnjigaModel.updateOne({'id': old_book.id}, {$set: {'naziv': book.naziv ,'autor': book.autor ,'zanr': book.zanr ,'izdavac': book.izdavac ,'godina_izdavanja': book.godina_izdavanja ,'jezik': book.jezik ,'broj_na_stanju': book.broj_na_stanju}}, (err, resp)=>{
            if(err) console.log(err)
            else 
                res.json({'message': 'ok'})
        })
    }

    obrisi = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        console.log(id)

        KnjigaModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err)
            else if(user != null){
                if(!user.zaduzena){
                    KnjigaModel.deleteOne({'id': id}, (err, user)=>{
                        if(err) console.log(err);
                        else {
                            res.json(user)
                        }
                    })
                }else{
                    res.json({"message": "Knjiga je zaduzena - ne moze se obrisati"})
                }
            }else{
                res.json({"message": "Knjiga ne postoji"})
            }
        })
    }

}