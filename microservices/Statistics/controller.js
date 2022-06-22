// const User = require('../models/userModel');

const {statisticsTemplateFileLocation, statisticsFileLocation} = require("../../settings/_serverSettings");
const handlers = require("./handlers");
const fs = require("fs");
const {Parser: CsvParser} = require("json2csv");
module.exports = {
    getStatistics: async function (req, res) {
        const dataM = {
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

        const dataMap = {
            map: JSON.stringify(dataM)
        }

        const templatePath = statisticsTemplateFileLocation.html;

        handlers.read(templatePath, dataMap, function (payload) {
            fs.writeFileSync(statisticsFileLocation.html, payload);

            const csvParser = new CsvParser();
            const csvData = csvParser.parse(dataM);
            fs.writeFileSync(statisticsFileLocation.csv, csvData);
        });
        console.log('Send stats')

    }

}