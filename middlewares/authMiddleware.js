const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const staticRoutes = require("../models/routesModel").staticRoutes;

const requireAuth = (req, res) => {
    if(req.userData == undefined) {
        res.redirect(staticRoutes.login.route)
    }
}

const checkUser = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        try {
            const decodedToken = jwt.verify(token, 'secretKey');
            console.log(decodedToken);
            let user = await User.findById(decodedToken.id);
            req.userData = user;
            return req;
        }
        catch (err) {
            console.log(err.message);
            return req;
        }
    } else {
        return req;
    }
}

module.exports = { requireAuth, checkUser }