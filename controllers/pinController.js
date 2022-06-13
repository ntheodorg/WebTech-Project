const pinModel = require('../models/pinModel');

const pin_post = (req,res) => {
    pinModel.savePin(req.body,res);
}

const pin_get = (req,res) => {
    pinModel.getAllPins(res);
}

const pin_delete = (req,res) => {
    pinModel.deletePin(req.body,res);
}

module.exports = {
    pin_post,
    pin_get,
    pin_delete
}
