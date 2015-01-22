
function drawDetailView(selectedCTN) {
	var detailViewHtml = '';
		detailViewHtml += '<div id="agePiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="racePiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="educationPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="incomePiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="povertyPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="transportationPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="housingownerPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="housingrenterPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="housingValueTable" class="detailChartContainer" style="width: auto; height: auto; display:inline;"></div>';
	    detailViewHtml += '<div id="housingVacancyPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="unemploymentPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="jobPayPiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';
	    detailViewHtml += '<div id="jobAgePiechart" class="detailChartContainer" style="width: 100%; height: 300px; display:inline;"></div>';

	$(".detail_div").html(detailViewHtml);

	var selectedCT;
	var result, result1, result2;
	// selectedCTN = 20100;
	$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Age.json", function(json_data) {
		result = [];
		for(var key in json_data) {
			if(json_data[key].CTN == selectedCTN) {
				//console.log(json_data[key].CTN);
				selectedCT = json_data[key];
				break;
			}
		}
		//console.log(selectedCT);

		for(var i in selectedCT){
			if(i<"B" && i > "A")
				result.push([i, selectedCT[i]]);
		}

		//console.log(result);
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Age');
		data.addColumn('number', 'Number');
		data.addRows(result);

		var options = {
			backgroundColor: 'transparent',
			title: 'Age Pie Chart',
			chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
		};

		var chart = new google.visualization.PieChart(document.getElementById('agePiechart'));
		chart.draw(data, options);

	});
	$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/RaceEthnicity.json", function(json_data) {
		result = [];
		for(var key in json_data) {
			if(json_data[key].CTN == selectedCTN) {
				//console.log(json_data[key].CTN);
				selectedCT = json_data[key];
				break;
			}
		}
		//console.log(selectedCT);

		for(var i in selectedCT){
			if(i>'1' && i<'3' && i!='2010 Population' && i!='2010 Non-White Pop')
				result.push([i, selectedCT[i]]);
		}

		//console.log(result);
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Race & Ethnicity');
		data.addColumn('number', 'Number');
		data.addRows(result);

		var options = {
			backgroundColor: 'transparent',
			title: 'Race & Ethnicity Pie Chart',
			chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
		};

		var chart = new google.visualization.PieChart(document.getElementById('racePiechart'));
		chart.draw(data, options);

	});
	$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/EducationAttainment.json", function(json_data) {
		result = [];
		for(var key in json_data) {
			if(json_data[key].CTN == selectedCTN) {
				//console.log(json_data[key].CTN);
				selectedCT = json_data[key];
				break;
			}
		}
		//console.log(selectedCT);

		for(var i in selectedCT){
			if(i<'Populatioo' && i>'Populatiom' & i!='Population 25+')
				result.push([i, selectedCT[i]]);
		}

		//console.log(result);
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Population Attainment');
		data.addColumn('number', 'Number');
		data.addRows(result);

		var options = {
			backgroundColor: 'transparent',
			title: 'Education Attainment Pie Chart',
			chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
		};

		var chart = new google.visualization.PieChart(document.getElementById('educationPiechart'));
		chart.draw(data, options);

	});
	$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Income.json", function(json_data) {
		result1 = [];
		result2 = [];
		for(var key in json_data) {
			if(json_data[key].CTN == selectedCTN) {
				console.log(json_data[key].CTN);
				selectedCT = json_data[key];
				break;
			}
		}
		//console.log(selectedCT);

		for(var i in selectedCT){
			if(i<'HI' && i>'HG')
				result1.push([i, selectedCT[i]]);
			if(i<'Populatioo' && i>'Populatiom')
				result2.push([i, selectedCT[i]]);
		}

		//console.log(result1);
		//console.log(result2);

		var data1 = new google.visualization.DataTable();
		data1.addColumn('string', 'Income');
		data1.addColumn('number', 'Number');
		data1.addRows(result1);

		var options1 = {
			backgroundColor: 'transparent',
			title: 'Income Pie Chart',
			chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
		};

		var chart1 = new google.visualization.PieChart(document.getElementById('incomePiechart'));
		chart1.draw(data1, options1);

		var data2 = new google.visualization.DataTable();
		data2.addColumn('string', 'Poverty');
		data2.addColumn('number', 'Number');
		data2.addRows(result2);

		var options2 = {
			backgroundColor: 'transparent',
			title: 'Poverty Pie Chart',
			chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
		};

		var chart2 = new google.visualization.PieChart(document.getElementById('povertyPiechart'));
		chart2.draw(data2, options2);

	});
$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Transportation.json", function(json_data) {
	result = [];
	for(var key in json_data) {
		if(json_data[key].CTN == selectedCTN) {
			console.log(json_data[key].CTN);
			selectedCT = json_data[key];
			break;
		}
	}
	//console.log(selectedCT);

	for(var i in selectedCT){
		if(i>'Workers who')
			result.push([i, selectedCT[i]]);
	}

	//console.log(result);
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Transportation to Work');
	data.addColumn('number', 'Number');
	data.addRows(result);

	var options = {
		backgroundColor: 'transparent',
		title: 'Transportation to Work Pie Chart',
		chartArea: {'width': '90%', 'height': '80%'},
		legend: 'right'
	};

	var chart = new google.visualization.PieChart(document.getElementById('transportationPiechart'));
	chart.draw(data, options);

});

$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingAffordability.json", function(json_data) {
    result1 = [];
    result2 = [];
	for(var key in json_data) {
	    if(json_data[key].CTN == selectedCTN) {
	    	console.log(json_data[key].CTN);
	        selectedCT = json_data[key];
	        break;
	    }
	}
	console.log(selectedCT);
	
	for(var i in selectedCT){
		if(i>'Housing costs as % of income: Number owners payinf' && i<'Housing costs as % of income: Number owners payinh')
			result1.push([i, selectedCT[i]]);
		if(i>'Housing costs as % of income: Number renters payinf' && i<'Housing costs as % of income: Number renters payinh')
			result2.push([i, selectedCT[i]]);
	}

	console.log(result1);
	console.log(result2);
	
	var data1 = new google.visualization.DataTable();
	data1.addColumn('string', 'Housing Affordability - Owner');
	data1.addColumn('number', 'Number');
	data1.addRows(result1);
	
	var options1 = {
	title: 'Housing Affordability - Owner',
	backgroundColor: 'transparent',
	chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
	};
	
	var chart1 = new google.visualization.PieChart(document.getElementById('housingownerPiechart'));
	chart1.draw(data1, options1);
	
	var data2 = new google.visualization.DataTable();
	data2.addColumn('string', 'Housing Affordability - Renter');
	data2.addColumn('number', 'Number');
	data2.addRows(result2);
	
	var options2 = {
	title: 'Housing Affordability - Renter',
	backgroundColor: 'transparent',
	chartArea: {'width': '90%', 'height': '80%'},
			legend: 'right'
	};
	
	var chart2 = new google.visualization.PieChart(document.getElementById('housingrenterPiechart'));
	chart2.draw(data2, options2);		    
});


// $.getJSON("/data/json/HousingAffordability.json", function(json_data) {
// 	result = [];
// 	for(var key in json_data) {
// 		if(json_data[key].CTN == selectedCTN) {
// 			//console.log(json_data[key].CTN);
// 			selectedCT = json_data[key];
// 			break;
// 		}
// 	}
// 	//console.log(selectedCT);

// 	for(var i in selectedCT){

// 		if(i=='Housing costs as % of income: Owner (Total units in calculation)'|| i=='Housing costs as % of income: Number owners paying 30%+' || i=='% owner costs over 30% income' || i=='Housing costs as % of income: Renter (Total units in calculation)' || i=='Housing costs as % of income: Number renters paying 30%+' || i=='% renter costs over 30% income')
// 			result.push([i, selectedCT[i]]);
// 	}

// 	//console.log(result);

// 	var data = new google.visualization.DataTable();
// 	data.addColumn('string', 'Housing Affordability');
// 	data.addColumn('number', 'Number');
// 	data.addRows(result);

// 	var options = {
// 		backgroundColor: 'transparent',
// 		title: 'Housing Affordability',
// 		legend: 'right'
// 	};

// 	var chart = new google.visualization.Table(document.getElementById('housingAffordabilityTable'));
// 	chart.draw(data, options);		    
// });

// $.getJSON("/data/json/HousingCharacteristics.json", function(json_data) {
// 	result = [];
// 	for(var key in json_data) {
// 		if(json_data[key].CTN == selectedCTN) {
// 			console.log(json_data[key].CTN);
// 			selectedCT = json_data[key];
// 			break;
// 		}
// 	}
// 	//console.log(selectedCT);

// 	for(var i in selectedCT){

// 		if(i=='Median Home Value'|| i=='Median Rent')
// 			result.push([i, selectedCT[i]]);
// 	}

// 	//console.log(result);

// 	var data = new google.visualization.DataTable();
// 	data.addColumn('string', 'Housing Value');
// 	data.addColumn('number', 'Number');
// 	data.addRows(result);

// 	var options = {
// 		backgroundColor: 'transparent',
// 		title: 'Housing Value',
// 		legend: 'right',
// 		width: '30%'
// 	};

// 	var chart = new google.visualization.Table(document.getElementById('housingValueTable'));
// 	chart.draw(data, options);		    
// });

$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingVacancy.json", function(json_data) {
	result = [];
	for(var key in json_data) {
		if(json_data[key].CTN == selectedCTN) {
			console.log(json_data[key].CTN);
			selectedCT = json_data[key];
			break;
		}
	}
	//console.log(selectedCT);

	for(var i in selectedCT){

		if(i=='Vacant Units, 2010'  || i=='Owner-Occupied Units, 2010' || i=='Renter-occupied units, 2010')
			result.push([i, selectedCT[i]]);
	}

	//console.log(result);

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Housing Vacancy');
	data.addColumn('number', 'Number');
	data.addRows(result);

	var options = {
		backgroundColor: 'transparent',
		title: 'Housing Vacancy',
		legend: 'right',
		chartArea: {'width': '90%', 'height': '80%'}
	};

	var chart = new google.visualization.PieChart(document.getElementById('housingVacancyPiechart'));
	chart.draw(data, options);		    
});

$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Unemployment.json", function(json_data) {
	result = [];
	for(var key in json_data) {
		if(json_data[key].CTN == selectedCTN) {
			console.log(json_data[key].CTN);
			selectedCT = json_data[key];
			break;
		}
	}
	//console.log(selectedCT);

	for(var i in selectedCT){

		if(i=='Pop 16+ Employed' || i=='Pop16+ unemployed')
			result.push([i, selectedCT[i]]);
	}

	//console.log(result);

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Unemployment');
	data.addColumn('number', 'Number');
	data.addRows(result);

	var options = {
		backgroundColor: 'transparent',
		title: 'Unemployment',
		legend: 'right',
		chartArea: {'width': '90%', 'height': '80%'}
	};

	var chart = new google.visualization.PieChart(document.getElementById('unemploymentPiechart'));
	chart.draw(data, options);		    
});

$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/JobCharacteristics.json", function(json_data) {
	result1 = [];
	result2 = [];
	for(var key in json_data) {
		if(json_data[key].CTN == selectedCTN) {
			console.log(json_data[key].CTN);
			selectedCT = json_data[key];
			break;
		}
	}
	//console.log(selectedCT);

	for(var i in selectedCT){
		if(i<'Jobs paz' && i>'Jobs pax')
			result1.push([i, selectedCT[i]]);
		if(i<'Jobs agf' && i>'Jobs agd')
			result2.push([i, selectedCT[i]]);
	}

	//console.log(result1);
	//console.log(result2);

	var data1 = new google.visualization.DataTable();
	data1.addColumn('string', 'Job Characteristics - Pay');
	data1.addColumn('number', 'Number');
	data1.addRows(result1);

	var options1 = {
		backgroundColor: 'transparent',
		title: 'Job Characteristics - Pay Pie Chart',
		chartArea: {'width': '90%', 'height': '80%'},
		legend: 'right'
	};

	var chart1 = new google.visualization.PieChart(document.getElementById('jobPayPiechart'));
	chart1.draw(data1, options1);

	var data2 = new google.visualization.DataTable();
	data2.addColumn('string', 'Job Characteristics - Age');
	data2.addColumn('number', 'Number');
	data2.addRows(result2);

	var options2 = {
		backgroundColor: 'transparent',
		title: 'Job Characteristics - Age Pie Chart',
		chartArea: {'width': '90%', 'height': '80%'},
		legend: 'right'
	};

	var chart2 = new google.visualization.PieChart(document.getElementById('jobAgePiechart'));
	chart2.draw(data2, options2);

});

}