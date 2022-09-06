import express from 'express'
import ZahtevModel from '../models/zahtev'
import UserModel from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let tip = req.body.tip;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err || user.type == "admin") console.log(err);
            else res.json(user)
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

                                        let user = new ZahtevModel({
                                            ime_i_prezime: req.body.ime_prezime,
                                            username: req.body.username,
                                            password: req.body.password,
                                            adresa: req.body.adresa,
                                            tip_korisnika: req.body.type,
                                            email: req.body.email,
                                            telefon: req.body.telefon
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
            let user = new UserModel({
                ime_i_prezime: req.body.ime_prezime,
                username: req.body.username,
                password: req.body.password,
                adresa: req.body.adresa,
                tip_korisnika: req.body.type,
                email: req.body.email,
                telefon: req.body.telefon
            })

            user.save((err, resp)=>{
                if(err) {
                    console.log(err);
                    res.status(400).json({"message": "error"})
                }
                else res.json({"message": "ok"})
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

}