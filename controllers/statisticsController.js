const fs = require('fs');
const fetch = require('node-fetch');

const { statisticsRoutes , url, urlStatistics} = require("../settings/_serverSettings");

function getData() {

}

module.exports = {
    getStatistics: function(req, res) {
        const filePath = req.body.fileLocation;
        const fileName = filePath.split('/').pop();

        const route = `${urlStatistics}${statisticsRoutes.getStatistics_service.route}`

        fetch(route, {
            method: 'GET',
        })
            .then(response => {
                res.setHeader('Content-type', 'application/octet-stream');
                res.setHeader('Content-disposition', `attachment; filename=${fileName}`);

                fs.createReadStream(__dirname+'/./../microservices/Statistics/'+filePath).pipe(res);
            })
            .catch(err => {
                console.log(err);
                res.json({err});
            })



    }
}