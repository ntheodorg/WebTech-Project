function initMap(){
    // Map options
    var options = {
      zoom : 13,
      center:{lat:47.161726, lng:27.587914}
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'),options);
    const url = "/IasiMap/api/pins";
    fetch(url).then((response)=> {
        return response.json();
    }).then((data)=>{
        for( var i = 0; i< data.length;i++){
            addMarker(data[i]);
        }
    })
    function addMarker(props){
        var color = undefined;
        if(props.color === "green"){
            color = "Resources/IasiMap/green-pin.png";
        }
        else if (props.color === "yellow"){
            color = "Resources/IasiMap/yellow-pin.png";
        }
        else{
            color ="Resources/IasiMap/red-pin.png"
        }
        var marker = new google.maps.Marker({
            position: {lat:props.latitude,lng:props.longitude},
            map:map,
            icon:{
              url: color,
              scaledSize: new google.maps.Size(30,40)}
          })
          marker.addListener('click', () => {
          const pop = document.getElementById('pop');
          openPop(pop)
          })
        }
      }