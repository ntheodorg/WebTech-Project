function initMap(){
    // Map options
    let options = {
      zoom : 13,
      center:{lat:47.161726, lng:27.587914}
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'),options);
    const url = "/api/pins";
    fetch(url).then((response)=> {
        return response.json();
    }).then((data)=>{
        for( var i = 0; i< data.length;i++){
            addMarker(data[i]);
        }
    })
    function addMarker(props){
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
        let marker = new google.maps.Marker({
            position: {lat:props.latitude,lng:props.longitude},
            map:map,
            icon:{
              url: color,
              scaledSize: new google.maps.Size(30,40)},
            id: props._id
          })
          marker.addListener('click', () => {
          const pop = document.getElementById(marker.id); // TODO
          openPop(pop)
          })
    }
    function openPop(pop){
        if(pop == null) return
        pop.classList.add('activated');
        overlay.classList.add('activated');
        /*for( i = 0 ; i < reportButtons.length;i++)
        {
            reportButtons[i].classList.add('disabled');
        }
        for( i = 0; i< addReportButtons.length;i++)
        {
            addReportButtons[i].classList.remove('disabled');
        }

     */
    }
}