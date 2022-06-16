const Router = require('../utils/router.js');
const authController = require("../controllers/authController");
const { commonRoutes } = require("../settings/_serverSettings");

const commonRouter = new Router();
commonRouter.post(commonRoutes.signup.route, authController.signup);
commonRouter.post(commonRoutes.login.route, authController.login);
commonRouter.post(commonRoutes.signup_superuser.route, authController.signup_SuperUser)
commonRouter.get(commonRoutes.accountType_get.route, authController.getUserData);
commonRouter.get(commonRoutes.logout.route, authController.logout);
commonRouter.get(commonRoutes.getServerSettings.route, authController.getServerSettings);


module.exports = commonRouter