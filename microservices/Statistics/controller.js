const collectsModel = require('../../models/collectsModel');

const {statisticsFileLocation, statisticsTemplateFileLocation} = require('./settings');
const fs = require("fs");
const handlers = require("./handlers");
const {Parser: CsvParser} = require("json2csv");


module.exports = {
    getStatistics: function (req, res) {
        collectsModel.getAllProcessedCollects(res)
    }

}