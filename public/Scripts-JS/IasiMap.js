const openPopButtons = document.querySelectorAll('[data-pop-target]');
const openPopSuperButtons = document.querySelectorAll('[data-pop-target-super]');
const closePopButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const reportButtons = document.querySelectorAll('[report-button]');
const addReportButtons = document.querySelectorAll('[add-report-button]');

openPopButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const pop = document.querySelector(button.dataset.popTarget)
        console.log(pop);
        openPop(pop)
    })
})

openPopSuperButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const pop = document.querySelector(button.dataset.popTargetSuper)
        console.log(pop);
        openPopSuper(pop)
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
    for( i = 0 ; i < reportButtons.length;i++)
    {
        reportButtons[i].classList.add('disabled');
    }
    for( i = 0; i< addReportButtons.length;i++)
    {
        addReportButtons[i].classList.remove('disabled');
    }
}

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

function closePop(pop){
    if(pop == null) return
    pop.classList.remove('activated');
    overlay.classList.remove('activated');
}