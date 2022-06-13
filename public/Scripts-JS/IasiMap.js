const openPopButtons = document.querySelectorAll('[data-pop-target]');
const openPopSuperButtons = document.querySelectorAll('[data-pop-target-super]');
const closePopButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const reportButtons = document.querySelectorAll('[report-button]');
const addReportButtons = document.querySelector('[add-report-button]');
const addForm = document.getElementById('add-report');
const submitReport =document.getElementById('report-submit');
let map = document.getElementById("map");
let pop_template = document.querySelector('#pop-template');
let report_template = document.querySelector('#report-template');
let reports = undefined;
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
        // Instantiate the table with the existing HTML main
        // and the row with the template
        // Clone the new row and insert it into the table
        let pinId = data[i]._id;
        let pop_clone = pop_template.content.cloneNode(true);
        let stats = pop_clone.querySelectorAll('stat');
        let popId = pop_clone.querySelector('.pop');
        stats[0].textContent = "Adress:"+data[i].street;
        stats[1].textContent = "Common garbage containers:"+data[i].common;
        stats[2].textContent = "Paper garbage containers:"+data[i].paper;
        stats[3].textContent = "Plastic garbage containers:"+data[i].plastic;
        stats[4].textContent = "Metal garbage containers:"+data[i].metal;
        popId.setAttribute("id",pinId);
        map.appendChild(pop_clone);
        for(let j = 0 ; j < reports.length; j++){
            if(reports[j].pin_id === pinId) {
                let report_clone = report_template.content.cloneNode(true);
                let reportTitle = report_clone.querySelector('.report-title');
                let reportText = report_clone.querySelector('p');
                console.log(reportText);
                let reportLikes = report_clone.querySelector('.likes');
                reportTitle.textContext = reports[j].reporter_name;
                reportText.textContext = reports[j].report_text;
                console.log(reportText);
                reportLikes.textContext = reports[j].like_number;
                console.log(reportLikes.textContext);
                console.log(reportText.textContext);
                console.log(reportTitle.textContext);
                let reports_tab = document.getElementById(pinId).children[1];
                console.log(reports_tab);
                reports_tab.appendChild(report_clone);
            }
        }

    }
})
/*
submitReport.addEventListener('click', () => {

    const reportBody = document.getElementById("report-input").value;
    let jsonObject = {
        street : formInputs[0].value,
        latitude : formInputs[1].value,
        longitude : formInputs[2].value,
        common : formInputs[3].value,
        plastic : formInputs[4].value,
        paper: formInputs[5].value,
        metal : formInputs[6].value
    }
    fetch("/api/pins" , {
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
/*
/*addReportButtons.addEventListener('click',() => {
    const pops = document.querySelectorAll('.pop.activated');
    pops.forEach(pop =>{
        if(pop == null) return
        pop.classList.remove('activated');
    })
    addForm.classList.add('activated');
})

 */

/*openPopButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const pop = document.querySelector(button.dataset.popTarget)
        openPop(pop)
    })
})

openPopSuperButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const pop = document.querySelector(button.dataset.popTargetSuper)
        openPopSuper(pop)
    })
})
*/
overlay.addEventListener('click', () => {
    const pops = document.querySelectorAll('.pop.activated');
    //const addForm = document.getElementById('add-report');
    pops.forEach(pop =>{
        closePop(pop);
    })
    //closePop(addForm);
})

closePopButtons.forEach(button => {
    button.addEventListener('click', () =>{     
        const pop = button.closest('.pop')
        closePop(pop)
    })
})

function openPop(pop){
    if(pop == null) return
    pop.classList.add('activated');
    overlay.classList.add('activated');
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
/*
function openPopSuper(pop){
    if(pop == null) return
    pop.classList.add('activated');
    overlay.classList.add('activated');
    for( i = 0 ; i < reportButtons.length;i++)
    {
        reportButtons[i].classList.remove('disabled');
    }
    for( i = 0; i< addReportButtons.length;i++)
    {
        addReportButtons[i].classList.add('disabled');
    }

}
*/
function closePop(pop){
    if(pop == null) return
    pop.classList.remove('activated');
    overlay.classList.remove('activated');
}