
const fs = require('fs');
const staticRoutes = require("../models/routesModel").staticRoutes;

module.exports = {
    home: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.home.location).pipe(res);
    },
    news: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.news.location).pipe(res);
    },
    statistics: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/Statistics.html').pipe(res);
    },
    notFound: function(req, res) {
        console.log("Not found");
        res.writeHead(404, {'Content-Type': 'text/plain'});
    }

}