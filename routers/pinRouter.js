const Router = require('../utils/router.js');
const pinRoutes = require("../models/pinRoutes").pinRoutes;
const pinController = require("../controllers/pinController");

const pinRouter = new Router();
pinRouter.post(pinRoutes.pin_post.route, pinController.pin_post);
pinRouter.get(pinRoutes.pin_get.route,pinController.pin_get);
module.exports = pinRouter;