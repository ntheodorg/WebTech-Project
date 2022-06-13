const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema({
    street : {
        type: String,
        required: true
    },
    latitude : {
        type: Number,
        required: true
    },
    longitude : {
        type: Number,
        required: true
    },
    color : {
        type: String,
        required: true
    },
    common: {
        type: Number,
        required:true
    },
    metal: {
        type: Number,
        required:true
    }
    ,
    paper: {
        type: Number,
        required:true
    },
    plastic: {
        type: Number,
        required:true
    }
});

const PinSchema = mongoose.model('Pin', pinSchema);
module.exports = PinSchema;