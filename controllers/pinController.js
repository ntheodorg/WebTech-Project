const fs = require('fs');
const staticRoutes = require('../models/routesModel').staticRoutes;
const Pin = require('../utils/pin');
const pinModel = require('../models/pinModel');

const pin_post = (req,res) => {
    let pin_body = "";
    req.on("data", (chunk) => {
        pin_body+=chunk.toString();
        let latitude = pin_body.split(`&`)[1].split(`=`)[1];
        let longitude = pin_body.split(`&`)[2].split(`=`)[1];
        let pin = new Pin( latitude,longitude,'green');
        pinModel.savePin(pin);
        res.writeHead(200, {'Content-Type': 'text/html'});   //temporary
        fs.createReadStream(staticRoutes.sup.location).pipe(res);  // temporary
    });
}
const pin_get = (req,res) => {
    pinModel.getAllPins(res);
}
const pin_delete = (req,res) => {
    // console.log(req.headers);
    console.log(req.body);
}

module.exports = {
    pin_post,
    pin_get,
    pin_delete
}
