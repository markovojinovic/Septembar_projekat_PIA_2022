import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Knjiga = new Schema({
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
    }
})

export default mongoose.model('KnjigaModel', Knjiga, 'knjige')