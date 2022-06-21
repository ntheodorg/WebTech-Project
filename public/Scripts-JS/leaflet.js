import { getServerData } from './getServerData.js';

function initMap(settings){
    let map = L.map('map').setView([47.161726, 27.587914], 13);
    let quarters = initQuarters(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    fetch(settings.pins.get.route).then((response)=> {
        return response.json();
    }).then((data)=>{
        for( var i = 0; i< data.length;i++){
            addMarker(data[i],settings,map);
        }
    })
}
function initQuarters(map){
    let polygon1 = L.polygon([
        [47.169099, 27.577112],
        [47.168486, 27.593330],
        [47.159537, 27.600049],
        [47.152049, 27.587954],
        [47.158467, 27.575352],
        [47.163565, 27.572428]
    ] , {opacity: 0 , color: "green"} ).addTo(map);
    let centru = {
        name: "Centru",
        object: polygon1
    }

    let polygon2 = L.polygon([
        [47.169099, 27.577112],
        [47.168486, 27.593330],
        [47.197161, 27.559113],
        [47.193153, 27.549159],
        [47.172762, 27.570464]
    ] , {opacity: 0, color: "yellow"}).addTo(map);
    let copou = {
        name: "Copou" ,
        object: polygon2
    }

    let polygon3 = L.polygon([
        [47.172762, 27.570464],
        [47.169099, 27.577112],
        [47.163565, 27.572428],
        [47.171948, 27.559141],
        [47.173766, 27.560459]
    ] , {opacity: 0, color: "orange"}).addTo(map);
    let gara = {
        name: "Gara" ,
        object: polygon3
    }

    let polygon4 = L.polygon([
        [47.171948, 27.559141],
        [47.173766, 27.560459],
        [47.178011, 27.557524],
        [47.176844, 27.531945],
        [47.172227, 27.532793],
        [47.173517, 27.551694]
    ] , {opacity: 0, color: "blue"}).addTo(map);
    let pacurari = {
        name: "Pacurari" ,
        object: polygon4
    }

    let polygon5 = L.polygon([
        [47.172227, 27.532793],
        [47.173517, 27.551694],
        [47.171948, 27.559141],
        [47.162522, 27.556314],
        [47.165883, 27.553113],
        [47.166704, 27.543295]
    ] , {opacity: 0, color: "purple"}).addTo(map);
    let dacia = {
        name: "Dacia" ,
        object: polygon5
    }

    let polygon6 = L.polygon([
        [47.171948, 27.559141],
        [47.162522, 27.556314],
        [47.158467, 27.575352],
        [47.163565, 27.572428],
    ] , {opacity: 0, color: "black"}).addTo(map);
    let alexandru = {
        name: "Alexandru" ,
        object: polygon6
    }

    let polygon7 = L.polygon([
        [47.159537, 27.600049],
        [47.152049, 27.587954],
        [47.154669, 27.602828],
        [47.152924, 27.613191],
        [47.159009, 27.601689]
    ] , {opacity: 0, color: "purple"}).addTo(map);
    let tudor = {
            name: "Tudor" ,
            object: polygon7
    }
    let polygon8 = L.polygon([
        [47.168486, 27.593330],
        [47.159537, 27.600049],
        [47.152924, 27.613191],
        [47.150435, 27.629750],
        [47.177774, 27.604476]
    ] , {opacity: 0, color: "black"}).addTo(map);
    let tatarasi = {
        name: "Tatarasi" ,
        object: polygon8
    }

    let polygon9 = L.polygon([
        [47.152049, 27.587954],
        [47.154669, 27.602828],
        [47.150435, 27.629750],
        [47.143663, 27.648296],
        [47.141731, 27.599782]
    ] , {opacity: 0, color: "yellow"}).addTo(map);
    let industriala = {
        name: "Industriala" ,
        object: polygon9
    }

    let polygon10 = L.polygon([
        [47.141731, 27.599782],
        [47.152049, 27.587954],
        [47.158467, 27.575352],
        [47.147324, 27.573304],
        [47.140978, 27.590118]

    ] , {opacity: 0, color: "orange"}).addTo(map);
    let nicolina = {
        name: "Nicolina" ,
        object: polygon10
    }

    let polygon11 = L.polygon([
        [47.158467, 27.575352],
        [47.147324, 27.573304],
        [47.153142, 27.563409],
        [47.162450, 27.556541]

    ] , {opacity: 0, color: "blue"}).addTo(map);
    let mircea = {
        name: "Mircea" ,
        object: polygon11
    }
    let myQuarters = [ centru,copou,gara,pacurari,dacia,alexandru,tudor,industriala,tatarasi,nicolina,mircea];
    return myQuarters;
}

function addQuarterToPin (pinData,marker,settings){
    let quarterName = getPinQuarter(marker);
    let jsonObject = {
        pin_id : pinData._id,
        quarter : quarterName
    }
    fetch(settings.pins.patch.route , {
        method : settings.pins.patch.method,
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify(jsonObject)
    }).then((response)=> {
        return response.json();
    }).then((data)=>{
        if(data === "true"){
            location.reload();
        }
    })
}

function getPinQuarter(marker){
    for(let i = 0 ; i< quarters.length;i++){
        if(quarters[i].object.contains(marker.getLatLng())){
            return quarters[i].name;
        }
    }
    return "Suburbie";
}

function addMarker(props,settings,map){
    let LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [30, 40],
            iconAnchor:   [15, 40],
        }
    });
    let color = undefined;
    if(props.color === "green"){
        color = "Resources/IasiMap/green-pin.png";
    }
    else if (props.color === "yellow"){
        color = "Resources/IasiMap/yellow-pin.png";
    }
    else{
        color ="Resources/IasiMap/red-pin.png"
    }
    let marker = L.marker([props.latitude, props.longitude]).addTo(map);
    if(props.quarter === undefined){
        addQuarterToPin(props,marker,settings);
    }

    //console.log(polygon.contains(marker.getLatLng()));
    //console.log(center);
    let Icon = new LeafIcon({
        iconUrl: color
    })
    marker.setIcon(Icon);
    marker.addEventListener('click', () => {
        const pop = document.getElementById(props._id); // TODO
        openPop(pop)
    })
}
function openPop(pop){
    if(pop == null) return
    pop.classList.add('activated');
    overlay.classList.add('activated');
}

getServerData().then(({userData, serverSettings}) => {
    let settings = {
        pins: {
            get:{
                route:"api/pins",
                method:"GET"
            },
            patch:{
                route:"api/pins",
                method:"PATCH"
            }
        }
    }
    initMap(settings);
})