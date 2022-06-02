const http = require('http');
const pathModule = require('path');
const fs = require('fs');
const url = require('url');



const routes = {
    "": function(data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/Home.html').pipe(res);
    },
    home: function(data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/Home.html').pipe(res);
    },
    news: function(data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/News.html').pipe(res);
    },
    iasimap: function(data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/IasiMap.html').pipe(res);
    },
    signup: function(data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/SignUp.html').pipe(res);
    },
    login: function(data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./Website/Login.html').pipe(res);
    },
    notFound: function(data, res) {
        console.log("Not found");
        res.writeHead(404, {'Content-Type': 'text/plain'});
    },
    resources: function(path, res) {
        let exts = {
            html: 'text/html',
            txt: 'text/plain',
            css: 'text/css',
            gif: 'image/gif',
            jpg: 'image/jpeg',
            png: 'image/png',
            svg: 'image/svg+xml',
            js: 'application/javascript'
        };

        let filePath = "./Website/" + path;
        let type = exts[pathModule.extname(path).slice(1)] || 'text/plain';

        console.log("FilePath: " + filePath);
        
        
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(filePath).pipe(res);
    }
}

const server = http.createServer((req, res) => {

    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;

    path = path.replace(/^\/+|\/+$/g, "");

    console.log('Request was made: ' + req.url);
    console.log(path);

    req.on("data", function() {
        console.log("Got some data");
    });

    req.on("end", function() {
        console.log("Send response");

        if(path.startsWith("Resources/") || path.startsWith("Styles-CSS/")){
            let route = routes["resources"];

            route(path, res);

        } else {
            path = path.toLocaleLowerCase();

            let route = 
            typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];

            let data = {
                path: path
            };
    
            route(data, res);
        }
        
    });

});


server.listen(3000);

console.log('Listening on port 3000...')

// app.listen = function listen() {
//     var server = http.createServer(this);
//     return server.listen.apply(server, arguments);
//   };

