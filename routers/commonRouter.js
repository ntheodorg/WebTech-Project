const Router = require('../utils/router.js');
const authController = require("../controllers/authController");
const { commonRoutes } = require("../models/routesModel");

const commonRouter = new Router();
commonRouter.post(commonRoutes.signup.route, authController.signup);
commonRouter.post(commonRoutes.login.route, authController.login);


module.exports = commonRouter