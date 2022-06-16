const fs = require("fs");
const {staticRoutes} = require("../models/routesModel");

function callFunction(req, res, selectedRoute) {
    if(selectedRoute.authReq){
        selectedRoute.authReq(req, res);
    }
    return selectedRoute.controller(req, res);
}

class Router {

    // Attributes in form of {string1 : fun1, string2 : fun2, ...}
    getRoutes
    postRoutes
    putRoutes
    deleteRoutes
    patchRoutes

    constructor() {
        this.getRoutes = {}
        this.postRoutes = {}
        this.putRoutes = {}
        this.deleteRoutes = {}
        this.patchRoutes = {}
    }

    get(url, controller, authReq) {
        if (this.getRoutes[url])
            console.error(`\"${url}\" was already added as GET route`)
        this.getRoutes[url] = { controller, authReq }
    }

    post(url, controller, authReq) {
        if (this.postRoutes[url])
            console.error(`\"${url}\" was already added as POST route`)
        this.postRoutes[url] = { controller, authReq }
    }

    put(url, controller, authReq) {
        if (this.putRoutes[url])
            console.error(`\"${url}\" was already added as PUT route`)
        this.putRoutes[url] = { controller, authReq }
    }

    
    delete(url, controller, authReq) {
        if (this.deleteRoutes[url])
        console.error(`\"${url}\" was already added as DELETE route`)
        this.deleteRoutes[url] = { controller, authReq }
    }

    patch(url, controller, authReq) {
        if (this.patchRoutes[url])
        console.error(`\"${url}\" was already added as PATCH route`)
        this.patchRoutes[url] = { controller, authReq }
    }



    handleRoute(req, res) {

        let reqUrl = req.url.split(`?`)[0]
        try {
            switch (req.method) {
                case "POST":
                    if(this.postRoutes[reqUrl].authReq){
                        this.postRoutes[reqUrl].authReq(req, res);
                    }
                    return this.postRoutes[reqUrl].controller(req, res);
                case "GET":
                    return callFunction(req, res, this.getRoutes[reqUrl]);
                case "DELETE":
                    if(this.deleteRoutes[reqUrl].authReq){
                        this.deleteRoutes[reqUrl].authReq(req, res);
                    }
                    return this.deleteRoutes[reqUrl].controller(req, res);
                case "PUT":
                    if(this.putRoutes[reqUrl].authReq){
                        this.putRoutes[reqUrl].authReq(req, res);
                    }
                    return this.putRoutes[reqUrl].controller(req, res);
                case "PATCH":
                    if(this.patchRoutes[reqUrl].authReq){
                        this.patchRoutes[reqUrl].authReq(req, res);
                    }
                    return this.patchRoutes[reqUrl].controller(req, res);
                default:
                    throw new Error(`no route with such http verb: ${req.method}`);
            }
        } catch (error) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            fs.createReadStream(staticRoutes._404.location).pipe(res);
        }

    }
}

module.exports = Router;
