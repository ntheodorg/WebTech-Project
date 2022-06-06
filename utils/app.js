const http = require('http');
const url = require('url');
const Router = require('./router.js');
const pathModule = require('path');
const fs = require('fs');

class App {
    port
    router
    resourceFolders

    constructor(port) {
        this.port = port;
        this.router = new Router();
        this.resourceFolders = {};
    }

    ProcessUrlReq = function(rawUrl) {
        let reqUrl = rawUrl;
        let parsedURL = url.parse(reqUrl, true);
        let path = parsedURL.pathname;

        path = path.replace(/^\/+|\/+$/g, "");

        return path;
    }

    listen() {
        const server = http.createServer((req, res) => {


            console.log('Request was made: ' + req.url);
            let processedUrl = this.ProcessUrlReq(req.url);
            console.log(`Processed path: \"${processedUrl}\"`);

            if(this.sendAssetIfRequested(processedUrl, res)){
                console.log(`Fulfilled \"${processedUrl}\"`);
            } else {

                this.router.handleRoute(req,res);
            }

        });
        server.listen(this.port);
        console.log(`Listening on port ${this.port}...`);
    }

    sendAssetIfRequested(processedUrl, res){

        let selectedFolder = ""

        for(const baseRoute of Object.keys(this.resourceFolders)) {
            if(processedUrl.startsWith(baseRoute)) {
                selectedFolder = this.resourceFolders[baseRoute];
                break;
            }
        }

        if(!selectedFolder.localeCompare("")){
            return false;
        }

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

        let filePath = selectedFolder + "/" + processedUrl;
        let type = exts[pathModule.extname(filePath).slice(1)] || 'text/plain';

        console.log("FilePath: " + filePath);


        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(filePath).pipe(res);

        return true;
    }

    use(router) {
        this.router.getRoutes = { ...this.router.getRoutes, ...router.getRoutes }
        this.router.postRoutes = { ...this.router.postRoutes, ...router.postRoutes }
        this.router.deleteRoutes = { ...this.router.deleteRoutes, ...router.deleteRoutes }
        this.router.putRoutes = { ...this.router.putRoutes, ...router.putRoutes }
        this.router.patchRoutes = { ...this.router.patchRoutes, ...router.patchRoutes }
    }

    importAsset(urlReq , baseFolderName) {
        if (this.resourceFolders[urlReq])
            console.error(`\"${urlReq}\" was already added as GET route`)
        this.resourceFolders[urlReq] = baseFolderName
    }
}

module.exports = App; 