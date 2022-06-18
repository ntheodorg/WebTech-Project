const { staticRoutes, authRoutes } = require("../settings/_serverSettings");


module.exports = {
    getUserData: function (req, res) {
        if(req.userData === undefined){
            res.status(201).json({ })
        } else {
            res.status(201).json({
                id: req.userData.id,
                email: req.userData.email,
                accountType: req.userData.accountType,
                details: req.userData.details
            })
        }
    },
    getServerSettings: function (req, res) {
        res.status(201).json({
            staticRoutes,
            authRoutes
        });
    }

}