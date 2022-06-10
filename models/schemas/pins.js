const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema({
    latitude : {
        type: Number,
        required: true
    },
    latitude : {
        type: Number,
        required: true
    },
    color : {
        type: String,
        required: true
    }
},{ timestamps: true});

const Pin = mongoose.model('Pin', pinSchema);
module.exports = Pin;