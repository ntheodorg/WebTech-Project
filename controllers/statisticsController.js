const fs = require('fs');
const CsvParser = require("json2csv").Parser;
const fetch = require('node-fetch');

const { statisticsRoutes ,  url, statisticsFileLocation, statisticsTemplateFileLocation} = require("../settings/_serverSettings");
const handlers = require('../microservices/Statistics/handlers');

function getData() {

}

module.exports = {
    getStatistics: function(req, res) {
        console.log('fetch from server exp')

        const filePath = req.body.fileLocation;
        const fileName = filePath.split('/').pop();

        const route = `${url}${statisticsRoutes.getStatistics_service.route}`
        console.log(route)
        fetch(route, {
            method: 'GET',
        })
            .then(response => {
                res.setHeader('Content-type', 'application/octet-stream');
                res.setHeader('Content-disposition', `attachment; filename=${fileName}`);

                fs.createReadStream(filePath).pipe(res);
            })
            .catch(err => {
                console.log(err);
                res.json({err});
            })



    }
}