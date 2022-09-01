import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    ime_i_prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    }
    ,
    email: {
        type: String
    },
    tip_korisnika: {
        type: String
    }
})

export default mongoose.model('ZahtevModel', Zahtev, 'zahtevi_za_registraciju')