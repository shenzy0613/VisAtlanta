var filterArray = [];


function filterArrayReset(){
	filterArray=[];
	filterArray.push(["Age", "Median age", 15, 48]);
	filterArray.push(["Age", "% Age under 5", 0, 100]);
	filterArray.push(["Age", "% Age 6-18", 0, 100]);
	filterArray.push(["Age", "% Age 18-29", 0, 100]);
	filterArray.push(["Age", "% Age 30-44", 0, 100]);
	filterArray.push(["Age", "% Age 45-64", 0, 100]);
	filterArray.push(["Age", "% Age 65+", 0, 100]);

	filterArray.push(["EducationAttainment", "Percent of Population 25+ with No HS Diploma", 0, 100]);
	filterArray.push(["EducationAttainment", "Percent of Population 25+ with a HS Diploma", 0, 100]);
	filterArray.push(["EducationAttainment", "Percent of Population 25+ with a Bachelor's Degree", 0, 100]);
	filterArray.push(["EducationAttainment", "Percent of Population 25+ with Graduate or Professional Degree", 0, 100]);

	filterArray.push(["HousingAffordability", "% owner costs over 30% income", 0, 100]);
	filterArray.push(["HousingAffordability", "% renter costs over 30% income", 0, 100]);

	filterArray.push(["HousingCharacteristics", "Median Home Value", 37600, 1000000]);
	filterArray.push(["HousingCharacteristics", "Median Rent", 249, 1315]);

	filterArray.push(["HousingVacancy", "% Units Vacant, 2010", 0, 100]);

	filterArray.push(["Income", "Median HH Income", 7135, 207734]);
	filterArray.push(["Income", "Percent of HH with Income Under $35K", 0, 100]);
	filterArray.push(["Income", "Percent of HH with Income Between $35K-$75K", 0, 100]);
	filterArray.push(["Income", "Percent of HH with Income Between $75K-$200K", 0, 100]);
	filterArray.push(["Income", "Percent of HH with income above $200K", 0, 100]);
	filterArray.push(["Income", "% pop in poverty", 0, 100]);

	filterArray.push(["JobCharacteristics", "% jobs pay under 1,251_month, 2010", 0, 100]);
	filterArray.push(["JobCharacteristics", "% jobs pay 1,251-3,333_month, 2010", 0, 100]);
	filterArray.push(["JobCharacteristics", "% jobs pay over 3,333_month, 2010", 0, 100]);
	filterArray.push(["JobCharacteristics", "% jobs age 29 and under, 2010", 0, 100]);
	filterArray.push(["JobCharacteristics", "% jobs age 30-54, 2010", 0, 100]);
	filterArray.push(["JobCharacteristics", "% jobs age 55 and older, 2010", 0, 100]);

	filterArray.push(["Population", "Population", 914, 14100]);

	filterArray.push(["RaceEthnicity", "Diversity Index (100 = Less Diversity)", 0, 100]);
	filterArray.push(["RaceEthnicity", "% White Pop, 2010", 0, 100]);
	filterArray.push(["RaceEthnicity", "% Black Pop, 2010", 0, 100]);
	filterArray.push(["RaceEthnicity", "% Asian Pop, 2010", 0, 100]);
	filterArray.push(["RaceEthnicity", "% Hispanic Pop, 2010", 0, 100]);

	filterArray.push(["Transportation", "% Workers who drove alone", 0, 100]);
	filterArray.push(["Transportation", "% Workers who carpooled", 0, 100]);
	filterArray.push(["Transportation", "% Workers who took public transportation", 0, 100]);
	filterArray.push(["Transportation", "% Workers who worked at home", 0, 100]);
	filterArray.push(["Transportation", "% Workers who used other transportation", 0, 100]);

	filterArray.push(["Unemployment", "% Pop16+ unemployed", 0, 100]);
}

filterArrayReset();

$(document).ready(function (){
	bindCtrlPanel();
	bindSideNav();
	$("#mapInfoWindow").hide();
	$("#Control").on("click",function(){
		for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
	        placemark.polygon.setOptions(initpolyStyle);
	        highlightPoly(placemark.polygon, i, tooltipHTML);   
	    }
	    switchView("mapView");
	    selectedCT = [];
	    comparison = 0;
	    resetDataHeatmap();
		hideSubRadioOption();
	    $("#ctrl label.radio.checked").removeClass("checked");
		$('#ctrl .radioToggle.active').removeClass("active");
	})

	$("#Filter").on("click",function(){
		for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
	        placemark.polygon.setOptions(polyFilterInitStyle);
	        highlightPoly(placemark.polygon, i, tooltipHTML);
	    }
	    switchView("mapView");
	    selectedCT = [];
	    filterResetPolygon();
		hideSubRadioOption();
		filterArrayReset();
		
		
		$('#filter .radioToggle.active').removeClass("active");
		$( ".FilterDiv :nth-child(1)" )
  			.css( "left", "0%" );
  		$( ".FilterDiv :nth-child(1)" )
  			.css( "width", "100%" );
		$( ".FilterDiv :nth-child(2)" )
  			.css( "left", "0%" );
  		$( ".FilterDiv :nth-child(3)" )
  			.css( "left", "100%" );

  		$( ".slider" ).val("0% - 100%");
  		$( "#popFilterAmount" ).val("914 - 14100");
  		$( "#DiverFilterAmount" ).val("0 - 100");
  		$( "#MHIFilterAmount" ).val("7135 - 207734");
  		$( "#ValueFilterAmount" ).val("37600 - 1000000");
  		$( "#RentFilterAmount" ).val("249 - 1315");
  		$( "#medAgeFilterAmount" ).val("15 - 48");

  		$( ".FilterDiv" ).slider("values",[0,100]);
    	$( "#popFilter" ).slider("values",[914,14100]);
    	$( "#DiverFilter" ).slider("values",[0,100]);
    	$( "#MHIFilter" ).slider("values",[7135,207734]);
    	$( "#ValueFilter" ).slider("values",[37600,1000000]);
    	$( "#RentFilter" ).slider("values",[249,1315]);
    	$( "#medAgeFilter" ).slider("values",[15,48]);
	})
});

$(function () {
    $('#treemap_div').mousemove(function (e) {
        $('#tooltip').css({
            left: e.pageX-160,
            top: e.pageY-90
        });
    });
});

//Functions for sideNav
function bindSideNav(){
	$(".topNav").on("click", ".navBtn", function (){
		var viewClass = $(this).parent().attr('class');
		
		switch(viewClass) {
			case "mapView navSection":switchView("mapView");;break;
			case "treemapView navSection": switchView("treemapView"); break;
			case "detailView navSection": switchView("detailView"); break;
			case "compView navSection": switchView("compView"); break;

		}
	});
}

//Functions for ctrl panel
function hideLegend(){
	if($("#legendNumberMarta").is(":visible"))
    {
        $("#legendNumberMarta").hide();
        $("#legendPercentageMarta").show();
    }
    else if($("#legendNumber").is(":visible"))
    {
        $("#legendNumber").hide();
        $("#legendPercentage").show();
    }
}

function hideLegendNumber(){
	if($("#legendPercentageMarta").is(":visible"))
    {
        $("#legendPercentageMarta").hide();
        $("#legendNumberMarta").show();
    }
    else if($("#legendPercentage").is(":visible"))
    {
        $("#legendPercentage").hide();
        $("#legendNumber").show();
    }
}

function bindCtrlPanel(){
	$(".ctrlContainer").on("click", "div.radioOption > label.radioToggle", function () {
		$(".ctrlContainer").find("div.radioOption > label.radioToggle.active").removeClass("active");
		$(this).addClass("active");
		hideSubRadioOption();
		var checkedCtrlOption = $(this).attr("data-ctrl-option");
		showSubRadioOptionForCtrlOption(checkedCtrlOption);
	});

	$("#controlClear").on("click",function(){
		for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
	        placemark.polygon.setOptions(initpolyStyle);
	        highlightPoly(placemark.polygon, i, tooltipHTML);   
	    }
	    switchView("mapView");
	    selectedCT = [];
	    comparison = 0;
	    resetDataHeatmap();
		hideSubRadioOption();
	    $("#ctrl label.radio.checked").removeClass("checked");
		$('#ctrl .radioToggle.active').removeClass("active");
		for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {
            var placemark = geoXmlDoc.placemarks[i];
			tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
		}
	})

	$("#filterClear").on("click",function(){
		for (var i = 0; i <geoXmlDoc.placemarks.length;i++){
	        var placemark = geoXmlDoc.placemarks[i];
	        tooltipHTML = "<b>Census Tract Num: "+(parseFloat(placemark.polygon.CTN)/100).toString()+"</b>";
	        placemark.polygon.setOptions(polyFilterInitStyle);
	        highlightPoly(placemark.polygon, i, tooltipHTML);
	    }
	    switchView("mapView");
	    selectedCT = [];
	    filterResetPolygon();
		hideSubRadioOption();
		filterArrayReset();
		
		
		$('#filter .radioToggle.active').removeClass("active");
		$( ".FilterDiv :nth-child(1)" )
  			.css( "left", "0%" );
  		$( ".FilterDiv :nth-child(1)" )
  			.css( "width", "100%" );
		$( ".FilterDiv :nth-child(2)" )
  			.css( "left", "0%" );
  		$( ".FilterDiv :nth-child(3)" )
  			.css( "left", "100%" );

  		$( ".slider" ).val("0% - 100%");
  		$( "#popFilterAmount" ).val("914 - 14100");
  		$( "#DiverFilterAmount" ).val("0 - 100");
  		$( "#MHIFilterAmount" ).val("7135 - 207734");
  		$( "#ValueFilterAmount" ).val("37600 - 1000000");
  		$( "#RentFilterAmount" ).val("249 - 1315");
  		$( "#medAgeFilterAmount" ).val("15 - 48");

  		$( ".FilterDiv" ).slider("values",[0,100]);
    	$( "#popFilter" ).slider("values",[914,14100]);
    	$( "#DiverFilter" ).slider("values",[0,100]);
    	$( "#MHIFilter" ).slider("values",[7135,207734]);
    	$( "#ValueFilter" ).slider("values",[37600,1000000]);
    	$( "#RentFilter" ).slider("values",[249,1315]);
    	$( "#medAgeFilter" ).slider("values",[15,48]);





    	//$( "#popFilter" ).slider("value[1]",14100);
		//$( "#popFilter" ).slider( "values", 1 )=914；
	})

	$("#filterCompare").on("click",function(){
		switchView("compView");
		drawComparisonView(selectedCT)
	})

	$("#PopulationRadio0").on("click",function () {
		drawDataHeatmap("Population", "Population","Population");
		drawTreemap("Population","Population","Population");
		//filter(filterArray);
		hideLegendNumber();
	});

	$("#AgeRadio0").on("click",function () {
		drawDataHeatmap("Age", "Median age","Population");
		drawTreemap("Age", "Population","Median age");
		hideLegendNumber();
	});

	$("#AgeRadio1").on("click",function () {
		drawDataHeatmap("Age", "% Age under 5","Age under 5, 2010");
		drawTreemap("Age", "Age under 5, 2010", "% Age under 5");
		hideLegend();
	});

	$("#AgeRadio2").on("click",function () {
		drawDataHeatmap("Age", "% Age 6-18","Age 6-18, 2010");
		drawTreemap("Age", "Age 6-18, 2010", "% Age 6-18");
		hideLegend();
	});

	$("#AgeRadio3").on("click",function () {
		drawDataHeatmap("Age", "% Age 18-29","Age 18-29, 2010");
		drawTreemap("Age", "Age 18-29, 2010", "% Age 18-29");
		hideLegend();
	});

	$("#AgeRadio4").on("click",function () {
		drawDataHeatmap("Age", "% Age 30-44","Age 30-44, 2010");
		drawTreemap("Age", "Age 30-44, 2010", "% Age 30-44");
		hideLegend();
	});

	$("#AgeRadio5").on("click",function () {
		drawDataHeatmap("Age", "% Age 45-64","Age 45-64, 2010");
		drawTreemap("Age", "Age 45-64, 2010", "% Age 45-64");
		hideLegend();
	});

	$("#AgeRadio6").on("click",function () {
		drawDataHeatmap("Age", "% Age 65+","Age 65+, 2010");
		drawTreemap("Age", "Age 65+, 2010", "% Age 65+");
		hideLegend();
	});

	$("#DiversityRadio").on("click",function () {
		drawDataHeatmap("RaceEthnicity", "Diversity Index (100 = Less Diversity)","2010 Population");
		//drawTreemap("RaceEthnicity","2010 Population", "Diversity Index (100 = Less Diversity)"）；
		hideLegendNumber();
	});

	$("#WhiteRadio").on("click",function () {
		drawDataHeatmap("RaceEthnicity", "% White Pop, 2010","2010 White Pop");
		drawTreemap("RaceEthnicity", "2010 White Pop", "% White Pop, 2010");
		hideLegend();
	});

	$("#BlackRadio").on("click",function () {
		drawDataHeatmap("RaceEthnicity", "% Black Pop, 2010","2010 Black Pop");
		drawTreemap("RaceEthnicity", "2010 Black Pop", "% Black Pop, 2010");
		hideLegend();
	});

	$("#AsianRadio").on("click",function () {
		drawDataHeatmap("RaceEthnicity", "% Asian Pop, 2010","2010 Asian Pop");
		drawTreemap("RaceEthnicity", "2010 Asian Pop", "% Asian Pop, 2010");
		hideLegend();
	});

	$("#HispanicRadio").on("click",function () {
		drawDataHeatmap("RaceEthnicity", "% Hispanic Pop, 2010","2010 Hispanic Pop");
		drawTreemap("RaceEthnicity", "2010 Hispanic Pop", "% Hispanic Pop, 2010");
		hideLegend();
	});

	$("#OtherRadio").on("click",function () {
		drawDataHeatmap("RaceEthnicity", "% Other Pop, 2010","2010 Other Pop");
		drawTreemap("RaceEthnicity", "2010 Other Pop", "% Other Pop, 2010");
		hideLegend();
	});

	$("#NoRadio").on("click",function () {
		drawDataHeatmap("EducationAttainment", "Percent of Population 25+ with No HS Diploma","Population 25+ with No HS Diploma");
		drawTreemap("EducationAttainment","Population 25+ with No HS Diploma", "Percent of Population 25+ with No HS Diploma");
		hideLegend();
	});

	$("#HighSchoolRadio").on("click",function () {
		drawDataHeatmap("EducationAttainment", "Percent of Population 25+ with a HS Diploma","Population 25+ with a Bachelor's Degree");
		drawTreemap("EducationAttainment","Population 25+ with a Bachelor's Degree", "Percent of Population 25+ with a HS Diploma");
		hideLegend();
	});

	$("#BachelorRadio").on("click",function () {
		drawDataHeatmap("EducationAttainment", "Percent of Population 25+ with a Bachelor's Degree","Population 25+ with a Bachelor's Degree");
		drawTreemap("EducationAttainment","Population 25+ with a Bachelor's Degree", "Percent of Population 25+ with a Bachelor's Degree");
		hideLegend();
	});

	$("#GraduateRadio").on("click",function () {
		drawDataHeatmap("EducationAttainment", "Percent of Population 25+ with Graduate or Professional Degree","Population 25+ with a Bachelor's Degree");
		drawTreemap("EducationAttainment","Population 25+ with a Bachelor's Degree", "Percent of Population 25+ with Graduate or Professional Degree");
		hideLegend();
	});

	$("#HouseRadio0").on("click",function () {
		drawDataHeatmap("Income", "Median HH Income","Total Households");
		drawTreemap("Income","Total Households", "Median HH Income");
		hideLegendNumber();
	});

	$("#HouseRadio1").on("click",function () {
		drawDataHeatmap("Income", "Percent of HH with Income Under $35K","HH with Income Under $35K");
		drawTreemap("Income","HH with Income Under $35K", "Percent of HH with Income Under $35K");
		hideLegend();
	});

	$("#HouseRadio2").on("click",function () {
		drawDataHeatmap("Income", "Percent of HH with Income Between $35K-$75K","HH with Income Between $35K-$75K");
		drawTreemap("Income","HH with Income Between $35K-$75K", "Percent of HH with Income Between $35K-$75K");
		hideLegend();
	});

	$("#HouseRadio3").on("click",function () {
		drawDataHeatmap("Income", "Percent of HH with Income Between $75K-$200K","HH with Income Between $75K-$200K");
		drawTreemap("Income","HH with Income Between $75K-$200K", "Percent of HH with Income Between $75K-$200K");
		hideLegend();
	});

	$("#HouseRadio4").on("click",function () {
		drawDataHeatmap("Income", "Percent of HH with income above $200K","HH with income above $200K");
		drawTreemap("Income","HH with income above $200K", "Percent of HH with income above $200K");
		hideLegend();
	});

	$("#PovertyRadio").on("click",function () {
		drawDataHeatmap("Income", "% pop in poverty","Population in poverty");
		drawTreemap("Income","Population in poverty", "% pop in poverty");
		hideLegend();
	});

	$("#TransportationRadiobutton1").on("click",function () {
		drawDataHeatmap("Transportation", "% Workers who drove alone","Workers who drove alone");
		drawTreemap("Transportation", "Workers who drove alone","% Workers who drove alone");
		hideLegend();
	});

	$("#TransportationRadiobutton2").on("click",function () {
		drawDataHeatmap("Transportation", "% Workers who carpooled", "Workers who carpooled");
		drawTreemap("Transportation", "Workers who carpooled", "% Workers who carpooled");
		hideLegend();
	});

	$("#TransportationRadiobutton3").on("click",function () {
		drawDataHeatmap("Transportation", "% Workers who took public transportation", "Workers who took public transportation");
		drawTreemap("Transportation", "Workers who took public transportation", "% Workers who took public transportation");
		hideLegend();
	});

	$("#TransportationRadiobutton4").on("click",function () {
		drawDataHeatmap("Transportation", "% Workers who worked at home","Workers who worked at home");
		drawTreemap("Transportation", "Workers who worked at home","% Workers who worked at home");
		hideLegend();
	});

	$("#OwnerAffordabilityRadio").on("click",function () {
		drawDataHeatmap("HousingAffordability", "% owner costs over 30% income","Housing costs as % of income: Number owners paying 30%+");
		drawTreemap("HousingAffordability","Housing costs as % of income: Number owners paying 30%+", "% owner costs over 30% income");
		hideLegend();
	});

	$("#RenterAffordabilityRadio").on("click",function () {
		drawDataHeatmap("HousingAffordability", "% renter costs over 30% income","Housing costs as % of income: Number renters paying 30%+");
		drawTreemap("HousingAffordability","Housing costs as % of income: Number renters paying 30%+", "% renter costs over 30% income");
		hideLegend();
	});

	$("#ValueRadio").on("click",function () {
		drawDataHeatmap("HousingCharacteristics", "Median Home Value","Total housing units");
		drawTreemap("HousingCharacteristics","Total housing units", "Median Home Value");
		hideLegendNumber();
	});

	$("#RentRadio").on("click",function () {
		drawDataHeatmap("HousingCharacteristics", "Median Rent","Total housing units");
		drawTreemap("HousingCharacteristics","Total housing units", "Median Rent");
		hideLegendNumber();
	});

	$("#VacancyRadio").on("click",function () {
		drawDataHeatmap("HousingVacancy", "% Units Vacant, 2010","Vacant Units, 2010");
		drawTreemap("HousingVacancy","Vacant Units, 2010", "% Units Vacant, 2010");
		hideLegend();
	});

	$("#EmployedRadio").on("click",function () {
		drawDataHeatmap("Unemployment", "% Pop 16+ Employed","Pop 16+ Employed");
		drawTreemap("Unemployment","Pop 16+ Employed", "% Pop 16+ Employed");
		hideLegend();
	});

	$("#UnemployedRadio").on("click",function () {
		drawDataHeatmap("Unemployment", "% Pop16+ unemployed","Pop16+ unemployed");
		drawTreemap("Unemployment","Pop16+ unemployed", "% Pop16+ unemployed");
		hideLegend();
	});

	$("#SalaryRadiobutton1").on("click",function () {
		drawDataHeatmap("JobCharacteristics", "% jobs pay under 1,251_month, 2010","Jobs pay less than 1,250_month, 2010");
		drawTreemap("JobCharacteristics","Jobs pay less than 1,250_month, 2010", "% jobs pay under 1,251_month, 2010");
		hideLegend();
	});

	$("#SalaryRadiobutton2").on("click",function () {
		drawDataHeatmap("JobCharacteristics", "% jobs pay 1,251-3,333_month, 2010","Jobs pay between 1,251-3,333_month, 2010");
		drawTreemap("JobCharacteristics","Jobs pay between 1,251-3,333_month, 2010", "% jobs pay 1,251-3,333_month, 2010");
		hideLegend();
	});

	$("#SalaryRadiobutton3").on("click",function () {
		drawDataHeatmap("JobCharacteristics", "% jobs pay over 3,333_month, 2010","Jobs pay over 3,333_month, 2010");
		drawTreemap("JobCharacteristics","Jobs pay over 3,333_month, 2010", "% jobs pay over 3,333_month, 2010");
		hideLegend();
	});

	$("#SalaryRadiobutton4").on("click",function () {
		drawDataHeatmap("JobCharacteristics", "% jobs age 29 and under, 2010","Jobs age 29 or under, 2010");
		drawTreemap("JobCharacteristics","Jobs age 29 or under, 2010", "% jobs age 29 and under, 2010");
		hideLegend();
	});

	$("#SalaryRadiobutton5").on("click",function () {
		drawDataHeatmap("JobCharacteristics", "% jobs age 30-54, 2010","Jobs age 30-54, 2010");
		drawTreemap("JobCharacteristics","Jobs age 30-54, 2010", "% jobs age 30-54, 2010");
		hideLegend();
	});

	$("#SalaryRadiobutton6").on("click",function () {
		drawDataHeatmap("JobCharacteristics", "% jobs age 55 and older, 2010","Jobs age 55 and older, 2010");
		drawTreemap("JobCharacteristics","Jobs age 55 and older, 2010", "% jobs age 55 and older, 2010");
		hideLegend();
	});
}

function hideSubRadioOption (){
	$(".subRadioOption").hide();
}

function showSubRadioOptionForCtrlOption(checkedCtrlOption) {
	$('[data-ctrl-option="'+checkedCtrlOption+'"]').show();

}

var navCount = 0;
var subViewOpen = false;
var shouldShowSubView = true;
var shouldHidesubView = false;

function switchView(activeView){
	switch(activeView){
		case "mapView":{
			$('#tooltip').hide();
			console.log("to map");
			comparison = 0;
			selectedCT = [];
			$(".sectionContainer#treemapContainer").animate({left: '100%'});
			$(".sectionContainer#detailContainer").animate({left: '100%'});
			$(".sectionContainer#compContainer").animate({left: '100%'});

			$(".sectionContainer#mapContainer").animate({width:'100%'}, resizeMap);


			$(".topNav .treemapView.navSection").animate({left: '100%', marginLeft: '-150px'}, 'slow');	
			$(".topNav .detailView.navSection").animate({left: '100%', marginLeft: '-100px'}, 'slow');	
			$(".topNav .compView.navSection").animate({left: '100%', marginLeft: '-50px'}, 'slow');
			
			
			}break;
		case "treemapView":{
			//drawTreemap();
			$('#tooltip').hide();
			console.log("to treemap");
			comparison = 0;
			selectedCT = [];
			$(".sectionContainer#treemapContainer").animate({left: '60%'});
			$(".sectionContainer#detailContainer").animate({left: '100%'});
			$(".sectionContainer#compContainer").animate({left: '100%'});
			$(".sectionContainer#mapContainer").animate({width:'60%'}, resizeMap);
			
	        var center = map.getCenter();
	        google.maps.event.trigger(map, "resize");
	        map.setCenter(center); 

			$(".topNav .treemapView.navSection").animate({left: '60%', marginLeft: '0px'}, 'slow');	
			$(".topNav .detailView.navSection").animate({left: '100%', marginLeft: '-100px'}, 'slow');	
			$(".topNav .compView.navSection").animate({left: '100%', marginLeft: '-50px'}, 'slow');

			};break;
		case "detailView":{
			$('#tooltip').hide();
			comparison = 0;
			selectedCT = [];
			console.log("to detail");
			// $(".sectionContainer#detailContainer").animate({left: '60%'});
			$(".sectionContainer#detailContainer").animate({left: '60%'});
			$(".sectionContainer#compContainer").animate({left: '100%'});
			$(".sectionContainer#mapContainer").animate({width:'60%'}, resizeMap);

			$(".topNav .treemapView.navSection").animate({left: '60%', marginLeft: '-50px'}, 'slow');	
			$(".topNav .detailView.navSection").animate({left: '60%', marginLeft: '0px'}, 'slow');	
			$(".topNav .compView.navSection").animate({left: '100%', marginLeft: '-50px'}, 'slow');
			
			};break;
		case "compView":{
			$('#tooltip').hide();
			comparison = 1;
			console.log("to comp");

			$(".sectionContainer#compContainer").animate({left: '60%'});
			$(".sectionContainer#mapContainer").animate({width:'60%'}, resizeMap);

			$(".topNav .treemapView.navSection").animate({left: '60%', marginLeft: '-100px'}, 'slow');	
			$(".topNav .detailView.navSection").animate({left: '60%', marginLeft: '-50px'}, 'slow');	
			$(".topNav .compView.navSection").animate({left: '60%', marginLeft: '0px'}, 'slow');
			};break;

	}
}

