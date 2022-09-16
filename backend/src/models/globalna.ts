import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Globalna = new Schema({
    id_knjige: {
        type: Number
    },
    danaZaduzenja: {
        type: Number
    }
})

export default mongoose.model('GlobalnaModel', Globalna, 'globalne_vrednosti')