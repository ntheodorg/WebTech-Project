
const fs = require('fs');
const staticRoutes = require("../models/routesModel").staticRoutes;

module.exports = {
    default: function(req, res) {
        res.redirect(staticRoutes.home.route);
    },
    home: function(req, res) {

        console.log(req.cookies);


        res.cookie('ceva12', false, `Max-Age=${1000*60*60*24}`);
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.home.location).pipe(res);

    },
    news: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.news.location).pipe(res);
    },
    iasimap: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.iasimap.location).pipe(res);
    },
    login: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.login.location).pipe(res);
    },
    signup: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.signup.location).pipe(res);
    },
    up: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.up.location).pipe(res);
    },
    sup: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.sup.location).pipe(res);
    },
    ap: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(staticRoutes.ap.location).pipe(res);
    },
    _404: function(req, res) {
        console.log("Not found");
        res.writeHead(404, {'Content-Type': 'text/plain'});
    }

}