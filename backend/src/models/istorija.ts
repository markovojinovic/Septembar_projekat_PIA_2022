import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Istorija = new Schema({
    id_knjige: {
        type: Number
    },
    username: {
        type: String
    },
    datumZaduzenja: {
        type: Date
    },
    datumVracanja: {
        type: Date
    }
})

export default mongoose.model('IstorijaModel', Istorija, 'istorija_zaduzenja')