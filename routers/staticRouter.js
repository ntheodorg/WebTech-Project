const Router = require('../utils/router.js');
const staticRoutes = require("../models/routesModel").staticRoutes;
const staticController = require("../controllers/staticController");

const staticRouter = new Router();
staticRouter.get(staticRoutes.default.route, staticController.home);
staticRouter.get(staticRoutes.home.route, staticController.home);
staticRouter.get(staticRoutes.news.route, staticController.news);

module.exports = staticRouter