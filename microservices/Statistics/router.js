const Router = require('../../utils/router.js');
const statisticsController = require("./controller");
const { statisticsRoutes } = require("../../settings/_serverSettings");

const statisticsRouter = new Router();
statisticsRouter.get(statisticsRoutes.getStatistics_service.route, statisticsController.getStatistics);


module.exports = statisticsRouter