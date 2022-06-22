exports.staticRootFolder = "./public"
exports.jwtSecretKey = 'secretKey'
const serverName = 'http://localhost'
const serverPort = '8888'
const statisticsPort = '4444'
exports.url = `${serverName}:${serverPort}`
exports.urlStatistics = `${serverName}:${statisticsPort}`
exports.statisticsFileLocation = require('../microservices/Statistics/settings').statisticsFileLocation
exports.staticRoutes = require('./staticRoutes').staticRoutes;
exports.commonRoutes = require('./commonRoutes').commonRoutes;
exports.authRoutes = require('./authRoutes').authRoutes;
exports.pinRoutes = require('./pinRoutes').pinRoutes;
exports.eventRoutes = require('./eventRoutes').eventRoutes;
exports.reportRoutes = require('./reportRoutes').reportRoutes;
exports.collectsRoutes = require('./collectsRoutes').collectsRoutes;
exports.statisticsRoutes = require('./statisticsRoutes').statisticsRoutes;