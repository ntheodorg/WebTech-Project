exports.staticRootFolder = "./public"
exports.jwtSecretKey = 'secretKey'
const serverName = 'http://localhost'
const serverPort = '4000'
exports.url = `${serverName}:${serverPort}`
exports.statisticsFileLocation = {
    html: './microservices/Statistics/statistics.html',
    csv: './microservices/Statistics/statistics.csv',
    pdf: './microservices/Statistics/statistics.pdf'
}
exports.statisticsTemplateFileLocation = {
    html: './microservices/Statistics/statisticsTemplate.html'
}
exports.staticRoutes = require('./staticRoutes').staticRoutes;
exports.commonRoutes = require('./commonRoutes').commonRoutes;
exports.authRoutes = require('./authRoutes').authRoutes;
exports.pinRoutes = require('./pinRoutes').pinRoutes;
exports.eventRoutes = require('./eventRoutes').eventRoutes;
exports.reportRoutes = require('./reportRoutes').reportRoutes;
exports.collectRoutes = require('./collectsRoutes').collectsRoutes;
exports.statisticsRoutes = require('./statisticsRoutes').statisticsRoutes;