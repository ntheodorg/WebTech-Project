// save report in the database
const ReportSchema = require("./schemas/reportSchema");
const PinSchema = require("./schemas/pinSchema");

function saveReport(data,res){
    const report = new ReportSchema({
        pin_id: data.pin_id,
        reporter_name: data.reporter_name,
        reporter_id: data.reporter_id,
        report_text: data.report_text,
        like_number: 0,
    });
    report.save();
    res.writeHead(200,{'Content-type' : 'application/json'});
    res.end(JSON.stringify("true"));
}

function getAllReports(res){
    ReportSchema.find()
        .then((result) => {
            res.writeHead(200,{'Content-type' : 'application/json'});
            result.forEach((object) => {

                object.reporter_name = object.reporter_name.replace(/\+/g, " ");
                object.report_text = object.report_text.replace(/\+/g, " ");
            })
            res.end(JSON.stringify(result));
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteReport(report_id,res) {
    console.log(report_id);
    ReportSchema.find()
        .then((result) =>{
            result.forEach((object) => {
                    res.writeHead(200,{'Content-type' : 'application/json'});
                    ReportSchema.findByIdAndDelete(report_id, function (err) {
                        if (err) {
                            res.end(JSON.stringify("false"));
                        } else {
                            res.end(JSON.stringify("true"));
                        }
                    })
            })
        })
}

function getMyReports(user_id,res){
    PinSchema.find().then((result)=> {    ReportSchema.find({reporter_id:user_id})
        .then((rep) => {
            res.writeHead(200,{'Content-type' : 'application/json'});
            rep.forEach((object) => {
                for(let i = 0 ; i < result.length;i++){
                    if(result[i].id === object.pin_id){
                        object.street = result[i].street;
                    }
                }
                object.reporter_name = object.reporter_name.replace(/\+/g, " ");
                object.report_text = object.report_text.replace(/\+/g, " ");
            })
            res.end(JSON.stringify(rep));
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

module.exports = {
    saveReport,
    getAllReports,
    deleteReport,
    getMyReports
}