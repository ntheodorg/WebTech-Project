let MyReports = document.querySelector(".MyReports");
let template = document.querySelector('#report-template');

fetch("/api/myReports")
.then((response)=> {
    return response.json();
}).then((data)=>{
    for(let i = 0; i< data.length;i++){
        console.log(data[i]);
        // Instantiate the table with the existing HTML main
        // and the row with the template
        // Clone the new row and insert it into the table
        let clone = template.content.cloneNode(true);
        let report = clone.querySelector(".report");
        let street = clone.querySelector(".street");
        let report_body = clone.querySelector(".report-body");
        let likes = clone.querySelector(".likes");
        let date = clone.querySelector(".date");
        console.log(report_body);
        report.setAttribute("id",data[i].pin_id);
        street.textContent = data[i].street;
        report_body.textContent = data[i].report_text;
        likes.textContent = "Likes:"+ data[i].like_number;
        date.textContent = data[i].createdAt.split("T")[0];
        console.log(MyReports);
        MyReports.appendChild(clone);
    }
})