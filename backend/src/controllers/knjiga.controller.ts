import express from 'express'
import KnjigaModel from '../models/knjiga'
import KnjigaZahtevModel from '../models/zahtev_knjiga'
import GlobalnaModel from '../models/globalna'
import ZaduzenModel from '../models/zaduzen'
import IstorijaModel from '../models/istorija'
import ObavestenjaModel from '../models/obavestenja'
import fs from 'fs';

export class KnjigaController{

    getAllBooks = (req: express.Request, res: express.Response)=>{
        KnjigaModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    odobri = (req: express.Request, res: express.Response)=>{
        let knjiga = req.body.knjiga;

        KnjigaZahtevModel.find({'id': knjiga.id}, (err, book)=>{
            if(err) console.log(err)
            else {
                let knj = book
                KnjigaZahtevModel.deleteOne({'id': book.id}, (err, user)=>{
                    if(err) console.log(err);
                    else {
                        let book = new KnjigaModel({
                            id: knj.id,
                            naziv: knj.naziv,
                            autor: knj.autor,
                            zanr: knj.zanr,
                            izdavac: knj.izdavac,
                            godina_izdavanja: knj.godina_izdavanja,
                            jezik: knj.jezik,
                            broj_na_stanju: knj.broj_na_stanju,
                            prosecna_ocena: 3.1,
                            slika_korice: knj.slika_korice,
                            uzimana: 0,
                            zaduzena: 'false'
                        })
                
                        book.save((err, resp)=>{
                            if(err) {
                                res.status(400).json({"message": "error"})
                            }
                            else {
                                let obav = new ObavestenjaModel({
                                    username: knj.username,
                                    tekst: "Knjiga koju ste predlozili je dodata",
                                    nivo: "zelena"
                                })
                        
                                obav.save((err, resp)=>{
                                    if(err) {
                                        console.log(err);
                                        res.status(400).json({"message": "error"})
                                    }
                                    else {
                                        res.json({'message': 'ok'})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    odbi = (req: express.Request, res: express.Response)=>{
        let knjiga = req.body.knjiga;
        KnjigaZahtevModel.deleteOne({'id': knjiga.id}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    produzi = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let username = req.body.username;
        ZaduzenModel.findOne({'id_knjige': id, 'username': username}, (err, books)=>{
            if(err) console.log(err)
            else {
                let zad = books
                GlobalnaModel.findOne({}, (err, globalna)=>{
                    if(err) console.log(err)
                    else {
                        ZaduzenModel.updateOne({'id_knjige': zad.id_knjige}, {$set: {'zaKoliko': globalna.danaZaduzenja, 'produzena': true}}, (err, resp)=>{
                            if(err) console.log(err)
                            else 
                                res.json({'message': 'ok'})
                        })
                    }
                })
            }
        })
    }

    sviZahtevi = (req: express.Request, res: express.Response)=>{
        KnjigaZahtevModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    izmena = (req: express.Request, res: express.Response)=>{

        let slika = req.body.slika;
        let imeSlike = req.body.imeSlika;

        if(slika != null){
            fs.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
            }); 
        }
        else{
            imeSlike = 'def_slika.jpg'
        }

        let book = new KnjigaModel({
            naziv: req.body.naziv,
            autor: req.body.autor,
            zanr: req.body.zanr,
            izdavac: req.body.izdavac,
            godina_izdavanja: req.body.godina_izdavanja,
            jezik: req.body.jezik,
            broj_na_stanju: req.body.broj_na_stanju,
            slika_korice: imeSlike
        })
        let old_book = new KnjigaModel({
            id: req.body.knjiga.id,
            inaziv: req.body.knjiga.naziv,
            autor: req.body.knjiga.autor,
            zanr: req.body.knjiga.zanr,
            izdavac: req.body.knjiga.izdavac,
            godina_izdavanja: req.body.knjiga.godina_izdavanja,
            jezik: req.body.knjiga.jezik,
            broj_na_stanju: req.body.knjiga.broj_na_stanju,
            slika_korice: req.body.knjiga.slika_korice
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
        if(book.slika_korice == null)
            book.slika_korice = old_book.slika_korice

        let priv = book.slika_korice;
        book.slika_korice = book.id;
        book.slika_korice += '_'
        book.slika_korice += priv;

        KnjigaModel.updateOne({'id': old_book.id}, {$set: {'naziv': book.naziv ,'autor': book.autor ,'zanr': book.zanr ,'izdavac': book.izdavac ,'godina_izdavanja': book.godina_izdavanja ,'jezik': book.jezik ,'broj_na_stanju': book.broj_na_stanju}}, (err, resp)=>{
            if(err) console.log(err)
            else 
                res.json({'message': 'ok'})
        })
    }

    dodaj = (req: express.Request, res: express.Response)=>{

        let slika = req.body.slika;
        let imeSlike = req.body.imeSlika;

        if(slika != null){
            fs.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
            }); 
        }
        else{
            imeSlike = 'def_slika.jpg'
        }

        GlobalnaModel.findOne({}, (err, zahtevi)=>{
            if(err) console.log(err)
            else {
                let book = new KnjigaModel({
                    id:zahtevi.id_knjige,
                    naziv: req.body.naziv,
                    autor: req.body.autor,
                    zanr: req.body.zanr,
                    izdavac: req.body.izdavac,
                    godina_izdavanja: req.body.godina_izdavanja,
                    jezik: req.body.jezik,
                    broj_na_stanju: req.body.broj_na_stanju,
                    prosecna_ocena: 3.1,
                    slika_korice: imeSlike,
                    uzimana: 0,
                    zaduzena: 'false'
                })

                let priv = book.slika_korice;
                book.slika_korice = book.id;
                book.slika_korice += '_'
                book.slika_korice += priv;
        
                book.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else {
                        GlobalnaModel.updateOne({}, {$set: {'id_knjige': zahtevi.id_knjige + 1}}, (err, resp)=>{
                            if(err) console.log(err)
                            else 
                                res.json({'message': 'ok'})
                        }) 
                    }
                }) 
            }
        })  
    }

    zahtev = (req: express.Request, res: express.Response)=>{

        let slika = req.body.slika;
        let imeSlike = req.body.imeSlika;
        let username= req.body.username;

        if(slika != null){
            fs.writeFile('./src/assets/users/' + imeSlike, slika, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
            }); 
        }
        else{
            imeSlike = 'def_slika.jpg'
        }

        GlobalnaModel.findOne({}, (err, zahtevi)=>{
            if(err) console.log(err)
            else {

                let book = new KnjigaZahtevModel({
                    id:zahtevi.id_knjige,
                    naziv: req.body.naziv,
                    autor: req.body.autor,
                    zanr: req.body.zanr,
                    izdavac: req.body.izdavac,
                    godina_izdavanja: req.body.godina_izdavanja,
                    jezik: req.body.jezik,
                    broj_na_stanju: req.body.broj_na_stanju,
                    prosecna_ocena: 3.1,
                    slika_korice: imeSlike,
                    uzimana: 0,
                    zaduzena: 'false',
                    username: username
                })

                let priv = book.slika_korice;
                book.slika_korice = book.id;
                book.slika_korice += '_'
                book.slika_korice += priv;
        
                book.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else {
                        GlobalnaModel.updateOne({}, {$set: {'id_knjige': zahtevi.id_knjige + 1}}, (err, resp)=>{
                            if(err) console.log(err)
                            else 
                                res.json({'message': 'ok'})
                        }) 
                    }
                }) 
            }
        })  
    }

    obrisi = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

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

    zaduzi = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let userna = req.body.username;

        KnjigaModel.findOne({'id': id}, (err, knjiga)=>{
            if(err) console.log(err)
            else {
                KnjigaModel.updateOne({'id': id},{$set: {'broj_na_stanju': knjiga.broj_na_stanju - 1, 'zaduzena': true}}, (err, user)=>{
                    if(err) console.log(err);
                    else {
                        let zad = new ZaduzenModel({
                            id_knjige: id,
                            username: userna,
                            datumZaduzenja: Date()
                        })

                        zad.save((err, resp)=>{
                            if(err) {
                                console.log(err);
                            }
                            else {
                                res.json({'message': 'ok'})
                            }
                        })
                    }
                })
            }
        })
    }

    vrati = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let username = req.body.username;
        ZaduzenModel.findOne({'id_knjige': id, 'username': username}, (err, zaduzen)=>{
            if(err) console.log(err)
            else {
                let ist = new IstorijaModel({
                    id_knjige: zaduzen.id_knjige,
                    username: zaduzen.username,
                    datumZaduzenja: zaduzen.datumZaduzenja,
                    datumVracanja: new Date()
                })
        
                ist.save((err, resp)=>{
                    if(err) {
                        res.status(400).json({"message": "error"})
                    }
                    else {
                        ZaduzenModel.deleteOne({'id_knjige' : id, 'username': username}, (err, resp) =>{
                            if(err) console.log(err)
                            else {
                                KnjigaModel.findOne( {'id' : id}, (err, knjiga) =>{
                                    if(err) console.log(err)
                                    else{
                                        KnjigaModel.updateOne( {'id' : id}, {$set: {'broj_na_stanju':knjiga.broj_na_stanju + 1}}, (err, resp) =>{
                                            if(err) console.log(err)
                                            else{
                                                KnjigaModel.updateOne( {'id' : id}, {$set: {'uzimana':knjiga.uzimana + 1}}, (err, resp) =>{
                                                    if(err) console.log(err)
                                                    else 
                                                        res.json({'message': 'ok'})
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

}