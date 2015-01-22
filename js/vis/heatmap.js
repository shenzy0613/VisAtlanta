// Functions to draw heatmaps
function getDataValue(ctn)
{
    for (var CT in dataJSON){
        
        if (dataJSON[CT].CTN == ctn){
            return dataJSON[CT][category];
            break;
        }
    }
}

function getDataValue2(ctn)
{
    for (var CT in dataJSON){
        
        if (dataJSON[CT].CTN == ctn){
            return dataJSON[CT][category2];
            break;
        }
    }
}

function getMaxDataValue()
{
	var categoryArray=[];
    for (var CT in dataJSON){
        categoryArray[CT]=dataJSON[CT][category];
    }
    //console.log("Max is: ");
    //console.log(categoryArray);
    //console.log(Math.max.apply(Math, categoryArray));
	return Math.max.apply(Math, categoryArray);
}

function getMinDataValue()
{
	var categoryArray=[];
    for (var CT in dataJSON){
        categoryArray[CT]=dataJSON[CT][category];
    }
    //console.log("Min is: ");
    //console.log(categoryArray);
    //console.log(Math.min.apply(Math, categoryArray));
    return Math.min.apply(Math, categoryArray);
}

function drawDataHeatmap(variableData, categoryData1, categoryData2){
	variable=variableData;
	category=categoryData1;
	category2=categoryData2;

	globalVariable = variableData;
	globalCategory = categoryData1;
	globalCategory2 = categoryData2;

	$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/"+variable+".json",function (data){
	    dataJSON = JSON.parse(JSON.stringify(data));
	    for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        if (placemark.polygon){
	            placemark.polygon.CTN = parseInt(placemark.name).toString();
	            console.log(placemark.polygon.CTN);
	            
	            tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
	            tooltipHTML += "<br><b>Heatmap</b>\t"+category+": "+getDataValue(placemark.polygon.CTN);
	            tooltipHTML += "<br><b>Treemap</b>\t"+category2+": "+getDataValue2(placemark.polygon.CTN);

	            showPolyTooltip(placemark.polygon, tooltipHTML);
	
	            console.log(getDataValue(placemark.polygon.CTN));
	            var opacity=(parseInt(getDataValue(placemark.polygon.CTN))-parseInt(getMinDataValue()))/(parseInt(getMaxDataValue())-parseInt(getMinDataValue()));
	            var polyHeatmapStyle = {fillOpacity: opacity};
	            placemark.polygon.setOptions(polyHeatmapStyle);
	        }
	    }
	})
}

function resetDataHeatmap(){
	    for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        if (placemark.polygon){
	            placemark.polygon.CTN = parseInt(placemark.name).toString();
	            var opacity = 0.1;
	            var polyHeatmapStyle = {fillOpacity: opacity};
	            placemark.polygon.setOptions(polyHeatmapStyle);
	        }
	    }
}