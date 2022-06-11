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
    link : {
        type: String,
        required: true
    }
});

const EventSchema = mongoose.model('Event', eventSchema);
module.exports = EventSchema;