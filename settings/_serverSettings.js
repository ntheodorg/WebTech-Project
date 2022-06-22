exports.staticRootFolder = "./public"
exports.jwtSecretKey = 'secretKey'
exports.statisticsFileLocation = {
    html: './microservices/Statistics/statistics.html',
    csv: './microservices/Statistics/statistics.csv',
    pdf: './microservices/Statistics/statistics.pdf'
}
exports.statisticsTemplateFileLocation = {
    html: './microservices/Statistics/statisticsTemplate.html'
}

// exports.statisticsFileNames = {
//     html: this.statisticsFileLocation.html.split('/').pop(),
//     csv: this.statisticsFileLocation.csv.split('/').pop(),
//     pdf: this.statisticsFileLocation.pdf.split('/').pop()
// }
exports.staticRoutes = require('./staticRoutes').staticRoutes;
exports.commonRoutes = require('./commonRoutes').commonRoutes;
exports.authRoutes = require('./authRoutes').authRoutes;
exports.pinRoutes = require('./pinRoutes').pinRoutes;
exports.eventRoutes = require('./eventRoutes').eventRoutes;
exports.reportRoutes = require('./reportRoutes').reportRoutes;
exports.statisticsRoutes = require('./statisticsRoutes').statisticsRoutes;