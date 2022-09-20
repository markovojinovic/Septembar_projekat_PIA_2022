import express from 'express'
import ZahtevModel from '../models/zahtev'
import UserModel from '../models/user'
import ZaduzenModel from '../models/zaduzen'
import GlobalnaModel from '../models/globalna'
import IstorijaModel from '../models/istorija'
import KomentarModel from '../models/komentar'
import ObavestenjaModel from '../models/obavestenja'
import fs from 'fs';

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let tip = req.body.tip;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err || user == null) {
                res.json(err)
            }
            else if(user.type == "admin"){
                res.json(err)
            }
            else res.json(user)
        })
    }



    zabrani = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOne({'username': username}, (err, user)=>{
            if(err || user.type == "admin") console.log(err);
            else {
                UserModel.updateOne({'username': username}, {$set: {'baned': true}}, (err, resp)=>{
                    if(err) console.log(err)
                    else 
                        {
                            let user = new ObavestenjaModel({
                                username: username,
                                tekst: "Admin je zabranio ovaj nalog",
                                nivo: "crvena"
                            })
                
                            user.save((err, resp)=>{
                                if(err) {
                                    console.log(err);
                                    res.status(400).json({"message": "error"})
                                }
                                else res.json({"message": "ok"})
                            })
                        }
                })
            }
        })
    }

    odblokiraj = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOne({'username': username}, (err, user)=>{
            if(err || user.type == "admin") console.log(err);
            else {
                UserModel.updateOne({'username': username}, {$set: {'baned': false}}, (err, resp)=>{
                    if(err) console.log(err)
                    else 
                        {
                            ObavestenjaModel.deleteOne({'username': username, 'tekst': "Admin je zabranio ovaj nalog"}, (err, user)=>{
                                if(err) console.log(err);
                                else res.json({"message": "ok"})
                            })
                        }
                })
            }
        })
    }

    obrisi = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        ZaduzenModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else if(user == null){
                UserModel.deleteOne({'username': username}, (err, user)=>{
                    if(err) console.log(err);
                    else res.json(user)
                })
            }else{
                res.json({"message": "Korisnik ima zaduzene knjige - ne moze se obrisati"})
            }
        })
    }

    login_admin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let tip = req.body.tip;

        UserModel.findOne({'username': username, 'password': password, 'tip_korisnika': tip}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{

        UserModel.findOne({'username': req.body.username}, (err, user)=>{
            if(user == null) {
                ZahtevModel.findOne({'username': req.body.username}, (err, user)=>{
                    if(user == null) {
                        UserModel.findOne({'email': req.body.email}, (err, user)=>{
                            if(user == null){
                                ZahtevModel.findOne({'email': req.body.email}, (err, user)=>{
                                    if(user == null) {

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
                                            imeSlike = 'default.jpg'
                                        }

                                        let user = new ZahtevModel({
                                            ime_i_prezime: req.body.ime_prezime,
                                            username: req.body.username,
                                            password: req.body.password,
                                            adresa: req.body.adresa,
                                            tip_korisnika: req.body.type,
                                            email: req.body.email,
                                            telefon: req.body.telefon,
                                            fotografija: imeSlike
                                        })
                            
                                        user.save((err, resp)=>{
                                            if(err) {
                                                console.log(err);
                                                res.status(400).json({"message": "error"})
                                            }
                                            else res.json({"message": "ok"})
                                        })
                                        
                                    }else{
                                        res.json({"message": "Email je zauzet"})
                                    }
                                })
                            }else{
                                res.json({"message": "Email je zauzet"})
                            }
                        })
                    }
                    else{
                        res.json({"message": "Username je zauzet"})
                    }
                })
            }else{
                res.json({"message": "Username je zauzet"})
            }
        })

        }

        dodavanje = (req: express.Request, res: express.Response)=>{
            UserModel.findOne({'username': req.body.username}, (err, user)=>{
                if(user == null) {
                    ZahtevModel.findOne({'username': req.body.username}, (err, user)=>{
                        if(user == null) {
                            UserModel.findOne({'email': req.body.email}, (err, user)=>{
                                if(user == null){
                                    ZahtevModel.findOne({'email': req.body.email}, (err, user)=>{
                                        if(user == null) {

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
                                                imeSlike = 'default.jpg'
                                            }
    
                                            let user = new UserModel({
                                                ime_i_prezime: req.body.ime_prezime,
                                                username: req.body.username,
                                                password: req.body.password,
                                                adresa: req.body.adresa,
                                                tip_korisnika: req.body.type,
                                                email: req.body.email,
                                                telefon: req.body.telefon,
                                                fotografija: imeSlike
                                            })
                                
                                            user.save((err, resp)=>{
                                                if(err) {
                                                    console.log(err);
                                                    res.status(400).json({"message": "error"})
                                                }
                                                else res.json({"message": "ok"})
                                            })
                                            
                                        }else{
                                            res.json({"message": "Email je zauzet"})
                                        }
                                    })
                                }else{
                                    res.json({"message": "Email je zauzet"})
                                }
                            })
                        }
                        else{
                            res.json({"message": "Username je zauzet"})
                        }
                    })
                }else{
                    res.json({"message": "Username je zauzet"})
                }
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
                imeSlike = 'default.jpg'
            }

            let user = new UserModel({
                ime_i_prezime: req.body.ime_prezime,
                username: req.body.username,
                password: req.body.password,
                adresa: req.body.adresa,
                tip_korisnika: req.body.type,
                email: req.body.email,
                telefon: req.body.telefon,
                fotografija: imeSlike
            })
            let old_user = new UserModel({
                ime_i_prezime: req.body.korisnik.ime_prezime,
                username: req.body.korisnik.username,
                password: req.body.korisnik.password,
                adresa: req.body.korisnik.adresa,
                tip_korisnika: req.body.korisnik.type,
                email: req.body.korisnik.email,
                telefon: req.body.korisnik.telefon,
                fotografija: req.body.korisnik.fotografija
            })
            if(user.username == null)
                user.username = old_user.username
            if(user.ime_i_prezime == null)
                user.ime_i_prezime = old_user.ime_i_prezime
            if(user.password == null)
                user.password = old_user.password
            if(user.adresa == null)
                user.adresa = old_user.adresa
            if(user.tip_korisnika == null)
                user.tip_korisnika = old_user.tip_korisnika
            if(user.email == null)
                user.email = old_user.email
            if(user.telefon == null)
                user.telefon = old_user.telefon
            if(user.fotografija == null)
                user.fotografija = old_user.fotografija

            let priv = user.fotografija;
            user.fotografija = user.username;
            user.fotografija += '_'
            user.fotografija += priv;

            UserModel.updateOne({'username': old_user.username}, {$set: {'password': user.password ,'username': user.username ,'ime_i_prezime': user.ime_i_prezime ,'adresa': user.adresa ,'tip_korisnika': user.tip_korisnika ,'email': user.email ,'telefon': user.telefon}}, (err, resp)=>{
                if(err) console.log(err)
                else 
                    res.json({'message': 'ok'})
            })
        }

        izmenaPodataka = (req: express.Request, res: express.Response)=>{

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
                imeSlike = 'default.jpg'
            }

            let user = new UserModel({
                ime_i_prezime: req.body.ime_prezime,
                username: req.body.username,
                password: req.body.korisnik.password,
                adresa: req.body.adresa,
                tip_korisnika: req.body.korisnik.type,
                email: req.body.email,
                telefon: req.body.telefon,
                fotografija: imeSlike
            })
            let old_user = new UserModel({
                ime_i_prezime: req.body.korisnik.ime_prezime,
                username: req.body.korisnik.username,
                password: req.body.korisnik.password,
                adresa: req.body.korisnik.adresa,
                tip_korisnika: req.body.korisnik.type,
                email: req.body.korisnik.email,
                telefon: req.body.korisnik.telefon,
                fotografija: req.body.korisnik.fotografija
            })
            if(user.username == null)
                user.username = old_user.username
            if(user.ime_i_prezime == null)
                user.ime_i_prezime = old_user.ime_i_prezime
            if(user.adresa == null)
                user.adresa = old_user.adresa
            if(user.email == null)
                user.email = old_user.email
            if(user.telefon == null)
                user.telefon = old_user.telefon
            if(user.fotografija == null)
                user.fotografija = old_user.fotografija

            let priv = user.fotografija;
            user.fotografija = user.username;
            user.fotografija += '_'
            user.fotografija += priv;

            UserModel.updateOne({'username': old_user.username}, {$set: {'password': user.password ,'username': user.username ,'ime_i_prezime': user.ime_i_prezime ,'adresa': user.adresa ,'tip_korisnika': user.tip_korisnika ,'email': user.email ,'telefon': user.telefon}}, (err, resp)=>{
                if(err) console.log(err)
                else 
                    res.json({'message': 'ok'})
            })
        }

        promeni = (req: express.Request, res: express.Response)=>{
            let username = req.body.username;
            let password = req.body.password;
            UserModel.updateOne({'username': username}, {$set: {'password': password}}, (err, resp)=>{
                if(err) console.log(err)
                else 
                    res.json({'message': 'ok'})
            })
        }

        komentarisi = (req: express.Request, res: express.Response)=>{

            let kom = new KomentarModel({
                username : req.body.username,
                id_knjige : req.body.id,
                komentar : req.body.komentar,
                ocena : req.body.ocena,
                datum : new Date()
            })

            kom.save((err, resp)=>{
                if(err) {
                    console.log(err);
                    res.status(400).json({"message": "error"})
                }
                else res.json({"message": "ok"})
            })
            
        }

        dohvatiKomentare = (req: express.Request, res: express.Response)=>{
            let id = req.query.id;
            KomentarModel.find({'id_knjige' : id}, (err, komentari)=>{
                if(err) console.log(err)
                else res.json(komentari)
            })
        }

        promeni_ulogu = (req: express.Request, res: express.Response)=>{
            let username = req.body.username;
            let tip = ""
            UserModel.findOne({'username': username}, (err, user)=>{
                if(user.tip_korisnika == "moderator")
                    tip = "korisnik"
                else    
                    tip = "moderator"
                UserModel.updateOne({'username': username}, {$set: {'tip_korisnika': tip}}, (err, resp)=>{
                    if(err) console.log(err)
                    else 
                        res.json({'message': 'ok'})
                })  
            })
        }

        promeni_dane = (req: express.Request, res: express.Response)=>{
            let days = req.body.days
            GlobalnaModel.updateOne({}, {$set: {'danaZaduzenja': days}}, (err, resp)=>{
                if(err) console.log(err)
                else 
                    res.json({'message': 'ok'})
            })  
        }

        dohvati_dane = (req: express.Request, res: express.Response)=>{
            GlobalnaModel.findOne({}, (err, zahtevi)=>{
                if(err) console.log(err)
                else res.json(zahtevi.danaZaduzenja)
            })  
        }

        sviZahtevi = (req: express.Request, res: express.Response)=>{
            ZahtevModel.find({}, (err, zahtevi)=>{
                if(err) console.log(err)
                else res.json(zahtevi)
            })
        }

        svaObavestenja = (req: express.Request, res: express.Response)=>{
            let username = req.query.username;
            ObavestenjaModel.find({'username': username}, (err, zahtevi)=>{
                if(err) console.log(err)
                else res.json(zahtevi)
            })
        }

        sviKorisnici = (req: express.Request, res: express.Response)=>{
            UserModel.find({}, (err, zahtevi)=>{
                if(err) console.log(err)
                else res.json(zahtevi)
            })
        }

        prihvati = (req: express.Request, res: express.Response)=>{
            let username = req.body.username
            let korisnik;

            ZahtevModel.findOne({'username': username}, (err, zahtevi)=>{
                korisnik = zahtevi
                console.log(zahtevi.username)
                ZahtevModel.deleteOne({'username': username}, (err, zah)=>{
                    let user = new UserModel({
                        ime_i_prezime: korisnik.ime_i_prezime,
                        username: korisnik.username,
                        password: korisnik.password,
                        adresa: korisnik.adresa,
                        tip_korisnika: "korisnik",
                        email: korisnik.email,
                        telefon: korisnik.telefon,
                        fotografija: korisnik.fotografija
                    })
        
                    user.save((err, resp)=>{
                        if(err) {
                            console.log(err);
                            res.status(400).json({"message": "error"})
                        }
                        else res.json({"message": "ok"})
                    })
                })
            })
        }

        istorija = (req: express.Request, res: express.Response)=>{
            let username = req.query.username

            IstorijaModel.find({'username': username}, (err, istorija)=>{
                if(err) console.log(err)
                else res.json(istorija)
            })
        }

        zaduzena = (req: express.Request, res: express.Response)=>{
            let username = req.query.username

            ZaduzenModel.find({'username': username}, (err, istorija)=>{
                if(err) console.log(err)
                else res.json(istorija)
            })
        }

}