const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reportSchema = new Schema({
    pin_id : {
        type: String,
        required: true
    },
    reporter_name : {
        type: String,
        required: true
    },
    post_date : {
        type: Date,
        required: true
    },
    report_text : {
        type: String,
        required: true
    },
    like_number : {
        type: Number,
        required: true
    }

});

const ReportSchema = mongoose.model('Report', reportSchema);
module.exports = ReportSchema;