const Router = require('../utils/router.js');
const { pinRoutes } = require("../settings/_serverSettings");
const pinController = require("../controllers/pinController");

const pinRouter = new Router();
pinRouter.post(pinRoutes.pin_post.route, pinController.pin_post);
pinRouter.get(pinRoutes.pin_get.route,pinController.pin_get);
pinRouter.delete(pinRoutes.pin_delete.route,pinController.pin_delete);
pinRouter.patch(pinRoutes.pin_quarter_patch.route,pinController.pin_quarter_patch);
module.exports = pinRouter;