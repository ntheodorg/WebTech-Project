import {getServerData} from "./getServerData.js";

let main = document.querySelector("main");
let template = document.querySelector('#eventTemplate');
function generateEvents(settings){
    fetch(settings.events.get.route).then((response)=> {
        return response.json();
    }).then((data)=>{
        for(let i = 0; i< data.length;i++){
            // Instantiate the table with the existing HTML main
            // and the row with the template
            // Clone the new row and insert it into the table
            let clone = template.content.cloneNode(true);
            let a = clone.querySelector("a");
            let h2 = clone.querySelector("h2");
            let p = clone.querySelector("p");
            let time = clone.querySelector("time");
            if(data[i].eventLink !== ""){
                a.setAttribute("href", data[i].eventLink);
            }
            h2.textContent = data[i].title;
            p.textContent = data[i].text;
            let date = data[i].createdAt.split("T");
            time.textContent = date[0];
            main.appendChild(clone);
        }
    })
}

getServerData().then(({userData, serverSettings}) => {
    let settings = {
        events:{
            get:{
                route:serverSettings.eventRoutes.event_get.route,
            }
        }
    }
    generateEvents(settings);
})
