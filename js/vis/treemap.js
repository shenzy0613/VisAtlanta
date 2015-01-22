  // 	$(function () {
		//     $('#chart_div').mousemove(function (e) {
		// .treemapContainer         $('.tooltip').css({
		//             left: e.pageX,
		//             top: e.pageY - 40
		//         });
		//     });
		// });

  function drawTreemap(variableV, categoryV1, categoryV2) {
  	$('#tooltip').hide();
    var variable = variableV;
	var category = categoryV1;
	var category2= categoryV2;

	var fileName = 'https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/'+variable+'.json';
	console.log('Filename is: '+fileName);
	
    $.getJSON(fileName, function(json_data) {
    	dataJSON = JSON.parse(JSON.stringify(json_data));
    	var tooltipData = new google.visualization.DataTable();
    	tooltipData.addColumn('string', 'CTN');
		tooltipData.addColumn('number', 'Number');
		tooltipData.addColumn('number', 'Percentage');
		tooltipData.addRow(['Metro Atlanta', null, 0]);

	    var data = new google.visualization.DataTable();
		data.addColumn('string', 'Location');
		data.addColumn('string', 'Parent');
		data.addColumn('number', 'Population');
		data.addRow(['Metro Atlanta', null, 0]);

		for(var key in json_data) {
		   	data.addRow([json_data[key].CTN.toString(), 'Metro Atlanta', json_data[key][category]]);
		   	tooltipData.addRow([json_data[key].CTN.toString(), json_data[key][category], json_data[key][category2]]);
		}

		console.log(data);	
		
		tree = new google.visualization.TreeMap(document.getElementById('treemap_div'));

		console.log(tree);
                
        google.visualization.events.addListener(tree, 'onmouseover', function (e) {
	        // show the tooltip
	        var provider = 'Census Tract: '+(parseFloat(tooltipData.getValue(e.row, 0))/100).toString();
	        var totalService = "<b>Treemap</b>\t"+category+': '+tooltipData.getValue(e.row, 1);
	        totalService += "<br><b>Heatmap</b>\t"+category2 + ': '+tooltipData.getValue(e.row, 2);
	        $('#tooltipTopLine').html(provider);
	        $('#tooltipBottomLine').html(totalService);
	        $('#tooltip').show();
	        // populate the tooltip with data
	        if (e.row){
		        for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
		        	var placemark = geoXmlDoc.placemarks[i];
		        	if (parseInt(placemark.polygon.CTN) == parseInt(data.getValue(e.row, 0))){
		            	placemark.polygon.CTN = parseInt(placemark.name).toString();
		            	
		            	if (placemark.polygon.CTN){
		            		console.log(placemark.polygon.CTN);	
		            		placemark.polygon.setOptions(polyHighlightStyle);
		            	}

		            }
		        }
	    	}
	    });

	    google.visualization.events.addListener(tree, 'onmouseout', function (e) {
	        // hide the tooltip
	        $('#tooltip').hide();
	        if (e.row){
		        for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
		        	var placemark = geoXmlDoc.placemarks[i];
		        	if (parseInt(placemark.polygon.CTN) == parseInt(data.getValue(e.row, 0))){
		            	placemark.polygon.CTN = parseInt(placemark.name).toString();
		            	if (placemark.polygon.CTN){
		            		console.log(placemark.polygon.CTN);	
		            		placemark.polygon.setOptions(polyStyle);
		            	}
		            }
		        }
		    }
	    });
	    
	    tree.draw(data, {
          headerHeight: 15,
          minColor: '#c1c1c1',
          midColor: '#9dd0f4',
          maxColor: '#3498db',
          fontSize: 0,
          showScale: false,
          showTooltips: false});   
	    });

  		//console.log(tree);
	}
  