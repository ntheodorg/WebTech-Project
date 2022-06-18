let map = L.map('map').setView([47.161726, 27.587914], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const url = "/api/pins";
fetch(url).then((response)=> {
    return response.json();
}).then((data)=>{
    for( var i = 0; i< data.length;i++){
        addMarker(data[i]);
    }
})

function addMarker(props){
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
    var Icon = new LeafIcon({
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