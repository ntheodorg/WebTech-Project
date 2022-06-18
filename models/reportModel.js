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
    let reports_nr;
    let changeSet;
    PinSchema.find({_id :data.pin_id}).then(result => {
        console.log(result[0]);
        reports_nr = result[0].reports_number;
        reports_nr++;
        if(reports_nr > 3){
            changeSet = {$set : {reports_number:reports_nr,color:"red"}};
        }
        else {
            changeSet = {$set : {reports_number:reports_nr,color:"yellow"}};
        }
        console.log(reports_nr);
    }).then(() => {
        PinSchema.updateOne({_id:data.pin_id},changeSet, function(err,res) {
            if(err) throw err;
            console.log("1 document updated");
        })
    });


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
            ReportSchema.find({_id:report_id}).then(repResult => {
                console.log(repResult);
                pin_id = repResult[0].pin_id;
            }).then(() => {
                PinSchema.find({_id :pin_id}).then(result => {
                    reports_nr = result[0].reports_number;
                    reports_nr--;
                    if(reports_nr > 3){
                        changeSet = {$set : {reports_number:reports_nr,color:"red"}};
                    }
                    else if (reports_nr>1 && reports_nr<3){
                        changeSet = {$set : {reports_number:reports_nr,color:"yellow"}};
                    }
                    else {
                        changeSet = {$set : {reports_number:reports_nr,color:"green"}};
                    }
                    console.log(reports_nr);
                }).then(() => {
                    PinSchema.updateOne({_id:pin_id},changeSet, function(err,res) {
                        if(err) throw err;
                        console.log("1 document updated");
                    })
                }).then(() =>{
                    ReportSchema.findByIdAndDelete(report_id, function (err) {
                        if (err) {
                            res.writeHead(400,{'Content-type' : 'application/json'});
                            res.end(JSON.stringify("false"));
                        } else {
                            res.writeHead(202,{'Content-type' : 'application/json'});
                            res.end(JSON.stringify("true"));
                        }})
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

function deletePinReports(pin_id,res){
    res.writeHead(200,{'Content-type' : 'application/json'});
    ReportSchema.find({pin_id:pin_id})
        .then((result) =>{
            result.forEach((object) => {
                ReportSchema.findByIdAndDelete(object._id, function (err, docs) {
                    if (err){
                        res.writeHead(400,{'Content-type' : 'application/json'});
                        res.end(JSON.stringify("false"));
                        console.log(err)
                    }
                    else{
                        console.log("Deleted : ", docs);
                    }
                })
            })
        }).then(() => {
        PinSchema.updateOne({_id:pin_id}, {$set : {reports_number:0,color:"green"}}, function(err,res) {
            if(err) {
                res.writeHead(404,{'Content-type' : 'application/json'});
                res.end(JSON.stringify("false"));
            }
            console.log("1 document updated");
            })
    }).then(() => {
        res.writeHead(200,{'Content-type' : 'application/json'});
        res.end(JSON.stringify("true"));
    })
}

module.exports = {
    saveReport,
    getAllReports,
    deleteReport,
    getMyReports,
    deletePinReports
}