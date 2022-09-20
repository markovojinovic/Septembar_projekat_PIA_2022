import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenja = new Schema({
    username: {
        type: String
    },
    nivo: {
        type: String
    },
    tekst: {
        type: String
    }
})

export default mongoose.model('ObavestenjaModel', Obavestenja, 'obavestenja')