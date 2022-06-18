const Router = require('../utils/router.js');
const reportRoutes = require("../settings/reportRoutes").reportRoutes;
const reportController = require("../controllers/reportController");

const reportRouter = new Router();
reportRouter.post(reportRoutes.report_post.route, reportController.report_post);
reportRouter.get(reportRoutes.report_get.route,reportController.report_get);
reportRouter.get(reportRoutes.report_getMy.route,reportController.myReports_get);
reportRouter.delete(reportRoutes.report_delete.route,reportController.report_delete);
reportRouter.delete(reportRoutes.pinReports_delete.route,reportController.pinReports_delete);
module.exports = reportRouter;