$(function() {
    $( "#popFilter" ).slider({
      range: true,
      min: 914,
      max: 14100,
      values: [ 914, 14100 ],
      stop: function( event, ui ) {
        $( "#popFilterAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ]);
        filterArray[28][2] = ui.values[ 0 ];
        filterArray[28][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#popFilterAmount" ).val( $( "#popFilter" ).slider( "values", 0 ) +
      " -" + $( "#popFilter" ).slider( "values", 1 ));
  });

$(function() {
    $( "#medAgeFilter" ).slider({
      range: true,
      min: 15,
      max: 48,
      values: [ 15, 48 ],
      stop: function( event, ui ) {
        $( "#medAgeFilterAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ]);
        filterArray[0][2] = ui.values[ 0 ];
        filterArray[0][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#medAgeFilterAmount" ).val( $( "#medAgeFilter" ).slider( "values", 0 ) +
      " -" + $( "#medAgeFilter" ).slider( "values", 1 ));
  });

$(function() {
    $( "#Age5Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Age5FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[1][2] = ui.values[ 0 ];
        filterArray[1][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Age5FilterAmount" ).val( $( "#Age5Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Age5Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Age6Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Age6FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[2][2] = ui.values[ 0 ];
        filterArray[2][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Age6FilterAmount" ).val( $( "#Age6Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Age6Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Age18Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Age18FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[3][2] = ui.values[ 0 ];
        filterArray[3][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Age18FilterAmount" ).val( $( "#Age18Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Age18Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Age30Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Age30FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[4][2] = ui.values[ 0 ];
        filterArray[4][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Age30FilterAmount" ).val( $( "#Age30Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Age30Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Age45Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Age45FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[5][2] = ui.values[ 0 ];
        filterArray[5][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Age45FilterAmount" ).val( $( "#Age45Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Age45Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Age65Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Age65FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[6][2] = ui.values[ 0 ];
        filterArray[6][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Age65FilterAmount" ).val( $( "#Age65Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Age65Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#DiverFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#DiverFilterAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        filterArray[29][2] = ui.values[ 0 ];
        filterArray[29][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#DiverFilterAmount" ).val( $( "#DiverFilter" ).slider( "values", 0 ) +
      "-" + $( "#DiverFilter" ).slider( "values", 1 ));
  });

$(function() {
    $( "#WhiteFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#WhiteFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[30][2] = ui.values[ 0 ];
        filterArray[30][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#WhiteFilterAmount" ).val( $( "#WhiteFilter" ).slider( "values", 0 ) +
      "% -" + $( "#WhiteFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#BlackFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#BlackFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[31][2] = ui.values[ 0 ];
        filterArray[31][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#BlackFilterAmount" ).val( $( "#BlackFilter" ).slider( "values", 0 ) +
      "% -" + $( "#BlackFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#AsianFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#AsianFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[32][2] = ui.values[ 0 ];
        filterArray[32][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#AsianFilterAmount" ).val( $( "#AsianFilter" ).slider( "values", 0 ) +
      "% -" + $( "#AsianFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#HispaFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#HispaFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[33][2] = ui.values[ 0 ];
        filterArray[33][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#HispaFilterAmount" ).val( $( "#HispaFilter" ).slider( "values", 0 ) +
      "% -" + $( "#HispaFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#NHFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#NHFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[7][2] = ui.values[ 0 ];
        filterArray[7][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#NHFilterAmount" ).val( $( "#NHFilter" ).slider( "values", 0 ) +
      "% -" + $( "#NHFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#HFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#HFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[8][2] = ui.values[ 0 ];
        filterArray[8][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#HFilterAmount" ).val( $( "#HFilter" ).slider( "values", 0 ) +
      "% -" + $( "#HFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#BFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#BFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[9][2] = ui.values[ 0 ];
        filterArray[9][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#BFilterAmount" ).val( $( "#BFilter" ).slider( "values", 0 ) +
      "% -" + $( "#BFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#GFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#GFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[10][2] = ui.values[ 0 ];
        filterArray[10][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#GFilterAmount" ).val( $( "#GFilter" ).slider( "values", 0 ) +
      "% -" + $( "#GFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#MHIFilter" ).slider({
      range: true,
      min: 7135,
      max: 207734,
      values: [ 7135, 207734 ],
      stop: function( event, ui ) {
        $( "#MHIFilterAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        filterArray[16][2] = ui.values[ 0 ];
        filterArray[16][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#MHIFilterAmount" ).val( $( "#MHIFilter" ).slider( "values", 0 ) +
      "- " + $( "#MHIFilter" ).slider( "values", 1 ) );
  });

$(function() {
    $( "#Income1Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Income1FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[17][2] = ui.values[ 0 ];
        filterArray[17][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Income1FilterAmount" ).val( $( "#Income1Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Income1Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Income2Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Income2FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[18][2] = ui.values[ 0 ];
        filterArray[18][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Income2FilterAmount" ).val( $( "#Income2Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Income2Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Income3Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Income3FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[19][2] = ui.values[ 0 ];
        filterArray[19][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Income3FilterAmount" ).val( $( "#Income3Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Income3Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Income4Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Income4FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[20][2] = ui.values[ 0 ];
        filterArray[20][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Income4FilterAmount" ).val( $( "#Income4Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Income4Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#PovertyFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#PovertyFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[21][2] = ui.values[ 0 ];
        filterArray[21][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#PovertyFilterAmount" ).val( $( "#PovertyFilter" ).slider( "values", 0 ) +
      "% -" + $( "#PovertyFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#DriveAloneFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#DriveAloneFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[34][2] = ui.values[ 0 ];
        filterArray[34][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#DriveAloneFilterAmount" ).val( $( "#DriveAloneFilter" ).slider( "values", 0 ) +
      "% -" + $( "#DriveAloneFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#CarPoolFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#CarPoolFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[35][2] = ui.values[ 0 ];
        filterArray[35][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#CarPoolFilterAmount" ).val( $( "#CarPoolFilter" ).slider( "values", 0 ) +
      "% -" + $( "#CarPoolFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#PTFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#PTFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[36][2] = ui.values[ 0 ];
        filterArray[36][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#PTFilterAmount" ).val( $( "#PTFilter" ).slider( "values", 0 ) +
      "% -" + $( "#PTFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#HomeFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#HomeFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[37][2] = ui.values[ 0 ];
        filterArray[37][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#HomeFilterAmount" ).val( $( "#HomeFilter" ).slider( "values", 0 ) +
      "% -" + $( "#HomeFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#OtherTransFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#OtherTransFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[38][2] = ui.values[ 0 ];
        filterArray[38][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#OtherTransFilterAmount" ).val( $( "#OtherTransFilter" ).slider( "values", 0 ) +
      "% -" + $( "#OtherTransFilter" ).slider( "values", 1 ) + "%");
  });


$(function() {
    $( "#OAFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#OAFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[11][2] = ui.values[ 0 ];
        filterArray[11][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#OAFilterAmount" ).val( $( "#OAFilter" ).slider( "values", 0 ) +
      "% -" + $( "#OAFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#RAFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#RAFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[12][2] = ui.values[ 0 ];
        filterArray[12][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#RAFilterAmount" ).val( $( "#RAFilter" ).slider( "values", 0 ) +
      "% -" + $( "#RAFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#ValueFilter" ).slider({
      range: true,
      min: 37600,
      max: 1000000,
      values: [ 37600, 1000000 ],
      stop: function( event, ui ) {
        $( "#ValueFilterAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        filterArray[13][2] = ui.values[ 0 ];
        filterArray[13][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#ValueFilterAmount" ).val( $( "#ValueFilter" ).slider( "values", 0 ) +
      " -" + $( "#ValueFilter" ).slider( "values", 1 ));
  });

$(function() {
    $( "#RentFilter" ).slider({
      range: true,
      min: 249,
      max: 1315,
      values: [ 249, 1315 ],
      stop: function( event, ui ) {
        $( "#RentFilterAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        filterArray[14][2] = ui.values[ 0 ];
        filterArray[14][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#RentFilterAmount" ).val( $( "#RentFilter" ).slider( "values", 0 ) +
      " -" + $( "#RentFilter" ).slider( "values", 1 ));
  });

$(function() {
    $( "#VacancyFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#VacancyFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[15][2] = ui.values[ 0 ];
        filterArray[15][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#VacancyFilterAmount" ).val( $( "#VacancyFilter" ).slider( "values", 0 ) +
      "% -" + $( "#VacancyFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#EmFilter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#EmFilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[39][2] = ui.values[ 0 ];
        filterArray[39][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#EmFilterAmount" ).val( $( "#EmFilter" ).slider( "values", 0 ) +
      "% -" + $( "#EmFilter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Salary1Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Salary1FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[22][2] = ui.values[ 0 ];
        filterArray[22][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Salary1FilterAmount" ).val( $( "#Salary1Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Salary1Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Salary2Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Salary2FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[23][2] = ui.values[ 0 ];
        filterArray[23][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Salary2FilterAmount" ).val( $( "#Salary2Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Salary2Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Salary3Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Salary3FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[24][2] = ui.values[ 0 ];
        filterArray[24][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Salary3FilterAmount" ).val( $( "#Salary3Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Salary3Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Salary4Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Salary4FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[25][2] = ui.values[ 0 ];
        filterArray[25][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Salary4FilterAmount" ).val( $( "#Salary4Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Salary4Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Salary5Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Salary5FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[26][2] = ui.values[ 0 ];
        filterArray[26][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Salary5FilterAmount" ).val( $( "#Salary5Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Salary5Filter" ).slider( "values", 1 ) + "%");
  });

$(function() {
    $( "#Salary6Filter" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      stop: function( event, ui ) {
        $( "#Salary6FilterAmount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
        filterArray[27][2] = ui.values[ 0 ];
        filterArray[27][3] = ui.values[ 1 ];
        filterResetPolygon();
        filter(filterArray);
      }
    });
    $( "#Salary6FilterAmount" ).val( $( "#Salary6Filter" ).slider( "values", 0 ) +
      "% -" + $( "#Salary6Filter" ).slider( "values", 1 ) + "%");
  });