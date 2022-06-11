class Report {
    pin_id
    reporter_name
    post_date
    report_text
    like_number

    constructor(id,rep_name,post_d,rep_text,like_n) {
        this.pin_id = id;
        this.reporter_name = rep_name;
        this.post_date = post_d;
        this.report_text = rep_text;
        this.like_number = like_n;
    }
}
module.exports = Report;