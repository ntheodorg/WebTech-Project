import {getServerData} from "./getServerData.js";

let MyReports = document.querySelector(".MyReports");
let template = document.querySelector('#report-template');
function addHandlers(userData){
    decorateProfile(userData);
    fetch("/api/myReports")
        .then((response)=> {
            return response.json();
        }).then((data)=>{
        for(let i = 0; i< data.length;i++){
            // Instantiate the table with the existing HTML main
            // and the row with the template
            // Clone the new row and insert it into the table
            let clone = template.content.cloneNode(true);
            let report = clone.querySelector(".report");
            let street = clone.querySelector(".street");
            let report_body = clone.querySelector(".report-body");
            let likes = clone.querySelector(".likes");
            let date = clone.querySelector(".date");
            report.setAttribute("id",data[i]._id);
            street.textContent = data[i].street;
            report_body.textContent = data[i].report_text;
            likes.textContent = "Likes:"+ data[i].like_number;
            date.textContent = data[i].createdAt.split("T")[0];
            MyReports.appendChild(clone);
        }
        deleteButtonsHandler();
    })
}

function deleteButtonsHandler(){
    let buttons = document.querySelectorAll(".delete-btn");
    buttons.forEach(button =>{
        button.addEventListener('click', () => {
            fetch("/api/reports",{
                method : "DELETE",
                headers : { 'content-type' : 'application/json'},
                body : JSON.stringify(button.parentNode.parentNode.id)
            }).then((response)=> {
                return response.json();
            }).then((data)=>{
                if(data === "true"){
                    location.reload();
                }
            })
        })
    })
}

function decorateProfile(userData){
    const user_name = document.getElementById("user-name");
    const user_forename = document.getElementById("user-forename");
    const mail = document.getElementById("mail");
    const age = document.getElementById("age");
    user_name.textContent = "User name:"+userData.details.name;
    user_forename.textContent = "User forename:"+userData.details.forename;
    mail.textContent = "Email:"+userData.email;
    age.textContent = "Age:"+userData.details.age;
}

getServerData().then(({userData, serverSettings}) => {
    addHandlers(userData);
})