const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    },
    eventLink : {
        type: String,
    }
} , { timestamps : true});

const EventSchema = mongoose.model('Event', eventSchema);
module.exports = EventSchema;