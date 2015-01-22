var pos1 = window.location.href.indexOf("/php/");
if ((pos1>=0) && (pageid != 'agglo') && (window.location.href.substring(0,pos1) != "http://www.citypopulation.de"))
  window.location.replace("http://www.citypopulation.de"+window.location.href.substring(pos1));

var google_cse_client = "partner-pub-7251478393613561:54544cvf3xn";
var google_cse_client_de = "partner-pub-7251478393613561:stwu7c6wfzh";
var google_alternate_color = "F9F9F9";

var loadStep = 0;
var actID = "XXX";
var selMarker = null;
var lastSelect = null;

var infoRow = null;
var google_search_e = new Array("Hotels","Restaurants","Shopping","Sights","Maps")
var google_search_d = new Array("Hotels","Restaurants","Einkaufen","Attraktionen","Karten")

var reqID = 0;
var searchID = 0;
var map = null;
var mapElem = null;
var infoWindow = null;

var doScroll = true;
var popControl = null;
var changeControl = null;
var densityControl = null;
var statusControl = null;
var aggloControl = null;
var radioControls = new Array();
var admControls = new Array();
var transpControl = null;
var mdownControl = null;
var mupControl = null;
var chartControl = null;
var helpControl = null;
var configControl = null;
var loadControl = null;
var mcrDiv = null;
var stati = new Array();
var agglos = new Array();

var cityData = null;
var cityChart = null;

var colNum = 1;
var ic = 0;
var io = 0;
var dates = new Array();
var dateTxts = null;

var vizMode = "";
if (typeof symbSize == "undefined")
	var symbSize = 16;

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-19698339-1']);
_gaq.push(['_gat._anonymizeIp']);
_gaq.push(['_trackPageview']);

var vizMode = cp.determineVizModeInHead();
if (vizMode == cp.VIZMODE_DESKTOP) {
    document.writeln('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>');
    document.writeln('<link rel="stylesheet" type="text/css" href="../jquery/jquery.css">');
    document.writeln('<link rel="stylesheet" type="text/css" href="../js/cp_charts.css" />');
    document.writeln('<link rel="stylesheet" type="text/css" href="citypop.css" media="all,handheld">');
	if (cp.isTouchDevice())
		document.writeln('<link rel="stylesheet" href="citytouch.css" media="all,handheld">');
}
else {
    document.writeln('<link rel="stylesheet" type="text/css" href="../jquery/jquery.css">');
    document.writeln('<link rel="stylesheet" type="text/css" href="../js/cp_chartsmobi.css" />');
    document.writeln('<link rel="stylesheet" type="text/css" href="citypopmobi.css" media="all,handheld">');
} 

function start_maps() {
  if (vizMode != "") {
    cp.loadScript('http://www.google-analytics.com/ga.js',true,null);
    return;
  }
  cp.loadScript("http://maps.googleapis.com/maps/api/js?"+advlib+"sensor=false&callback=load_cp_maps",true,null);
}

function load_cp_maps() {
  cp.loadScript("../js/cp_maps_gm_m.js",true,call_init_map);
}

function call_init_map() {
  cp.log("*** call init_maps");
  try {
    init_maps()
    cp.log("*** init_maps was successful");
  } catch (ex) {
    cp.log("*** init_maps was not successful");
  }
  init_data();
  cp.loadScript('http://www.google-analytics.com/ga.js',true,null);
}

function qalert (txt) {
  try {
    $("#alert").html("<p>"+txt+"</p>");
    $("#alert").dialog({ resizable: false, modal: true, title: (pagelang=='de'?'Hinweis':'Alert') });
  }
  catch (ex) {
    alert(txt);
  }
}

function show_adv () {
  if (vizMode != "")
    return;
  google_ad_client = "ca-pub-7251478393613561";
  google_ad_slot = "9127286940";
  google_ad_width = 160;
  google_ad_height = 600;
  document.writeln('<script src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>');
}

function show_mobiadv () {
  if (vizMode == "")
    return;
  google_ad_client = "ca-pub-7251478393613561";
  google_ad_slot = "2977286180";
  google_ad_width = 320;
  google_ad_height = 50;
  document.writeln('<script src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>');
}


function sym(id) {
  if (id != actID) {
    if (actID != "XXX") {
      var cell = document.getElementById ("i"+actID);
      if (cell != null)
        cell.style.backgroundColor = oldBackground
    }
    if (infoRow != null) {
      infoRow.parentNode.removeChild(infoRow)
      infoRow = null
    }
    actID = ""+id
    if (actID != "XXX") {
      var cell = document.getElementById ("i"+actID);
      if (cell != null) {
        oldBackground = cell.style.backgroundColor;
        cell.style.backgroundColor = '#ffcc33';
        doScroll = false;
        lastSelect = 'c';
        if (vizMode == cp.VIZMODE_DESKTOP) {
          if (! searchMarker(id) && (loadStep < lev_num)) {
            qalert (pagelang=='de'?"Bitte warten, bis die Kartendaten vollständig geladen sind!":"Please wait until the map data are completely loaded!");
            sym('XXX');
          }
          else
            cp.maps.addAdUnit();
        }
        else {
          if (isCity && (pagetype == 'citypop'))
            showMobiInfoRow('city',id);
          else if (isCity)
            showMobiInfoRow('c',id);
          else if (cell.getAttribute("class")=="admin1")
            showMobiInfoRow('adm1',id);
          else
            showMobiInfoRow('adm2',id);
        }
      }
      else
        actID = "XXX"
    }
  }
}

function showID (newActID) {
  if (newActID != actID) {
    if (actID != "XXX") {
      var cell = document.getElementById ("i"+actID);
      if (cell != null)
        cell.style.backgroundColor = oldBackground
    }
    actID = ""+newActID
    if (actID != "XXX") {
      var cell = document.getElementById ("i"+actID);
      if (cell != null) {
        oldBackground = cell.style.backgroundColor
        cell.style.backgroundColor = '#ffcc33'
      }
      else {
        actID = "XXX"
      }
    }
  }
}

function showHTMLInfoSelected () {
  if (selMarker != null)
    showHTMLInfo(selMarker);
}

function computeWikiCallTail (marker) {
  return computeMobiWikiTail(marker.wiki,marker.name,false);
}

function computeMobiWikiTail (wiki,name,enc) {
  if ((wiki != null) && (wiki != '')) {
    wiki = wiki.replace('_',' ').replace('#',' ');
    if (enc) 
      return encodeURI(wiki);
    else
      return wiki;
  }
  else
    return encodeURI(name);
}

function computeGoogleCallByMarkerCat(marker, cat) {
  var txt = marker.name;
  if ((marker.wiki != null) && (marker.wiki != ''))
    txt = marker.wiki;
  return computeGoogleCallByTextCat (txt,cat);
}

function computeGoogleCallByTextCat(txt, cat) {
  return computeGoogleCallByEncText(txt+' '+cat,'');
}

function computeGoogleCallByEncText(txt,type) {
  return "http://www.citypopulation.de/search-google"+((pagelang=="de")?"_d":"")+".html?q="+txt+((type=='')?'':'&type='+type);
}

function sort (id, column, num, ign) {
	if (infoRow != null) {
		infoRow.parentNode.removeChild(infoRow)
		infoRow = null
	}
	cp.data.sortTable (id,column,num,(column==0),ign);
}

function addStatus (obj) {
  var found = false;
  if ((obj.status == null) || (obj.status == '')) {
    obj.statusCol = null;
    return;
  }
  for (var i=0; i<stati.length; i++)
    if (obj.status == stati[i]) {
      obj.statusCol = i;
      return;
    }
  obj.statusCol = stati.length;
  stati.push(obj.status);
  cp.maps.Color.statusColors.addColor(stati.length)
}

function addAgglo (obj) {
  var found = false;
  if ((obj.agglo == null) || (obj.agglo == '')) {
    obj.aggloCol = null;
    return;
  }
  for (var i=0; i<agglos.length; i++)
    if (obj.agglo == agglos[i]) {
      obj.aggloCol = i;
      return;
    }
  obj.aggloCol = agglos.length;
  agglos.push(obj.agglo);
  cp.maps.Color.statusColors.addColor(agglos.length)
}

function showdiagr(pageid,type,id) {
	var data = cp.charts.retrievePopData(pageid,type,id);
	cp.charts.showPopDevDialog(data)
}

function showCharts() {
	prepareCharts()
	if (cityChart == null)
		return;
	cityChart.open()
	cityChart.draw();
}

function showhelp() {
  if (cp.maps.getMode() == cp.maps.STATUS_MODE)
    cp.maps.showLegend("#helpdiv",'Status',stati);
  else if (cp.maps.getMode() == cp.maps.AGGLO_MODE)
    cp.maps.showLegend("#helpdiv",'Agglomeration',agglos);
  else
    cp.maps.showLegend("#helpdiv");
}

function getStyleNumVal (elem,prop) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle)
    strValue = document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  else if (elem.currentStyle){
	prop = prop.replace(/\-(\w)/g, function (strMatch, p1){
	  return p1.toUpperCase();
	});
	strValue = elem.currentStyle[prop];
  }
  var val = parseInt(strValue.substr(0,strValue.length-2));
  return val;
}
