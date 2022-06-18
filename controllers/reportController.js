const reportModel = require('../models/reportModel');

const report_post = (req,res) => {
    reportModel.saveReport(req.body,res);
}

const report_get = (req, res) => {
    reportModel.getAllReports(res);
}

const report_delete = (req,res) => {
    reportModel.deleteReport(req.body,res);
}

const myReports_get = (req,res) => {
    reportModel.getMyReports(req.userData.id,res);
}
const pinReports_delete = (req,res) => {
    console.log("in controller");
    reportModel.deletePinReports(req.body, res);
}

module.exports = {
    report_post,
    report_get,
    report_delete,
    myReports_get,
    pinReports_delete
}
