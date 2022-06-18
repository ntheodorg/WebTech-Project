exports.staticRootFolder = "./public"
exports.jwtSecretKey = 'secretKey'
exports.staticRoutes = require('./staticRoutes').staticRoutes;
exports.commonRoutes = require('./commonRoutes').commonRoutes;
exports.authRoutes = require('./authRoutes').authRoutes;
exports.pinRoutes = require('./pinRoutes').pinRoutes;
exports.eventRoutes = require('./eventRoutes').eventRoutes;
exports.reportRoutes = require('./reportRoutes').reportRoutes;