const openPopButtons = document.querySelectorAll('[data-pop-target]');
const openPopSuperButtons = document.querySelectorAll('[data-pop-target-super]');
const closePopButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const addForm = document.getElementById('add-report');
const submitReport =document.getElementById('report-submit');
let map = document.getElementById("map");
let pop_template = document.querySelector('#pop-template');
let report_template = document.querySelector('#report-template');
let reports = undefined;
let currentPinId = undefined;

addForm.addEventListener("submit", async (event) => {
    event.preventDefault();
})
fetch("/api/reports").then((res)=> {
    return res.json();
}).then((report_data)=>{reports = report_data});

fetch("/api/pins").then((response)=> {
    return response.json();
}).then((data)=>{
    for(let i = 0; i< data.length;i++){
        let pinId = data[i]._id;
        let pop_clone = pop_template.content.cloneNode(true);
        let stats = pop_clone.querySelectorAll('stat');
        let pop = pop_clone.querySelector('.pop');
        stats[0].textContent = "Adress:"+data[i].street;
        stats[1].textContent = "Common garbage containers:"+data[i].common;
        stats[2].textContent = "Paper garbage containers:"+data[i].paper;
        stats[3].textContent = "Plastic garbage containers:"+data[i].plastic;
        stats[4].textContent = "Metal garbage containers:"+data[i].metal;
        pop.setAttribute("id",pinId);
        map.appendChild(pop_clone);
        for(let j = 0 ; j < reports.length; j++){
            if(reports[j].pin_id === pinId) {
                let report_clone = report_template.content.cloneNode(true);
                const reportTitle = report_clone.querySelector('.report-title');
                let reportText = report_clone.querySelector('text');
                let reportLikes = report_clone.querySelector('.likes');
                let reportDate = report_clone.querySelector('.report-date');
                reportDate.textContent = reports[j].createdAt.split("T")[0];
                reportTitle.textContent = reports[j].reporter_name;
                reportText.textContent = reports[j].report_text;
                reportLikes.textContent = "Likes:" + reports[j].like_number;
                let reports_tab = document.getElementById(pinId).children[1];
                reports_tab.appendChild(report_clone);
            }
        }
    }
    addEventToAddReportButtons();
})

submitReport.addEventListener('click', () => {
    const reportBody = document.getElementById("report-input").value;
    let jsonObject = {
        pin_id : currentPinId,
        reporter_name : "TEO-DAMI-USERUL",
        report_text : reportBody
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
})

function addEventToAddReportButtons(){
    const addReportButtons = document.querySelectorAll('.add-report-button');
    addReportButtons.forEach( button => { button.addEventListener('click',() => {
        const pops = document.querySelectorAll('.pop.activated');
        pops.forEach(pop =>{
            if(pop == null) return
            pop.classList.remove('activated');
        })
        addForm.classList.add('activated');
        })
    })
}

overlay.addEventListener('click', () => {
    const pops = document.querySelectorAll('.pop.activated');
    const addForm = document.querySelector('.add-report.activated');
    pops.forEach(pop =>{
        closePop(pop);
    })
    closePop(addForm);
})

closePopButtons.forEach(button => {
    button.addEventListener('click', () =>{     
        const pop = button.closest('.pop');
        closePop(pop);
    })
})

function openPop(pop){
    if(pop == null) return
    pop.classList.add('activated');
    overlay.classList.add('activated');
    currentPinId = pop.id;
    /*for( i = 0 ; i < reportButtons.length;i++)
    {
        reportButtons[i].classList.add('disabled');
    }
    for( i = 0; i< addReportButtons.length;i++)
    {
        addReportButtons[i].classList.remove('disabled');
    }

 */
}

function closePop(pop){
    if(pop == null) return
    pop.classList.remove('activated');
    overlay.classList.remove('activated');
    currentPinId = undefined;
}