const Router = require('../utils/router.js');
const commonController = require("../controllers/commonController");
const { commonRoutes } = require("../settings/_serverSettings");

const commonRouter = new Router();
commonRouter.get(commonRoutes.accountType_get.route, commonController.getUserData);
commonRouter.get(commonRoutes.getServerSettings.route, commonController.getServerSettings);


module.exports = commonRouter