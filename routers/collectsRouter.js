const Router = require('../utils/router.js');
const collectsController = require("../controllers/collectsController");
const collectsRoutes = require("../settings/collectsRoutes").collectsRoutes;

const collectsRouter = new Router();
collectsRouter.post(collectsRoutes.collects_post.route, collectsController.collects_post);
collectsRouter.get(collectsRoutes.collects_get.route,collectsController.collects_get);
collectsRouter.delete(collectsRoutes.collects_delete.route,collectsController.collects_delete)
module.exports = collectsRouter;