import {getServerData} from "./getServerData.js";

const openAddPopButton = document.getElementById('add-btn');
const openRemovePopButton = document.getElementById('remove-btn');
const openEventPopButton = document.getElementById("event-remove-btn");
const overlay = document.getElementById('overlay');
const removePin = document.getElementById('btn-delete');
const removeEvent = document.getElementById('event-btn-delete');
const addForm = document.querySelectorAll('form');
const addPin = document.getElementById('add-pin');
const formInputs = document.getElementsByClassName('form-input');
const eventSubmit = document.getElementById('event-submit');

function addHandlers(userData,settings){
    decorateProfile(userData);
    addForm.forEach( form => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
        })
    })

    fetch(settings.pins.get.route).then((response)=> {
        return response.json();
    }).then((data)=>{
        let select = document.getElementById('identifier');
        for(let i = 0; i< data.length;i++){
            let option = document.createElement("option");
            option.innerText = data[i].street;
            option.setAttribute("class","option-class");
            select.appendChild(option);
        }
    })

    fetch(settings.events.get.route).then((response)=> {
        return response.json();
    }).then((data)=>{
        let select = document.getElementById('event-title');
        for(let i = 0; i< data.length;i++){
            let option = document.createElement("option");
            option.innerText = data[i].title;
            option.setAttribute("class","option-class");
            select.appendChild(option);
        }
    })
    addPin.addEventListener('click', ()=> {
        let jsonObject = {
            street : formInputs[0].value,
            latitude : formInputs[1].value,
            longitude : formInputs[2].value,
            common : formInputs[3].value,
            plastic : formInputs[4].value,
            paper: formInputs[5].value,
            metal : formInputs[6].value
        }
        fetch(settings.pins.post.route , {
            method : settings.pins.post.method,
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



    openAddPopButton.addEventListener('click', () =>{
        const addPop = document.getElementById('add-pop');
        openPop(addPop);
    })

    openRemovePopButton.addEventListener('click', () =>{
        const removePop = document.getElementById('remove-pop');
        openPop(removePop);

    })

    openEventPopButton.addEventListener('click', () =>{
        const eventRemovePop = document.getElementById('event-remove-pop');
        openPop(eventRemovePop);

    })


    overlay.addEventListener('click', () => {
        const addPops = document.querySelectorAll('.add-pop.activated');
        const removePops = document.querySelectorAll('.remove-pop.activated');
        const eventRemovePops = document.querySelectorAll('.event-remove-pop.activated');
        addPops.forEach(pop =>{
            closePop(pop);
        })
        removePops.forEach(pop =>{
            closePop(pop);
        })
        eventRemovePops.forEach(pop =>{
            closePop(pop);
        })
    })

    removePin.addEventListener('click' , async (event ) => {
        event.preventDefault();
        let select = document.getElementById('identifier');
        let selectedpin = select.value;
        let jsonObject = {
            street: selectedpin
        }
        fetch(settings.pins.delete.route , {
            method : settings.pins.delete.method,
            headers : { 'content-type' : 'application/json'},
            body : JSON.stringify(jsonObject)
        }).then((response)=> {
            return response.json();
        }).then((data)=>{
            console.log(data);
            if(data === "true"){
                location.reload();
            }
        })
    })

    removeEvent.addEventListener('click' , async (event ) => {
        event.preventDefault();
        let select = document.getElementById('event-title');
        let selectedEvent = select.value;
        let jsonObject = {
            title: selectedEvent
        }
        fetch(settings.events.delete.route , {
            method : settings.events.delete.method,
            headers : { 'content-type' : 'application/json'},
            body : JSON.stringify(jsonObject)
        }).then((response)=> {
            return response.json();
        }).then((data)=>{
            console.log(data);
            if(data === "true"){
                location.reload();
            }
        })
    })

    eventSubmit.addEventListener('click', async (event ) => {
        event.preventDefault();
        let eventInputs = document.getElementsByClassName('event-input');
        let jsonObject = {
            title : eventInputs[0].value,
            text : eventInputs[1].value,
            eventLink : eventInputs[2].value
        }
        fetch(settings.events.post.route , {
            method : settings.events.post.method,
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
}
function openPop(pop){
    if(pop == null) return
    pop.classList.add('activated');
    overlay.classList.add('activated');
}

function closePop(pop){
    if(pop == null) return
    pop.classList.remove('activated');
    overlay.classList.remove('activated');
}
function decorateProfile(userData){
    const company_name = document.getElementById("company_name");
    const company_street = document.getElementById("company_street");
    const contact_number = document.getElementById("contact_number");
    const mail = document.getElementById("mail");
    company_name.textContent = "Company name:"+userData.details.company_name;
    company_street.textContent = "Company street:"+userData.details.company_street;
    contact_number.textContent = "Contact number"+userData.details.contact_number;
    mail.textContent = "Email:"+userData.email;
}

getServerData().then(({userData, serverSettings}) => {
    let settings = {
        pins:{
            post:{
                route:"/api/pins",
                method:"POST"
            },
            delete:{
                route:'api/pins',
                method:"DELETE"
            },
            get:{
                route:"api/pins",
                method:"GET"
            }
        },
        events:{
            delete:{
                route:"api/events",
                method:"DELETE"
            },
            get:{
                route:"api/events",
                method:"GET"
            },
            post:{
                route:"api/events",
                method:"POST"
            }
        }
    }
    addHandlers(userData,settings);
})