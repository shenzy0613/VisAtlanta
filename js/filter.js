function getFilterDataValue(json, cat, ctn)
{
    for (var CT in json){
        
        if (json[CT].CTN == ctn){
            return json[CT][cat];
            break;
        }
    }
}

function filterResetPolygon(){
	for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
		var placemark = geoXmlDoc.placemarks[i];
		placemark.polygon.setOptions(polyStyle);
	}
}

function filter(filterArr){
	// var AgeJson, EducationAttainmentJson, HousingAffordabilityJson, HousingCharacteristicsJson, HousingVacancyJson, IncomeJson;
	// var JobCharacteristicsJson, PopulationJson, RaceEthnicityJson, TransportationJson, UnemploymentJson;
	var JsonArray=[];
	selectedCT = [];
	$.when(
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Age.json",function (data){
			JsonArray[0] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/EducationAttainment.json",function (data){
			JsonArray[1] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingAffordability.json",function (data){
			JsonArray[2] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingCharacteristics.json",function (data){
			JsonArray[3] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingVacancy.json",function (data){
			JsonArray[4] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Income.json",function (data){
			JsonArray[5] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/JobCharacteristics.json",function (data){
			JsonArray[6] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Population.json",function (data){
			JsonArray[7] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/RaceEthnicity.json",function (data){
			JsonArray[8] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Transportation.json",function (data){
			JsonArray[9] = JSON.parse(JSON.stringify(data));
		}),
		$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Unemployment.json",function (data){
			JsonArray[10] = JSON.parse(JSON.stringify(data));
		})
	).then(function(){
		filterJSON = JSON.parse(JSON.stringify(data));
	    for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        var value = [];
	        var index = [7, 4, 2, 2, 1, 6, 6, 1, 5, 5, 1];
	        var x=0;
	        //console.log("1");
	        for (var k = 0; k< index.length; k++){
	        	for (var j = 0; j< index[k]; j++){
	        		value[x] = parseInt(getFilterDataValue(JsonArray[k], filterArr[x][1], placemark.polygon.CTN));
	        		x++;
	        	}
	        }
	       	if (placemark.polygon) {
	       		var tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";      

                placemark.polygon.CTN = parseInt(placemark.name).toString();
                if (value[0] >= filterArr[0][2] && value[0] <= filterArr[0][3] &&
                	value[1] >= filterArr[1][2] && value[1] <= filterArr[1][3] &&
                	value[2] >= filterArr[2][2] && value[2] <= filterArr[2][3] &&
                	value[3] >= filterArr[3][2] && value[3] <= filterArr[3][3] &&
                	value[4] >= filterArr[4][2] && value[4] <= filterArr[4][3] &&
                	value[5] >= filterArr[5][2] && value[5] <= filterArr[5][3] &&
                	value[6] >= filterArr[6][2] && value[6] <= filterArr[6][3] &&
                	value[7] >= filterArr[7][2] && value[7] <= filterArr[7][3] &&
                	value[8] >= filterArr[8][2] && value[8] <= filterArr[8][3] &&
                	value[9] >= filterArr[9][2] && value[9] <= filterArr[9][3] &&
                	value[10] >= filterArr[10][2] && value[10] <= filterArr[10][3] &&
                	value[11] >= filterArr[11][2] && value[11] <= filterArr[11][3] &&
                	value[12] >= filterArr[12][2] && value[12] <= filterArr[12][3] &&
                	value[13] >= filterArr[13][2] && value[13] <= filterArr[13][3] &&
                	value[14] >= filterArr[14][2] && value[14] <= filterArr[14][3] &&
                	value[15] >= filterArr[15][2] && value[15] <= filterArr[15][3] &&
                	value[16] >= filterArr[16][2] && value[16] <= filterArr[16][3] &&
                	value[17] >= filterArr[17][2] && value[17] <= filterArr[17][3] &&
                	value[18] >= filterArr[18][2] && value[18] <= filterArr[18][3] &&
                	value[19] >= filterArr[19][2] && value[19] <= filterArr[19][3] &&
                	value[20] >= filterArr[20][2] && value[20] <= filterArr[20][3] &&
                	value[21] >= filterArr[21][2] && value[21] <= filterArr[21][3] &&
                	value[22] >= filterArr[22][2] && value[22] <= filterArr[22][3] &&
                	value[23] >= filterArr[23][2] && value[23] <= filterArr[23][3] &&
                	value[24] >= filterArr[24][2] && value[24] <= filterArr[24][3] &&
                	value[25] >= filterArr[25][2] && value[25] <= filterArr[25][3] &&
                	value[26] >= filterArr[26][2] && value[26] <= filterArr[26][3] &&
                	value[27] >= filterArr[27][2] && value[27] <= filterArr[27][3] &&
                	value[28] >= filterArr[28][2] && value[28] <= filterArr[28][3] &&
                	value[29] >= filterArr[29][2] && value[29] <= filterArr[29][3] &&
                	value[30] >= filterArr[30][2] && value[30] <= filterArr[30][3] &&
                	value[31] >= filterArr[31][2] && value[31] <= filterArr[31][3] &&
                	value[32] >= filterArr[32][2] && value[32] <= filterArr[32][3] &&
                	value[33] >= filterArr[33][2] && value[33] <= filterArr[33][3] &&
                	value[34] >= filterArr[34][2] && value[34] <= filterArr[34][3] &&
                	value[35] >= filterArr[35][2] && value[35] <= filterArr[35][3] &&
                	value[36] >= filterArr[36][2] && value[36] <= filterArr[36][3] &&
                	value[37] >= filterArr[37][2] && value[37] <= filterArr[37][3] &&
                	value[38] >= filterArr[38][2] && value[38] <= filterArr[38][3] &&
                	value[39] >= filterArr[39][2] && value[39] <= filterArr[39][3] ){
		       		placemark.polygon.setOptions(polyFilterStyle);

                    selectedCT.push(placemark.polygon.CTN);
                    
                    
                    //highlightSelectedPoly(placemark.polygon, i, tooltipHTML);
		       	} 
		       	else{
		       		placemark.polygon.setOptions(polyFilterInitStyle);
		       	}
                
                placemark.polygon.CTN = parseInt(placemark.name).toString();                        
            } 
	    }
	});
}