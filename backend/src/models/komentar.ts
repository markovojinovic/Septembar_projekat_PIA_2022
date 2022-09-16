import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Komentar = new Schema({
    id_knjige: {
        type: Number
    },
    username: {
        type: String
    },
    datum: {
        type: Date
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    }
})

export default mongoose.model('Komentarodel', Komentar, 'komentari')