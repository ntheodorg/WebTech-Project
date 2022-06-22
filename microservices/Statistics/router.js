const Router = require('../../utils/router.js');
const statisticsController = require("./controller");
const { statisticsRoutes } = require("../../settings/_serverSettings");

const statisticsRouter = new Router();
statisticsRouter.post(statisticsRoutes.impStatistics_service.route, statisticsController.impStatistics);
statisticsRouter.post(statisticsRoutes.getStatistics_service.route, statisticsController.getStatistics);


module.exports = statisticsRouter