const reportModel = require('../models/reportModel');

const report_post = (req,res) => {
    reportModel.saveReport(req.body,res);
}

const report_get = (res) => {
    reportModel.getAllReports(res);
}

const report_delete = (req,res) => {
    reportModel.deleteReport(req.body,res);
}

module.exports = {
    report_post,
    report_get,
    report_delete
}
