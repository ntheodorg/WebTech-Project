const openPopButtons = document.querySelectorAll('[data-pop-target');
const closePopButtons = document.querySelectorAll('[data-close-button');
const overlay = document.getElementById('overlay');
console.log('Am intrat');

openPopButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const pop = document.querySelector(button.dataset.popTarget)
        openPop(pop)
    })
})

overlay.addEventListener('click', () => {
    const pops = document.querySelectorAll('.pop.activated');
    pops.forEach(pop =>{
        closePop(pop);
    })

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
}

function closePop(pop){
    if(pop == null) return
    pop.classList.remove('activated');
    overlay.classList.remove('activated');
}