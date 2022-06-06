const fs = require("fs");
const {staticRoutes} = require("../models/routesModel");

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

    get(url, controller) {
        if (this.getRoutes[url])
            console.error(`\"${url}\" was already added as GET route`)
        this.getRoutes[url] = controller
    }

    post(url, controller) {
        if (this.postRoutes[url])
            console.error(`\"${url}\" was already added as POST route`)
        this.postRoutes[url] = controller
    }

    put(url, controller) {
        if (this.putRoutes[url])
            console.error(`\"${url}\" was already added as PUT route`)
        this.putRoutes[url] = controller
    }

    
    delete(url, controller) {
        if (this.deleteRoutes[url])
        console.error(`\"${url}\" was already added as DELETE route`)
        this.deleteRoutes[url] = controller
    }

    patch(url, controller) {
        if (this.patchRoutes[url])
        console.error(`\"${url}\" was already added as PATCH route`)
        this.patchRoutes[url] = controller
    }

    handleRoute(req, res) {

        var reqUrl = req.url.split(`?`)[0]
        try {
            switch (req.method) {
                case "POST":
                    return this.postRoutes[reqUrl](req, res);
                case "GET":
                    return this.getRoutes[reqUrl](req, res);
                case "DELETE":
                    return this.deleteRoutes[reqUrl](req, res);
                case "PUT":
                    return this.putRoutes[reqUrl](req, res);
                case "PATCH":
                    return this.patchRoutes[reqUrl](req, res);
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
