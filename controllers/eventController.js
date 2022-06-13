const eventModel = require('../models/eventModel');

const event_post = (req,res) => {
    eventModel.saveEvent(req.body,res);
}

const event_get = (req,res) => {
    eventModel.getAllEvents(res);
}

const event_delete = (req,res) => {
    eventModel.deleteEvent(req.body,res);
}

module.exports = {
    event_post,
    event_get,
    event_delete
}
