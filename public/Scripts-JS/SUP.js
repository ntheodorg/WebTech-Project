const openAddPopButton = document.getElementById('add-btn');
const openRemovePopButton = document.getElementById('remove-btn');
const overlay = document.getElementById('overlay');
const removePin = document.getElementById('btn-delete');
const addForm = document.querySelectorAll('form');
const addPin = document.getElementById('add-pin');
const formInputs = document.getElementsByClassName('form-input');
const url = "/api/pins";

addForm.forEach( form => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
    })
})

fetch(url).then((response)=> {
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
    console.log(jsonObject);
    fetch(url , {
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
openAddPopButton.addEventListener('click', () =>{
        const addPop = document.getElementById('add-pop');
        openPop(addPop)
})

openRemovePopButton.addEventListener('click', () =>{
        const removePop = document.getElementById('remove-pop');
        openPop(removePop)

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

removePin.addEventListener('click' , async (event ) => {
    event.preventDefault();
    let select = document.getElementById('identifier');
    let selectedpin = select.value;
    let jsonObject = {
        street: selectedpin
    }
    const url = "/api/pins";
    fetch(url , {
        method : "DELETE",
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