import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zaduzenje = new Schema({
    id_knjige: {
        type: Number
    },
    username: {
        type: String
    },
    datumZaduzenja: {
        type: Date
    }
})

export default mongoose.model('ZaduzenModel', Zaduzenje, 'zaduzene_knjige')