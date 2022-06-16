import {getServerData} from "./getServerData.js";

const openAddPopButton = document.getElementById('add-btn');
const overlay = document.getElementById('overlay');
function addHandlers(userData){
    decorateProfile(userData);
    openAddPopButton.addEventListener('click', () =>{
        const addPop = document.getElementById('add-pop');
        openPop(addPop);
    })

    overlay.addEventListener('click', () => {
        const addPops = document.querySelectorAll('.add-pop.activated');
        const removePops = document.querySelectorAll('.remove-pop.activated');
        addPops.forEach(pop =>{
            closePop(pop);
        })
        removePops.forEach(pop =>{
            closePop(pop);
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