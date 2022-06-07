const openAddPopButton = document.getElementById('add-btn');
const openRemovePopButton = document.getElementById('remove-btn');
const overlay = document.getElementById('overlay');

console.log(openAddPopButton);
console.log(openRemovePopButton);
console.log(overlay);
openAddPopButton.addEventListener('click', () =>{
        const addPop = document.getElementById('add-pop');
        console.log(addPop);
        openPop(addPop)
})

openRemovePopButton.addEventListener('click', () =>{
        const removePop = document.getElementById('remove-pop');
        console.log(removePop);
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