const openAddPopButton = document.getElementById('add-btn');
const openRemovePopButton = document.getElementById('remove-btn');
const overlay = document.getElementById('overlay');
const removePin = document.getElementById('btn-delete');

const url = "/api/pins";
fetch(url).then((response)=> {
    return response.json();
}).then((data)=>{
    let select = document.getElementById('identifier');
    for( var i = 0; i< data.length;i++){
        let option = document.createElement("option");
        option.innerText = data[i].street;
        select.appendChild(option);
    }
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

removePin.addEventListener('click' , () => {
    let selectedpin = document.getElementById('identifier').value;
    let jsonObject = {
        address: selectedpin
    }
    const url = "/api/pins";
    let rawResponse = fetch(url , {
        method : "DELETE",
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify(jsonObject)
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

/*fetch(url).then((response)=> {
    return response.json();
}).then((data)=>{
    for( var i = 0; i< data.length;i++){
        addMarker(data[i]);
    }
})
 */