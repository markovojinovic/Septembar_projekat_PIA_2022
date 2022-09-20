import mongoose from "mongoose";

const Schema = mongoose.Schema;

let KnjigaZahtev = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    autor: {
        type: Array
    },
    zanr: {
        type: Array
    },
    izdavac: {
        type: String
    }
    ,
    godina_izdavanja: {
        type: Number
    },
    jezik: {
        type: String
    },
    slika_korice: {
        type: String
    },
    broj_na_stanju: {
        type: Number
    },
    prosecna_ocena:{
        type: Number
    },
    zaduzena:{
        type: Boolean
    },
    uzimana:{
        type: Number
    },
    username:{
        type: String
    }
})

export default mongoose.model('KnjigaZahtevModel', KnjigaZahtev, 'knjiga_zahtevi')