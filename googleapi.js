function initMap(){
    // Map options
    var options = {
      zoom : 13,
      center:{lat:47.161726, lng:27.587914}
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'),options);
    var markers =[
      {
        coords:{lat:47.169469, lng:27.548425},
        iconImage:"Resources/IasiMap/green-pin.png"
      },
      {
        coords:{lat:47.158469, lng:27.558425},
        iconImage:"Resources/IasiMap/red-pin.png"
      },
      {
        coords:{lat:47.188469, lng:27.578425},
        iconImage:"Resources/IasiMap/yellow-pin.png"
      },
      {
        coords:{lat:47.178469, lng:27.60},
        iconImage:"Resources/IasiMap/red-pin.png"
      },
      {
        coords:{lat:47.208469, lng:27.558425},
        iconImage:"Resources/IasiMap/yellow-pin.png"
      },
    ];
    for( var i = 0; i< markers.length;i++){
      addMarker(markers[i]);

    }

    function addMarker(props){
      var marker = new google.maps.Marker({
        position: props.coords,
        map:map,
        icon:{
          url: props.iconImage,
          scaledSize: new google.maps.Size(30,40)}
      })
      marker.addListener('click', () => {
      const pop = document.getElementById('pop');
      openPop(pop)
      })
    }
  }