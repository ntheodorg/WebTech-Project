const Router = require('../utils/router.js');
const staticRoutes = require("../models/routesModel").staticRoutes;
const staticController = require("../controllers/staticController");
const { requireAuth } = require('../middlewares/authMiddleware');

const staticRouter = new Router();
staticRouter.get(staticRoutes.default.route, staticController.default);
staticRouter.get(staticRoutes.home.route, staticController.home);
staticRouter.get(staticRoutes.news.route, staticController.news, requireAuth);
staticRouter.get(staticRoutes.iasimap.route, staticController.iasimap, requireAuth);
staticRouter.get(staticRoutes.login.route, staticController.login);
staticRouter.get(staticRoutes.signup.route, staticController.signup);
staticRouter.get(staticRoutes.ap.route, staticController.ap);
staticRouter.get(staticRoutes.sup.route, staticController.sup);
staticRouter.get(staticRoutes.up.route, staticController.up);
staticRouter.get(staticRoutes._404.route, staticController._404);


module.exports = staticRouter