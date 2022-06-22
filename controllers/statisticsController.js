const fs = require('fs');
const CsvParser = require("json2csv").Parser;

const { staticRoutes ,  statisticsFileLocation, statisticsTemplateFileLocation} = require("../settings/_serverSettings");
const handlers = require('../microservices/Statistics/handlers');

function getData() {

}

module.exports = {
    getStatistics: function(req, res) {
        console.log('fetch from server exp')

        const filePath = req.body.fileLocation;
        const fileName = filePath.split('/').pop();

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

        const ext = fileName.split('.').pop();
        const templatePath = statisticsTemplateFileLocation[ext];

        handlers.read(templatePath, dataMap, function (payload) {
            fs.writeFileSync(statisticsFileLocation.html, payload);

            const csvParser = new CsvParser();
            const csvData = csvParser.parse(dataM);
            fs.writeFileSync(statisticsFileLocation.csv, csvData);
        });


        res.setHeader('Content-type', 'application/octet-stream');
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);

        fs.createReadStream(filePath).pipe(res);
    }
}