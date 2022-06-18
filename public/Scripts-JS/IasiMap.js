import { getServerData } from './getServerData.js';

const overlay = document.getElementById('overlay');
const addForm = document.getElementById('add-report');
const addCollects = document.getElementById('add-collects');
const submitReport =document.getElementById('report-submit');
const submitCollects =document.getElementById('collects-submit');
let body = document.querySelector("body");
let pop_template = document.querySelector('#pop-template');
let report_template = document.querySelector('#report-template');
let reports;
let currentPinId;
function addEventToLikeButtons(){

}
function addEventToAddReportButtons(){
    const addReportButtons = document.querySelectorAll('.add-report-button');
    addReportButtons.forEach( button => { button.addEventListener('click',() => {
        const pops = document.querySelectorAll('.pop.activated');
        pops.forEach(pop =>{
            if(pop == null) return
            pop.classList.remove('activated');
            currentPinId = pop.id;
        })
        addForm.classList.add('activated');
        })
    })
}

function addEventToThrowGarbageButtons(){
    const throwGarbageButtons = document.querySelectorAll('.throw-garbage-button');
    throwGarbageButtons.forEach( button => { button.addEventListener('click',() => {
        const pops = document.querySelectorAll('.pop.activated');
        pops.forEach(pop =>{
            if(pop == null) return
            pop.classList.remove('activated');
            currentPinId = pop.id;
        })
        addCollects.classList.add('activated');
    })
    })
}

function closePop(pop){
    if(pop == null) return
    pop.classList.remove('activated');
    overlay.classList.remove('activated');
    currentPinId = undefined;
}

function addHandlers(userData) {
    fetch("/api/reports").then((res) => {
        return res.json();
    }).then((report_data) => {
        reports = report_data;
        fetch("/api/pins").then((response) => {
            return response.json();
        }).then((data) => {
            for (let i = 0; i < data.length; i++) {
                let pinId = data[i]._id;
                let pop_clone = pop_template.content.cloneNode(true);
                let stats = pop_clone.querySelectorAll('stat');
                let pop = pop_clone.querySelector('.pop');
                let reportTabHeader = pop_clone.querySelector('.report-tab-header');
                let button = document.createElement("BUTTON");
                if (userData.accountType === 'superuser') {
                    button.setAttribute("class", "collect-garbage-button");
                    button.textContent = "Collect";
                    reportTabHeader.appendChild(button);
                } else {
                    button.setAttribute("class", "add-report-button");
                    button.textContent = "Add Report";
                    reportTabHeader.appendChild(button);
                    let button2 = document.createElement("BUTTON");
                    button2.setAttribute("class", "throw-garbage-button");
                    button2.textContent = "Throw Garbage";
                    reportTabHeader.appendChild(button2);
                }
                stats[0].textContent = "Adress:" + data[i].street;
                stats[1].textContent = "Common garbage containers:" + data[i].common;
                stats[2].textContent = "Paper garbage containers:" + data[i].paper;
                stats[3].textContent = "Plastic garbage containers:" + data[i].plastic;
                stats[4].textContent = "Metal garbage containers:" + data[i].metal;
                pop.setAttribute("id", pinId);
                body.appendChild(pop_clone);
                for (let j = 0; j < reports.length; j++) {
                    if (reports[j].pin_id === pinId) {
                        let report_clone = report_template.content.cloneNode(true);
                        const reportTitle = report_clone.querySelector('.report-title');
                        let reportText = report_clone.querySelector('text');
                        let reportLikes = report_clone.querySelector('.likes');
                        let likebutton = report_clone.querySelector('.like-button-enabled');
                        let reportDate = report_clone.querySelector('.report-date');
                        reportDate.textContent = reports[j].createdAt.split("T")[0];
                        reportTitle.textContent = reports[j].reporter_name;
                        reportText.textContent = reports[j].report_text;
                        reportLikes.textContent = reports[j].like_number;
                        let reports_tab = document.getElementById(pinId).children[1];
                        likebutton.classList.add('hide');
                        reports_tab.appendChild(report_clone);
                    }
                }
            }
            preventDefaults();
            addOverlayHandler();
            addEventToThrowGarbageButtons();
            addEventToAddReportButtons();
            addEventToLikeButtons();
            submitReportHandler(userData);
            submitCollectsHandler(userData);
        })
    })
}

function addOverlayHandler(){
    overlay.addEventListener('click', () => {
        const pops = document.querySelectorAll('.pop.activated');
        const addReportForm = document.querySelector('.add-report.activated');
        const addCollectsForm = document.querySelector('.add-collects.activated');
        pops.forEach(pop => {
            closePop(pop);
        })
        closePop(addReportForm);
        closePop(addCollectsForm);
    })
}

function submitReportHandler(userData){
    submitReport.addEventListener('click', () => {
        const reportBody = document.getElementById("report-input").value;
        let jsonObject = {
            pin_id : currentPinId,
            reporter_name : userData.details.name + " " + userData.details.forename,
            report_text : reportBody,
            reporter_id : userData.id
        }
        fetch("/api/reports" , {
            method : "POST",
            headers : { 'content-type' : 'application/json'},
            body : JSON.stringify(jsonObject)
        }).then((response)=> {
            return response.json();
        }).then((data)=>{
            if(data === "true"){
                location.reload();
            }
        })
    });
}

function submitCollectsHandler(userData){
    submitCollects.addEventListener('click', () => {
        const var_material_type = document.getElementById("material-type").value;
        const var_quantity = document.getElementById("quantity").value;
        let jsonObject = {
            user_id : userData.id,
            pin_id : currentPinId,
            material_type : var_material_type,
            quantity : var_quantity
        }
        fetch("/api/collects" , {
            method : "POST",
            headers : { 'content-type' : 'application/json'},
            body : JSON.stringify(jsonObject)
        }).then((response)=> {
            return response.json();
        }).then((data)=>{
            if(data === "true"){
                location.reload();
            }
        })
    });
}

function preventDefaults(){
    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    })
    addCollects.addEventListener("submit", async (event) => {
        event.preventDefault();
    })
}

getServerData().then(({userData, serverSettings}) => {
    addHandlers(userData);
})