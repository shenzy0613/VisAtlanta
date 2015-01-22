     var vacantMarkers = new Array;
    $.getJSON("data/10Examples.json", function(json_data) {
 
      var infowindows = new Array;
      var myLatlng = new google.maps.LatLng(33.7550,-84.3900);
      // var mapOptions = {
      //   zoom: 11,
      //   center: myLatlng,
      //   disableDefaultUI: false,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // }
      // var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      result = [];
      for(var key in json_data){
        var StopLatLon = new google.maps.LatLng(json_data[key].Lat,json_data[key].Lon);
        var goldStar = {
        path: 'M 15,0 30,20 23,20 23,28 7,28 7,20 0,20 z',
        fillColor: 'gold',
        fillOpacity: 0.8,
        scale: 0.7,
        strokeColor: 'yellow',
        strokeWeight: 2
        };
        var goldSquare = {
        path: 'M 30,0 30,13 23,13 23,28 7,28 7,13 0,13 0,0 z',
        fillColor: 'gold',
        fillOpacity: 0.8,
        scale: 0.7,
        strokeColor: 'yellow',
        strokeWeight: 2
        };
        if(json_data[key].Type == "Residential")
          var marker = new google.maps.Marker({
          position: StopLatLon,
          icon: goldStar,
          map: map,
          title: json_data[key].Address
          });
        else
          var marker = new google.maps.Marker({
          position: StopLatLon,
          icon: goldSquare,
          map: map,
          title: json_data[key].Address
          });
        infowindow = new google.maps.InfoWindow({
          content: "<b style='font-size:16px;clear:right;margin:2px,5px,2px,5px;'>"+json_data[key].Address+"   </b><ul><li>Since:"+json_data[key].Since+"</li><li>"+json_data[key].Sqft+" sqft.</li><img src='"+json_data[key].Pic+"' style='margin-top:4px;'>"
        });
        vacantMarkers.push(marker);
        infowindows.push(infowindow);
        google.maps.event.addListener(marker, 'click', (function(marker, key) {
        return function() {
          for(var index in infowindows){
            infowindows[index].close(map, marker);
          }
          infowindows[key].open(map, marker);
        }
        })(marker, key));
        
      }   
      
      hideVacantMarkers();
    });


function hideVacantMarkers(){
  for (var index in vacantMarkers){
    vacantMarkers[index].setVisible(false);
  }
}

function showVacantMarkers(){
  for (var index in vacantMarkers){
    vacantMarkers[index].setVisible(true);
  }
}
    
    // google.maps.event.addDomListener(window, 'load', initialize);
