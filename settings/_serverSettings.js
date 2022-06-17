exports.staticRootFolder = "./public"
exports.jwtSecretKey = 'secretKey'
exports.staticRoutes = require('./staticRoutes').staticRoutes;
exports.commonRoutes = require('./commonRoutes').commonRoutes;
exports.pinRoutes = require('./pinRoutes').pinRoutes;
exports.eventRoutes = require('./eventRoutes').eventRoutes;
exports.reportRoutes = require('./reportRoutes').reportRoutes;
exports.collectRoutes = require('./collectsRoutes').collectsRoutes;