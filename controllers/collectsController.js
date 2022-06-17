const collectsModel = require('../models/collectsModel');

const collects_post = (req,res) => {
    collectsModel.saveCollects(req.body,res);
}

const collects_get = (req,res) => {
    collectsModel.getAllCollects(res);
}

const collects_delete = (req,res) => {
    collectsModel.deleteCollects(req.body,res);
}

module.exports = {
    collects_post,
    collects_get,
    collects_delete
}