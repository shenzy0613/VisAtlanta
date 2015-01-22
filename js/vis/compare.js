
function drawComparisonView(selectedCTArr) {
	var comparisonViewHtml = '';
		comparisonViewHtml += '<div id="populationColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="ageColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="raceColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="educationColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="incomeColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="povertyColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="transportationColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="housingAffordabilityColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="housingValueHomeColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="housingValueRentColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="housingVacancyColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="unemploymentColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="jobPayColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';
	    comparisonViewHtml += '<div id="jobAgeColumnchart" class="compChartContainer" style="width: 100%; height: 300px; background: #f3f3f3;display:inline;"></div>';

	$(".comp_div").html(comparisonViewHtml);

	var selectedCT = [];
  	var result;
  	var selectedCTSum = [];
  	var selectedCTN = [];
  	for (var index in selectedCTArr){
  		selectedCTN[index] = parseInt(selectedCTArr[index]);
	}
	console.log(selectedCTArr);
  	console.log(selectedCTN);
    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Population.json", function(json_data) {
        result = [];
		for(var key in json_data) {
		for (var index in selectedCTN){
		if(json_data[key].CTN == selectedCTN[index]) {
		    console.log(json_data[key].CTN);
		        selectedCT[index] = json_data[key];
		        console.log(selectedCT[index]);
		    }
		}
		}

		console.log(result);

		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', 'Population');
		for(var i in selectedCT[0]){
			if(i=='Population'){
				for (var index in selectedCTN){
		        data.addRow([selectedCT[index].CTN.toString(),selectedCT[index][i]]);
				}
			}
		}
		console.log(data);

		var options = {
		title: 'Population Compare Column Chart',
		chartArea: {"left":"10%"}
		};

		var chart = new google.visualization.ColumnChart(document.getElementById('populationColumnchart'));
		chart.draw(data, options);
		    
    });

    
    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Age.json", function(json_data) {
	    result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% Age under 5');
		data.addColumn('number', '% Age 6-18');
		data.addColumn('number', '% Age 18-29');
		data.addColumn('number', '% Age 30-44');
		data.addColumn('number', '% Age 45-64');
		data.addColumn('number', '% Age 65+');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),selectedCT[index]['% Age under 5'],
				selectedCT[index]['% Age 6-18'], selectedCT[index]['% Age 18-29'],
				selectedCT[index]['% Age 30-44'], selectedCT[index]['% Age 45-64'],
				selectedCT[index]['% Age 65+']]);
		}
		
		var options = {
		title: 'Age Compare Column Chart (%)',
		chartArea: {"left":"10%"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('ageColumnchart'));
		chart.draw(data, options);
		    
    });
    
    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/RaceEthnicity.json", function(json_data) {
    	result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
	
		//console.log(result);
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% White Pop, 2010');
		data.addColumn('number', '% Black Pop, 2010');
		data.addColumn('number', '% Asian Pop, 2010');
		data.addColumn('number', '% Hispanic Pop, 2010');
		data.addColumn('number', '% Other Pop, 2010');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),selectedCT[index]['% White Pop, 2010'],
				selectedCT[index]['% Black Pop, 2010'], selectedCT[index]['% Asian Pop, 2010'],
				selectedCT[index]['% Hispanic Pop, 2010'], selectedCT[index]['% Other Pop, 2010']]);
		}
		
		var options = {
		title: 'Race & Ethnicity Compare Column Chart (%)',
		chartArea: {"left":"10%"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('raceColumnchart'));
		chart.draw(data, options);		    
    });

    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/EducationAttainment.json", function(json_data) {
    	result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% Population 25+ with No HS Diploma');
		data.addColumn('number', '% Population 25+ with a HS Diploma');
		data.addColumn('number', "% Population 25+ with a Bachelor's Degree");
		data.addColumn('number', '% Population 25+ with Graduate or Professional Degree');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),selectedCT[index]['Percent of Population 25+ with No HS Diploma'],
				selectedCT[index]['Percent of Population 25+ with a HS Diploma'], selectedCT[index]["Percent of Population 25+ with a Bachelor's Degree"],
				selectedCT[index]['Percent of Population 25+ with Graduate or Professional Degree']]);
		}
		
		var options = {
		title: 'Education Attainment Compare Column Chart (%)',
		chartArea: {"left":"10%"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('educationColumnchart'));
		chart.draw(data, options);			    
    });

    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Income.json", function(json_data) {
    	
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data1 = new google.visualization.DataTable();
		var data2 = new google.visualization.DataTable();
		data1.addColumn('string', 'Census Tract')
		data1.addColumn('number', '% HH with Income Under $35K');
		data1.addColumn('number', '% HH with Income Between $35K-$75K');
		data1.addColumn('number', "% HH with Income Between $75K-$200K");
		data1.addColumn('number', '% HH with income above $200K');
		data2.addColumn('string', 'Census Tract')
		data2.addColumn('number', '% pop in poverty');

		for (var index in selectedCTN){
			data1.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['Percent of HH with Income Under $35K'],
				selectedCT[index]['Percent of HH with Income Between $35K-$75K'], 
				selectedCT[index]["Percent of HH with Income Between $75K-$200K"],
				selectedCT[index]['Percent of HH with income above $200K']
				]);
			data2.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% pop in poverty']]);
		}
		
		var options1 = {
		title: 'Income Compare Column Chart (%)',
		chartArea: {"left":"10%"}
		};
		
		var chart1 = new google.visualization.ColumnChart(document.getElementById('incomeColumnchart'));
		chart1.draw(data1, options1);
		
		var options2 = {
		title: 'Poverty Compare Column Chart (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart2 = new google.visualization.ColumnChart(document.getElementById('povertyColumnchart'));
		chart2.draw(data2, options2);		    
    });

    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Transportation.json", function(json_data) {
	    result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% Workers who drove alone');
		data.addColumn('number', '% Workers who carpooled');
		data.addColumn('number', "% Workers who took public transportation");
		data.addColumn('number', '% Workers who worked at home');
		data.addColumn('number', '% Workers who used other transportation');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% Workers who drove alone'],
				selectedCT[index]['% Workers who carpooled'], 
				selectedCT[index]["% Workers who took public transportation"],
				selectedCT[index]['% Workers who worked at home'],
				selectedCT[index]['% Workers who used other transportation']
				]);
		}
		
		var options = {
		title: 'Transportation to Work Compare Column Chart (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('transportationColumnchart'));
		chart.draw(data, options);		    
    });
    
	$.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingAffordability.json", function(json_data) {
	    result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% owner costs over 30% income');
		data.addColumn('number', '% renter costs over 30% income');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% owner costs over 30% income'],
				selectedCT[index]['% renter costs over 30% income']
				]);
		}
		
		var options = {
		title: 'Housing Affordability Compare Column Chart (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('housingAffordabilityColumnchart'));
		chart.draw(data, options);	
    });
    
    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingCharacteristics.json", function(json_data) {
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data1 = new google.visualization.DataTable();
		var data2 = new google.visualization.DataTable();

		data1.addColumn('string', 'Census Tract');
		data1.addColumn('number', 'Median Home Value');

		data2.addColumn('string', 'Census Tract');
		data2.addColumn('number', 'Median Rent');


		for (var index in selectedCTN){
			data1.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['Median Home Value']
				]);
			data2.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['Median Rent']
				]);
		}

		
		var options1 = {
		title: 'Housing Value Compare Column Chart - Median Home Value',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart1 = new google.visualization.ColumnChart(document.getElementById('housingValueHomeColumnchart'));
		chart1.draw(data1, options1);
		
		var options2 = {
		title: 'Housing Value Compare Column Chart - Median Rent',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart2 = new google.visualization.ColumnChart(document.getElementById('housingValueRentColumnchart'));
		chart2.draw(data2, options2);
    });

    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/HousingVacancy.json", function(json_data) {
	    result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% Units Vacant, 2010');
		data.addColumn('number', '% owner-occupied units, 2010');
		data.addColumn('number', '% renter-occupied units, 2010');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% Units Vacant, 2010'],
				selectedCT[index]['% owner-occupied units, 2010'],
				selectedCT[index]['% renter-occupied units, 2010']
				]);
		}
		
		
		var options = {
		title: 'Housing Vacancy Compare Column Chart (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('housingVacancyColumnchart'));
		chart.draw(data, options);
    });
    
    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/Unemployment.json", function(json_data) {
	    result = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Census Tract')
		data.addColumn('number', '% Pop16+ unemployed');
		data.addColumn('number', '% Pop 16+ Employed');

		for (var index in selectedCTN){
			data.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% Pop16+ unemployed'],
				selectedCT[index]['% Pop 16+ Employed']
				]);
		}
		
		var options = {
		title: 'Unemployment Compare Column Chart (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('unemploymentColumnchart'));
		chart.draw(data, options);
    });
    
    $.getJSON("https://b2f5f552193011b749ed96b00501e7b0df0af48f-www.googledrive.com/host/0B4Hf5SIer4aIfkFrUERMaEI1VmlZWF9HbElGaDBEUVZvcm9KajhkUURodmdGRGx5OEV5Vk0/data/json/JobCharacteristics.json", function(json_data) {
	    result1 = [];
	    result2 = [];
		for(var key in json_data) {
			for (var index in selectedCTN){
				if(json_data[key].CTN == selectedCTN[index]) {
			    	//console.log(json_data[key].CTN);
			        selectedCT[index] = json_data[key];
			        //console.log(selectedCT[index]);
			    }
			}
		}
		
		var data1 = new google.visualization.DataTable();
		var data2 = new google.visualization.DataTable();

		data1.addColumn('string', 'Census Tract');
		data1.addColumn('number', '% jobs pay under 1,251_month, 2010');
		data1.addColumn('number', '% jobs pay 1,251-3,333_month, 2010');
		data1.addColumn('number', '% jobs pay over 3,333_month, 2010');

		data2.addColumn('string', 'Census Tract');
		data2.addColumn('number', '% jobs age 29 and under, 2010');
		data2.addColumn('number', '% jobs age 30-54, 2010');
		data2.addColumn('number', '% jobs age 55 and older, 2010');


		for (var index in selectedCTN){
			data1.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% jobs pay under 1,251_month, 2010'],
				selectedCT[index]['% jobs pay 1,251-3,333_month, 2010'],
				selectedCT[index]['% jobs pay over 3,333_month, 2010']
				]);
			data2.addRow([selectedCT[index].CTN.toString(),
				selectedCT[index]['% jobs age 29 and under, 2010'],
				selectedCT[index]['% jobs age 30-54, 2010'],
				selectedCT[index]['% jobs age 55 and older, 2010']
				]);
		}
		
		var options1 = {
		title: 'Job Characteristics Compare Column Chart - Pay (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart1 = new google.visualization.ColumnChart(document.getElementById('jobPayColumnchart'));
		chart1.draw(data1, options1);
		
		var options2 = {
		title: 'Job Characteristics Compare Column Chart - Age (%)',
		chartArea: {"left":"10%"},
		vAxis: {"minValue":"0"}
		};
		
		var chart2 = new google.visualization.ColumnChart(document.getElementById('jobAgeColumnchart'));
		chart2.draw(data2, options2);
    });
}