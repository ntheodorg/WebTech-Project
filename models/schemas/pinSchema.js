const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema({
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
    }
});

const PinSchema = mongoose.model('Pin', pinSchema);
module.exports = PinSchema;