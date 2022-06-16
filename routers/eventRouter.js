const Router = require('../utils/router.js');
const { eventRoutes } = require("../settings/_serverSettings");
const eventController = require("../controllers/eventController");

const eventRouter = new Router();
eventRouter.post(eventRoutes.event_post.route, eventController.event_post);
eventRouter.get(eventRoutes.event_get.route,eventController.event_get);
eventRouter.delete(eventRoutes.event_delete.route,eventController.event_delete)
module.exports = eventRouter;