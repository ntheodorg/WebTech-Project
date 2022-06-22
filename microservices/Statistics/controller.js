const collectsModel = require('../../models/collectsModel');

const {statisticsFileLocation, statisticsTemplateFileLocation} = require('./settings');
const fs = require("fs");
const handlers = require("./handlers");
const {Parser: CsvParser} = require("json2csv");


module.exports = {
    getStatistics: function (req, res) {
        const dataMa = {
            cart1: {
                name: 'Calugareni',
                material_type: 'hartie',
                quantity: 13
            },

            cart122: {
                name: 'Calugareni',
                material_type: 'metal',
                quantity: 12
            },
            cart12: {
                name: 'Calugareni',
                material_type: 'plastic',
                quantity: 9
            },
            cart22: {
                name: 'IasiSud',
                material_type: 'hartie',
                quantity: 20
            },
            cart23: {
                name: 'IasiSud',
                material_type: 'metal',
                quantity: 7
            },
            cart24: {
                name: 'IasiSud',
                material_type: 'plastic',
                quantity: 1
            },

            cart244: {
                name: 'IasiVest',
                material_type: 'plastic',
                quantity: 1
            }}

        collectsModel.getAllProcessedCollects(res)
    }

}