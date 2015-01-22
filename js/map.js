//Constants
// var polyStyle = {fillColor: "#1abc9c", strokeColor: "#1abc9c", fillOpacity: 0.1, strokeWidth: 0};
// var polyHighlightStyle = {ffillColor: "#1abc9c", strokeColor: "#1abc9c", fillOpacity: 0.8, strokeWidth: 0};

var initpolyStyle = {fillColor: "#1abc9c", strokeColor: "#16a085", fillOpacity: 0.1, strokeWeight: 1, zIndex:0};
var polyStyle = {strokeColor: "#16a085", strokeWeight: 1, zIndex:0};
var polyFilterInitStyle = {fillColor: "#3498DB", strokeColor: "#16a085", fillOpacity: 0.1, strokeWeight: 1, zIndex:0};
var polyFilterStyle = {fillColor: "#3498DB", strokeColor: "#16a085", fillOpacity: 0.7, strokeWeight: 1, zIndex:0};
var polyHighlightStyle = {strokeColor: "#000000", strokeWeight: 2,zIndex:200};
var polySelectedStyle = {strokeColor: "#ff0000", strokeWeight: 2,zIndex:200};

var map;

var tooltipHTML = "";

var zoomLevel = 12;
var mapBounds;
var selectedCT = new Array();
var comparison = 0;

var globalVariable = "";
var globalCategory = "";
var globalCategory2 = "";

var ridershipJSON;
$.getJSON("data/MartaRidership.json", function (data){
    ridershipJSON = JSON.parse(JSON.stringify(data));
    $.each(ridershipJSON, function(i, item){
        item['latLon'] = new google.maps.LatLng(item['lat'], item['lon']);
    });
    //console.log(ridershipJSON);
    //TODO: recover
    drawMartaRidershipWalkscore(map);
    hideMartaRidershipWalkscore(map);
});
var ridershipDrawn = false;
var ridershipListener;


/* variable, category */
var dataJSON;
var filterJSON;
var popJson;
var variable;
var category;

function LegendControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  // controlDiv.style.padding = '5px';

  // // Set CSS for the control border
  // var controlUI = document.createElement('div');
  // controlUI.title = 'Show Legend';
  // controlDiv.appendChild(controlUI);

  // // Set CSS for the control interior
  // var controlText = document.createElement('div');
  // controlText.innerHTML = '<b style="">Legend</b>';
  // controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago

  $("#legendButton").on("click", function() {
    if($(".layerControl #martaCheckbox").is(':checked')){
        if($("#PopChecked").is(':checked')    ||
            $("#MedianChecked").is(':checked')          ||
            $("#DiversityIndexChecked").is(':checked')     ||
            $("#ValueChecked").is(':checked')        ||
            $("#MHIChecked").is(':checked'))
        {
            console.log($(".radioOption #vacancyRadio").is(':checked'))
            $("#legendNumber").hide();
            $("#legendNumberMarta").fadeToggle();
            $("#legendPercentage").hide();
            $("#legendPercentageMarta").hide();
        }
        else
        {
            console.log($(".radioOption #vacancyRadio").is(':checked'))
            
            $("#legendNumber").hide();
            $("#legendNumberMarta").hide();
            $("#legendPercentage").hide();
            $("#legendPercentageMarta").fadeToggle();
        }
    }
    else{
        if($("#PopChecked").is(':checked')    ||
            $("#MedianChecked").is(':checked')          ||
            $("#DiversityIndexChecked").is(':checked')     ||
            $("#ValueChecked").is(':checked')        ||
            $("#MHIChecked").is(':checked'))
        {
            console.log($(".radioOption #vacancyRadio").is(':checked'))
            $("#legendPercentageMarta").hide();
            $("#legendNumber").fadeToggle();
            $("#legendNumberMarta").hide();
            $("#legendPercentage").hide();
        }
        else
        {
            console.log($(".radioOption #vacancyRadio").is(':checked'))
            
            $("#legendPercentageMarta").hide();
            $("#legendNumber").hide();
            $("#legendNumberMarta").hide();
            $("#legendPercentage").fadeToggle();
        }
    }
  });
  // google.maps.event.addDomListener(controlUI, 'click', function() {

    
  // });

}

function initialize() {

    var atlanta = new google.maps.LatLng(33.7550, -84.3900);
    var mapOptions = {
        zoom: zoomLevel,
        center: atlanta,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    }

    /** @constructor */

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var homeControlDiv = document.createElement('div');
    homeControlDiv.className = "layerControlContainer";
    var homeControl = new HomeControl(homeControlDiv, map, atlanta);
    
    var legendControlDiv = document.createElement('div');
    var legendControl = new LegendControl(legendControlDiv, map);

    legendControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(legendControlDiv);

    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

    //Load, parse and display KML
    var myParser = new geoXML3.parser({
        map: map,
        suppressInfoWindows: true,
        // processStyles: true,
        // createMarker: addMyMarker,
        // createOverlay: addMyOverlay,
        afterParse: useKMLData
    });

    myParser.parse('data/CTFinal.kml');

    var transitLayer = new google.maps.TransitLayer();
    
    $('#mapContainer').on("click",".layerControl #censusTractCheckboxLabel", function () {
        if($(this).hasClass('checked'))myParser.hideDocument();
        else myParser.showDocument();
    });

    $('#mapContainer').on("click",".layerControl #transitCheckboxLabel", function () {
        console.log("transit layer");
        if($(this).hasClass('checked'))transitLayer.setMap();
        else transitLayer.setMap(map);
    });

    $('#mapContainer').on("click",".layerControl #martaCheckboxLabel", function () {
        console.log("marta layer");
        if($(this).hasClass('checked'))
        {
            hideMartaRidershipWalkscore(map);
            if($("#legendPercentageMarta").is(":visible"))
            {
                $("#legendPercentageMarta").hide();
                $("#legendPercentage").show();
            }
            else if($("#legendNumberMarta").is(":visible"))
            {
                $("#legendNumberMarta").hide();
                $("#legendNumber").show();
            }
        }
        else 
        {
            showMartaRidershipWalkscore(map);
            if($("#legendPercentage").is(":visible"))
            {
                $("#legendPercentage").hide();
                $("#legendPercentageMarta").show();
            }
            else if($("#legendNumber").is(":visible"))
            {
                $("#legendNumber").hide();
                $("#legendNumberMarta").show();
            }
        }

    });

    $("#legendPercentage").hide();
    $("#legendPercentageMarta").hide();
    $("#legendNumber").hide();
    $("#legendNumberMarta").hide();

    google.maps.event.addListener(map, 'zoom_changed', function (){
      zoomLevel = map.getZoom();
      // map.setCenter(myLatLng);
      // infowindow.setContent('Zoom: ' + zoomLevel);
      console.log(zoomLevel);
    });

    google.maps.event.addDomListener(window, "resize", resizeMap);
    
    google.maps.event.addListener(map, 'dragend', function () {
    });

}

function resizeMap(){    
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
}


function HomeControl(controlDiv, map, home) {

    // We set up a variable for this since we're adding
    // event listeners later.
    var control = this;

    // Set the home property upon construction
    control.home_ = home;

    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var layerControl = document.createElement('div');
    layerControl.className = "layerControl";
    layerControl.style.backgroundColor = 'white';
    layerControl.style.cursor = 'pointer';
     layerControl.title = 'Choose Interested Layer';
    controlDiv.appendChild(layerControl);

    // Set CSS for the control interior
    var tractCheckbox = document.createElement('input');
    tractCheckbox.type = "checkbox";
    tractCheckbox.id = "censusTractCheckbox";
    tractCheckbox.name = "Census Tract";
    tractCheckbox.value = "censusTract";
    tractCheckbox.checked = "checked";
    var tractCheckboxLabel = document.createElement('label');
    tractCheckboxLabel.htmlFor = "censusTractCheckbox";
    tractCheckboxLabel.appendChild(document.createTextNode('Census Tract'));


    // Set CSS for the control interior
    var transitCheckbox = document.createElement('input');
    transitCheckbox.type = "checkbox";
    transitCheckbox.id = "transitCheckbox";
    transitCheckbox.name = "Transit";
    transitCheckbox.value = "transit";
    var transitCheckboxLabel = document.createElement('label');
    transitCheckboxLabel.htmlFor = "transitCheckbox";
    transitCheckboxLabel.appendChild(document.createTextNode('Transit'));


    var martaCheckbox = document.createElement('input');
    martaCheckbox.type = "checkbox";
    martaCheckbox.id = "martaCheckbox";
    martaCheckbox.name = "marta";
    martaCheckbox.value = "marta";
    var martaCheckboxLabel = document.createElement('label');
    martaCheckboxLabel.htmlFor = "martaCheckbox";
    martaCheckboxLabel.appendChild(document.createTextNode('Marta'));
    martaCheckboxLabel.appendChild(document.createElement('br'));


    // var layerControls =   '';  
    // layerControls += '<ul class="nav"><li class="active" style="padding: 5px 0px 0 0;font-size: 18px;font-family: lato;color: #555555;">Map</li></ul>';
    // layerControls += '<label class="checkbox" for="censusTractCheckbox" id="censusTractCheckboxLabel">';
    // layerControls += '    <input type="checkbox" value="" id="censusTractCheckbox" data-toggle="checkbox">';
    // layerControls += 'Census Tract';
    // layerControls += '</label>';
    // layerControls += '<label class="checkbox" for="transitCheckbox" id="transitCheckboxLabel">';
    // layerControls += '    <input type="checkbox" value="" id="transitCheckbox" data-toggle="checkbox">';
    // layerControls += 'Transit';
    // layerControls += '</label>';
    // layerControls += '<label class="checkbox" for="martaCheckbox" id="martaCheckboxLabel">';
    // layerControls += '    <input type="checkbox" value="" id="martaCheckbox" data-toggle="checkbox">';
    // layerControls += 'Marta';
    // layerControls += '</label>';
    // $(layerControl).append(layerControls);
    // $("#censusTractCheckbox").click();
    // $("#transitCheckbox").dblclick();
    // $("#martaCheckbox").dblclick();


}

google.maps.event.addDomListener(window, 'load', initialize);

function getPopValue(ctn)
{
    for (var CT in popJSON){
        
        if (popJSON[CT].CTN == ctn){
            return popJSON[CT].Population;
            break;
        }
    }
}

function useKMLData(doc) {
    geoXmlDoc = doc[0];

        //console.log(geoXmlDoc);
    
    for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {

        var placemark = geoXmlDoc.placemarks[i];
        if (placemark.polygon) {
            placemark.polygon.setOptions(initpolyStyle);
            
            placemark.polygon.CTN = parseInt(placemark.name).toString();
            //console.log(placemark.polygon.CTN);
            tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
            
            highlightPoly(placemark.polygon, i, tooltipHTML);

            //placemark.polygon.CTN = parseInt(placemark.name).toString();
            //Add click event handler to draw detail CT view
            google.maps.event.addListener(placemark.polygon, "click", function () {
                if (comparison == 0){
                    if (selectedCT[0] == this.CTN){
                        selectedCT[0] = this.CTN;
                    } else{
                        
                        selectedCT[0] = this.CTN;
                        //select - 
                        drawDetailView(this.CTN);
                        
                    }
                } else{
                    if (selectedCT.indexOf(this.CTN)>-1){
                        var index = selectedCT.indexOf(this.CTN);
                        selectedCT.splice(index,1);
                        drawComparisonView(selectedCT);
                        
                    } else{
                        selectedCT.push(this.CTN);
                        drawComparisonView(selectedCT);
                        
                    }
                }
                console.log("SelectedCT: "+selectedCT);
                for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {
                    var placemark = geoXmlDoc.placemarks[i];
                    if (placemark.polygon) {                        
                        placemark.polygon.CTN = parseInt(placemark.name).toString();
                        console.log(tooltipHTML);
                        tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
                        tooltipHTML += "<br><b>Heatmap</b>\t"+globalCategory+": "+getDataValue(placemark.polygon.CTN);
                        tooltipHTML += "<br><b>Treemap</b>\t"+globalCategory2+": "+getDataValue2(placemark.polygon.CTN);
                        if (comparison == 0){
                            if (selectedCT.indexOf(placemark.polygon.CTN)==-1){
                                placemark.polygon.setOptions(polyStyle);
                                highlightPoly(placemark.polygon, i, tooltipHTML);
                            } else {
                                placemark.polygon.setOptions(polySelectedStyle);
                                highlightSelectedPoly(placemark.polygon, i, tooltipHTML);
                            }
                        } else{
                            if (selectedCT.indexOf(placemark.polygon.CTN)==-1){
                                placemark.polygon.setOptions(polyStyle);
                                highlightPoly(placemark.polygon, i, tooltipHTML);
                            } else {
                                placemark.polygon.setOptions(polySelectedStyle);
                                highlightSelectedPoly(placemark.polygon, i, tooltipHTML);
                            }
                        }
                        placemark.polygon.CTN = parseInt(placemark.name).toString();                        
                    }
                }
            });
        }
    }
}


function addMyMarker(placemark) {

    // Marker handling code goes here
    if (someCondition) {
        myParser.createMarker(placemark);
    }
}

function highlightPoly(poly, polynum, polygonDesc) {
    google.maps.event.addListener(poly, "mouseover", function() {
        var rowElem = document.getElementById('row' + polynum);
        if (rowElem)
            rowElem.style.backgroundColor = "#FFFA5E";
        if (geoXmlDoc.placemarks[polynum].polygon) {
            poly.setOptions(polyHighlightStyle);
        } else if (geoXmlDoc.placemarks[polynum].polyline) {
            poly.setOptions(polyHighlightStyle);
        }
        showTooltip(polygonDesc);

        //google.maps.event.trigger(google.visualization.TreeMap(document.getElementById('treemap_div')),"onmouseover");

    });
    google.maps.event.addListener(poly, "mouseout", function() {
        var rowElem = document.getElementById('row' + polynum);

        poly.setOptions(polyStyle);

        hideTooltip();

        //google.maps.event.trigger(,"onmouseout");
    });
}

function highlightSelectedPoly(poly, polynum, polygonDesc) {
    google.maps.event.addListener(poly, "mouseover", function() {
        var rowElem = document.getElementById('row' + polynum);
        if (rowElem)
            rowElem.style.backgroundColor = "#FFFA5E";
        if (geoXmlDoc.placemarks[polynum].polygon) {
            poly.setOptions(polySelectedStyle);
        } else if (geoXmlDoc.placemarks[polynum].polyline) {
            poly.setOptions(polySelectedStyle);
        }
        showTooltip(polygonDesc);

    });
    google.maps.event.addListener(poly, "mouseout", function() {
        var rowElem = document.getElementById('row' + polynum);

        poly.setOptions(polySelectedStyle);

        hideTooltip();
    });
}


function highlightSelectedPolyForFilter(poly, polynum) {
    google.maps.event.addListener(poly, "mouseover", function() {
        var rowElem = document.getElementById('row' + polynum);
        if (rowElem)
            rowElem.style.backgroundColor = "#FFFA5E";
        if (geoXmlDoc.placemarks[polynum].polygon) {
            poly.setOptions(polySelectedStyle);
        } else if (geoXmlDoc.placemarks[polynum].polyline) {
            poly.setOptions(polySelectedStyle);
        }
    });
    google.maps.event.addListener(poly, "mouseout", function() {
        var rowElem = document.getElementById('row' + polynum);

        poly.setOptions(polyStyle);
    });
}

function showPolyTooltip(poly, polygonDesc) {
    google.maps.event.addListener(poly, "mouseover", function() {
        showTooltip(polygonDesc);

    });
    google.maps.event.addListener(poly, "mouseout", function() {
        hideTooltip();
    });
}

function addMyOverlay(groundOverlay) {
    // Overlay handling code goes here
    if (someCondition) {
        myParser.createOverlay(groundOverlay);
    }
}

function showTooltip(text) {
    $("#mapInfoWindow").show().html(text);
    $(document).mousemove(function(event) {
        $("#mapInfoWindow").css({top: event.pageY + 5, left: event.pageX + 10});
    });
}

function hideTooltip() {
    $("#mapInfoWindow").off("mousemove").hide();
}

function drawMartaRidershipWalkscoreCircle(map){
    // mapBounds = map.getBounds();
    // var inBoundStops = [];
    // $.each(ridershipJSON, function (i, item) {
    //     if(mapBounds.contains(item.latLon))inBoundStops.push(item);
    // })
    for(var stop in ridershipJSON){
        var stopCircle = {
            strokeColor: '#3498db',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#3498db',
            fillOpacity: (Math.log(parseInt(ridershipJSON[stop].passengerNum) + 1) / Math.LN10)/(Math.log(parseInt(10160) + 1) / Math.LN10),
            // map: map,
            center: ridershipJSON[stop].latLon,
            radius: ridershipJSON[stop].walkscore
        };
        ridershipJSON[stop].circle = new google.maps.Circle(stopCircle);
        //var circleLine = new google.maps.Circle(stopCircle);
        //MartaRiderList.push(circleLine);
        // console.log(ridershipJSON[stop].circle);
    }
    //var clusterer = new MarkerClusterer(map,MartaRiderList);
    ridershipDrawn = true;
}

function drawMartaRidershipWalkscore(map){
    var MartaRiderList=[];
    var markers = [];
    var infowindows = [];
    polyList = [];
    for(var stop in ridershipJSON){
        var d2r = Math.PI / 180;
        circleLatLngs = new Array(); // latLngs of circle
        var circleLat = (ridershipJSON[stop].walkscore/(3963.189*3000)) / d2r; // miles
        var circleLng = circleLat / Math.cos(ridershipJSON[stop].latLon.lat() * d2r);
        // Create polygon points (extra point to close polygon)
        for (var i = 0; i < 361; i++) {
            // Convert degrees to radians
            var theta = i * d2r;
            var vertexLat = ridershipJSON[stop].lat + (circleLat * Math.sin(theta));
            var vertexLng = ridershipJSON[stop].lon + (circleLng * Math.cos(theta));
            var vertextLatLng = new google.maps.LatLng(parseFloat(vertexLat), parseFloat(vertexLng));
            
            circleLatLngs.push(vertextLatLng);
        }
    
        MartaRiderList.push(circleLatLngs);
        ridershipJSON[stop].circle = createPolygon(MartaRiderList[stop]);
        ridershipJSON[stop].circle.setOptions({fillOpacity:(Math.log(parseInt(ridershipJSON[stop].passengerNum) + 1) / Math.LN10)/(Math.log(parseInt(10160) + 1) / Math.LN10),zIndex:300});
        
        var infoContent = "<b>"+ridershipJSON[stop].stopName+"</b><br />Passenger Number: "+ridershipJSON[stop].passengerNum+"<br />Walkscore: "+ridershipJSON[stop].walkscore;
        ridershipJSON[stop].circle.infoWindow = new google.maps.InfoWindow({
            content: infoContent
        });
        var marker = ridershipJSON[stop].circle;
        markers.push(marker);
        infowindows.push(ridershipJSON[stop].circle.infoWindow);
        google.maps.event.addListener(marker, 'click', (function(marker, stop) 
        {
            return function() 
            {
                for(var index in infowindows)
                {
                infowindows[index].close(map, marker);
                }
                infowindows[stop].open(map, marker);
            }
        })(marker, stop));
       polyList.push(ridershipJSON[stop].circle);
    }
    var mcOptions = {gridSize: 50, maxZoom: 13, ignoreHidden:true};
    clusterer = new MarkerClusterer(map, polyList, mcOptions);
}

function createPolygon(path) {
        var polygon = new google.maps.Polygon({
          path : path,
          strokeColor: '#c0392b',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#c0392b'
        });

        var lastPath = null,
            lastCenter = null;
        polygon.getPosition = function() {
          var path = this.getPath();
          if (lastPath == path) {
            return lastCenter;
          }
          lastPath = path;
          var bounds = new google.maps.LatLngBounds();
          path.forEach(function(latlng, i) {
            bounds.extend(latlng);
          });

          lastCenter = bounds.getCenter()
          return lastCenter;
        };
        return polygon;
}

function showMartaRidershipWalkscore(map){

    if(zoomLevel >= 14){
        mapBounds = map.getBounds();

        for(var stop in ridershipJSON){

            var thisStop = ridershipJSON[stop];
            if(mapBounds.contains(thisStop.latLon)){
                if(!thisStop.circle.getMap()){
                    thisStop.circle.setMap(map);                   
                }                    
            }
        } 
        for(var it in polyList){
            polyList[it].setVisible(true);
        }
        clusterer.repaint();

    } else {
        for(var stop in ridershipJSON){
            ridershipJSON[stop].circle.setMap();
        }
        for(var it in polyList){
            polyList[it].setVisible(true);
        }
        clusterer.repaint();
    }    
}

function hideMartaRidershipWalkscore(map){
    google.maps.event.clearListeners(map, 'dragend');
    for(var stop in ridershipJSON){
        //console.log(ridershipJSON[stop].circle);
        ridershipJSON[stop].circle.setMap();
    }
    for(var it in polyList){
        polyList[it].setVisible(false);
    }
    clusterer.repaint();
}