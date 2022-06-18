const http = require('http');
const url = require('url');
const Router = require('./router.js');
const pathModule = require('path');
const fs = require('fs');
const {staticRoutes} = require("../settings/_serverSettings");

class App {
    // Port to run the server
    port
    // All the routes; populate using "use()" fun
    router
    // All the static {<BeginningOfRoute> : <PathInRelativeWith_Main>} values; populate using "importAsset()" fun
    resourceFolders

    constructor(port) {
        this.port = port;
        this.router = new Router();
        this.resourceFolders = {};
    }

    listen() {
        // Everytime a request is received, below function is triggered
        const server = http.createServer(async (req, res) => {

            console.log('Request was made: ' + req.url + " on " + req.method);

            // If there are assets to send, choose only to send them on this request
            if (this.sendAssetIfRequested(req.url, res)) {
                // console.log(`Fulfilled \"${req.url}\"`);
                // Otherwise send desired file using router
            } else {
                req = this.addReqFeatures(req);
                res = this.addResFeatures(res);

                if (this.authFunction) {
                    req = await this.authFunction(req, res);
                }
                if (!this.isJSONOnReq(req)) {
                    this.router.handleRoute(req, res);
                } else {
                    this.HandleJSONReq(req, res);
                }
            }

        });

        // Start server listener
        server.listen(this.port);
        console.log(`Listening on port ${this.port}...`);
    }

    isJSONOnReq(req) {
        if(req.headers['content-type'] === 'application/json'){
            return true;
        } else {
            return false;
        }
    }

    sendAssetIfRequested(processedUrl, res){

        // Auxiliary variable to check after below for
        let selectedFolder = ""

        // Try to find <PathInRelativeWith_Main> for an asset
        for(const baseRoute of Object.keys(this.resourceFolders)) {
            if(processedUrl.startsWith(baseRoute)) {
                selectedFolder = this.resourceFolders[baseRoute];
                break;
            }
        }

        // Return if no asset found, with this url
        if(!selectedFolder.localeCompare("")){
            return false;
        }

        // Continue and send the asset
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

        // Build the full path to the file, from main js
        let filePath = selectedFolder + "/" + processedUrl;

        // Choose the right type, based on path extension
        let type = exts[pathModule.extname(filePath).slice(1)] || 'text/plain';

        if(fs.existsSync(filePath)){
            // Write the desired header
            res.writeHead(200, {'Content-Type': type});

            // Pipe a stream based on the filePath into res. (Sending the file to the client)
            fs.createReadStream(filePath).pipe(res);

            return true;
        }

        return false;
    }

    HandleJSONReq(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', function () {
            let finalData = {}
            if (data){
                finalData = JSON.parse(data);
                req.body = finalData;

                this.router.handleRoute(req,res);
            }
        }.bind(this));
    }

    use(router) {
        // Glue the routes from received parameter into already existing routes in this-instance.
        this.router.getRoutes = { ...this.router.getRoutes, ...router.getRoutes }
        this.router.postRoutes = { ...this.router.postRoutes, ...router.postRoutes }
        this.router.deleteRoutes = { ...this.router.deleteRoutes, ...router.deleteRoutes }
        this.router.putRoutes = { ...this.router.putRoutes, ...router.putRoutes }
        this.router.patchRoutes = { ...this.router.patchRoutes, ...router.patchRoutes }
    }

    importAsset(urlReq , baseFolderName) {
        // Check if key already exists
        if (this.resourceFolders[urlReq])
            console.error(`\"${urlReq}\" was already added as GET route`)

        // Put {key : value} into resourceFolders
        this.resourceFolders[urlReq] = baseFolderName
    }

    addReqFeatures(req) {
        if(req.headers.cookie) {
            let result = req.headers.cookie.split('; ').map(e => e.split('='));
            req.cookies = Object.fromEntries(result)
        } else {
            req.cookies = {}
        }

        return req;
    }

    addResFeatures(res) {

        res.cookie = function (attr, value, options) {
            if(options == undefined)
            {
                res.setHeader('Set-Cookie', `${attr}=${value}`);
            } else {
                res.setHeader('Set-Cookie', `${attr}=${value}; ${options}`);
            }
            return res;
        }

        res.send = function (data) {

            res.setHeader('Content-Type', 'text/plain');
            res.end(data);
        }

        res.json = function (JSONObj) {

            res.end(JSON.stringify(JSONObj));
            return res;
        }

        res.status = function (newStatusCode) {
            res.statusCode = newStatusCode;
            return res;
        }

        res.redirect = (destUrl) => {

            res.writeHead(302, {'Location': destUrl});
            res.end();
        }

        return res;
    }

    useAuth(authentication) {
        this.authFunction = authentication;
    }
}

module.exports = App; 