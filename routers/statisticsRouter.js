const Router = require('../utils/router.js');
const { statisticsRoutes } = require("../settings/_serverSettings");
const statisticsController = require("../controllers/statisticsController");

const statisticsRouter = new Router();
statisticsRouter.post(statisticsRoutes.getStatistics_client.route, statisticsController.getStatistics);


module.exports = statisticsRouter