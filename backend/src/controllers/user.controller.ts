import express from 'express'
import ZahtevModel from '../models/zahtev'
import UserModel from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let tip = req.body.tip;

        UserModel.findOne({'username': username, 'password': password, 'tip_korisnika': tip}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{

        let zauzet_username = false;
        let zauzet_email = false;

        UserModel.findOne({'username': req.body.username}, (err, user)=>{
            if(!err) zauzet_username = true;
        })

        ZahtevModel.findOne({'username': req.body.username}, (err, user)=>{
            if(!err) zauzet_username = true;
        })

        UserModel.findOne({'email': req.body.email}, (err, user)=>{
            if(!err) zauzet_email = true;
        })

        ZahtevModel.findOne({'email': req.body.email}, (err, user)=>{
            if(!err) zauzet_email = true;
        })

        if(!zauzet_email && !zauzet_username){
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
            if(zauzet_username)res.json({"message": "Username je zauzet"})
            else if(zauzet_email)res.json({"message": "Email je zauzet"})
        }
    }
}