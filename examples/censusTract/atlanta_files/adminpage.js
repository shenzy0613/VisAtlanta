var pagetype = "adminpage";

var isAdmin = window.location.href.indexOf("-admin") > 0;
var isCity = !isAdmin;
var adminLayer;
var symbolLayer;
var opac = 0.7;
var adminmode = "adm0";
var adminNum = [];
var adminVal = [];
var POP_SELECTORS = 1;

function showHTMLInfo(marker) {
  if (selMarker != null) {
    var opts = {
      strokeColor: "#000000",
      zIndex: (selMarker.getLayer()=='adm1'?3:2),
      strokeWeight: (selMarker.getLayer()=='adm1')&&(lev_num > 1) ? 2.2:0.8
    };
    if (infoWindow != null)
      infoWindow.close();
    selMarker.setOptions(opts);
    selMarker = null;
  }
  if (infoRow != null) {
    infoRow.parentNode.removeChild(infoRow)
    infoRow = null
  }
  var graphimage = document.getElementById('graphimage')
  if (marker == null) {
    if (graphimage != null)
      graphimage.style.visibility = 'hidden';
    return;
  }
  var id = marker.id;
  var rowe = document.getElementById('i'+id)
  if (rowe == null)
    return;
  var row = rowe.parentNode
  var rowParent = row.parentNode
  var tabId = rowParent.parentNode.id
  var cells = row.getElementsByTagName('td')
  infoRow = document.getElementById('inforow')
  if (infoRow == null)
    return
  infoRow = infoRow.cloneNode(true)
  var infoCell = infoRow.firstChild

  var newP = document.createElement('p');
  var txt = '';
  if (marker.area > 0)
    if (pagelang == 'de')
      txt += 'Fläche: ' + cp.maps.formatNum(Math.round(marker.area)/100) + ' km²';
    else
      txt += 'Area: ' + cp.maps.formatNum(Math.round(marker.area)/100) + ' km²';
  if (marker.density != null) {
    if (pagelang == 'de')
      txt += ' &ndash; Dichte: ' + cp.maps.formatNum(marker.density) + ' Einw./km²';
    else
      txt += ' &ndash; Density: ' + cp.maps.formatNum(marker.density) + ' inh./km²';
    txt += " <small>["+dateTxts[ic].substr(2,4)+"]</small>"
  }
  if (marker.incr != null) {
    txt += pagelang == 'de'? ' &ndash; Änderung: ' : ' &ndash; Change: ';
    if (marker.incr > 0)
      txt += '+';
    txt += cp.maps.formatNum(marker.incr) + (pagelang == 'de'? '%/Jahr' : '%/year');
    txt += " <small>["+dateTxts[io].substr(2,4)+' → '+dateTxts[ic].substr(2,4)+"]</small>"
  }
  if (txt != '') {
    newP.innerHTML = txt;
    infoCell.appendChild(newP);
  }

  newP = document.createElement('p');
  var aElem = document.createElement('a');
  aElem.setAttribute('href',"javascript:showdiagr('"+pageid+"','"+marker.getLayer()+"','"+id+"')")
  aElem.appendChild(document.createTextNode((pagelang == 'de'? 'Bevölkerungsdiagramm' : 'Population Graph')))
  if (years > 0) {
    newP.appendChild(aElem);
    if ((marker.wiki != '-') && (objtype == ''))
      newP.appendChild(document.createTextNode(' – '));
  }
  aElem = document.createElement('a');
  aElem.setAttribute('href',window.location.pathname+'?'+marker.getLayer()+'id='+id)
  aElem.appendChild(document.createTextNode((pagelang == 'de'? 'Einzeldarstellung' : 'Separate Presentation')));
  if ((marker.wiki!= '-') && (objtype == ''))
    newP.appendChild(aElem);
  infoCell.appendChild(newP);

  if (marker.wiki != "-") {
    newP = document.createElement('p');
  
    var wikitail = computeWikiCallTail(marker);
    aElem = document.createElement('a');
    aElem.setAttribute('href','http://'+pagelang+'.wikipedia.org/wiki?search='+wikitail)
    aElem.setAttribute('target','extern')
    aElem.appendChild(document.createTextNode('Wikipedia'))
    newP.appendChild(aElem)

    newP.appendChild(document.createTextNode(' – Google: '))
    var google_search = (pagelang == 'de'? google_search_d : google_search_e)
    for (var i=0; i<google_search.length; i++) {
      var aElem = document.createElement('a');
      aElem.setAttribute('href',computeGoogleCallByMarkerCat(marker,google_search[i]))
      //aElem.setAttribute('target','extern')
      aElem.appendChild(document.createTextNode(google_search[i]))
      newP.appendChild(aElem)
      newP.appendChild(document.createTextNode(' – '));
    }

    aElem = document.createElement('a');
    aElem.setAttribute('href',computeGoogleCallByEncText(wikitail,'image'));
    //aElem.setAttribute('target','extern');
    aElem.appendChild(document.createTextNode((pagelang == 'de'? 'Bilder' : 'Images')))
    newP.appendChild(aElem);

    infoCell.appendChild(newP);
  }

  if (row.nextSibling != null)
    rowParent.insertBefore(infoRow,row.nextSibling)
  else
    rowParent.appendChild(infoRow)
  if (doScroll) {
    rowe.scrollIntoView();
  }
  doScroll = true;
  
  selMarker = marker;
  var opts = {
    strokeColor: "#00ff00",
    zIndex: 4,
    strokeWeight: (selMarker.getLayer()=='adm1')&&(lev_num>1) ? 3 : 1.8
  };
  selMarker.setOptions(opts);

  var graphlink = document.getElementById('graphlink');
  if (graphlink != null)
    graphlink.setAttribute('href',"javascript:showdiagr('"+pageid+"','"+marker.getLayer()+"','"+id+"')")
  var graph = document.getElementById('admgraph')
  if (graph != null) {
    graph.style.display = 'block'
    cp.charts.drawPopDevChart(cp.charts.CHART_SIZE_SMALL,graph,dates,marker.pop);
  }
}

function showMobiInfoRow(type,id) {
  var rowe = document.getElementById('i'+id)
  if (rowe == null)
    return;
  var wiki = rowe.getAttribute('data-wiki');
  var row = rowe.parentNode
  var rowParent = row.parentNode
  var tabId = rowParent.parentNode.id
  var cells = row.getElementsByTagName('td')
  infoRow = document.getElementById('inforow')
  if (infoRow == null)
    return
  infoRow = infoRow.cloneNode(true)
  var infoCell = infoRow.firstChild
  var linkNode = rowe.firstChild
  //var name = linkNode.firstChild.nodeValue
  var name = linkNode.firstChild;
  if (name.firstChild != null)
    name = name.firstChild;
  name = name.nodeValue
 
  var newP = document.createElement('p');
  newP.innerHTML = ((wiki != "-")?'<a href="'+computeGoogleCallByEncText(computeMobiWikiTail(wiki,name,true),'')+'" target="_blank"><img class="img48" src="../images/ggsearch48.png" /></a>' +
    '<a href="'+computeGoogleCallByEncText(computeMobiWikiTail(wiki,name,true),'image')+'" target="_blank"><img class="img48" src="../images/ggimg48.png" /></a>' +
    '<a href="http://'+pagelang+'.m.wikipedia.org/wiki?search='+computeMobiWikiTail(wiki,name,false)+'" target="_blank"><img class="img48" src="../images/wiki48.png" /></a>':'') +
    ((years > 0)?'<img class="img48" src="../images/graph48.png" onClick="showdiagr'+"('"+pageid+"','"+type+"','"+id+"'"+')"/>':'') +
    '<a href="http://www.citypopulation.de/php/mobimap.php?PAGEID='+pageid+'&TYPE='+type+'&LANG='+pagelang+'&ID='+id+'&MAPTYPE=normal" target="_blank"><img class="img48" src="../images/gmaps48.png" /></a>';
  infoCell.appendChild(newP);

  if (row.nextSibling != null)
    rowParent.insertBefore(infoRow,row.nextSibling)
  else
    rowParent.appendChild(infoRow)
  doScroll = true;
}

function computeFillColor (pol) {
  if (isAdmin && (pol.getLayer() != adminmode)) {
    var opts = { clickable: false, fillOpacity: 0, strokeOpacity: (pol.getLayer() == 'adm1') ? 1 : 0 };
    pol.setOptions(opts);
    return;
  }
  var value = null;
  var display = cp.maps.getMode();
  if (display == cp.maps.DENSITY_MODE) {
    rgb = cp.maps.Color.getDensityColor(pol.density);
    value = pol.density;
  }
  else if (display == cp.maps.POP_MODE) {
    rgb = 'eee';
    value = pol.pop[ic];
  }
  else if (display == cp.maps.CHANGE_MODE) {
    rgb = cp.maps.Color.getChangeColor(pol.incr);
    value = pol.incr;
  }
  else if (display == cp.maps.AGGLO_MODE) {
    if (agglo_mode == 'edit') {
      computeAggloFillColor(pol);
      return;
    }
    rgb = cp.maps.Color.statusColors.getColor(pol.aggloCol).css();
  }
  else {
    rgb = cp.maps.Color.statusColors.getColor(pol.statusCol).css();
    value = pol.statusCol;
  }
  var opts = {
    clickable: true,
    fillColor: "#"+rgb,
    fillOpacity: opac,
    strokeOpacity: 1.0
  };
  pol.setOptions(opts);
  pol.setData(value,pol.pop[ic]);
}

function computePolProps (pol) {
  var dyears = (dates[ic]-dates[io])/(1000*60*60*24*365.25);
  pol.incr = null;
  if ((pol.pop[io] > 0) && (dyears > 0) && (pol.pop[ic] > 0))
    pol.incr = Math.round(10000.0*(Math.exp(Math.log(pol.pop[ic]/pol.pop[io])/dyears)-1.0)) / 100;
  pol.density = null;
  if ((pol.area > 0) && (pol.pop[ic] >= 0)) {
    if (100*pol.pop[ic]/pol.area > 0.1)
      pol.density = Math.round(1000*pol.pop[ic]/pol.area)/10;
    else
      pol.density = Math.round(1000000.0*pol.pop[ic]/pol.area)/10000;
  }
  computeFillColor(pol);
  pol.changetxt = "";
  if (pol.incr != null) {
    pol.changetxt = "<br/>";
    if (pol.incr > 0)
      pol.changetxt += '+';
    pol.changetxt += pol.incr+(pagelang == 'de'? '%/Jahr <small>[' : '%/year <small>[')+dateTxts[io].substr(2,4)+' → '+dateTxts[ic].substr(2,4)+']</small>';
  }
  pol.densitytxt = "";
  if (pol.density != null)
    pol.densitytxt = " = "+cp.maps.formatNum(pol.density)+(pagelang == 'de'? ' Einw./km²' : ' inh./km²');
  /*pol.setInfoContent('<div class="infow"><strong>'+
                pol.name+"</strong>"+pol.admtext+
                ((pol.status != '') ? ("<br/>"+pol.status) : '')+
                ((pol.pop[ic]>=0) ? "<br/>"+cp.maps.formatNum(pol.pop[ic])+(pagelang == 'de'?' Einw. <small>[':' pop. <small>[')+dateTxts[ic].substr(2,4)+']</small>'+pol.changetxt : '')+
                ((pol.area>0) ? "<br/>"+cp.maps.formatNum(Math.round(pol.area)/100.0)+" km² "+pol.densitytxt : '') + "</div>");*/
}

function showInfo (pol) {
  //log("showInfo");
  if (infoWindow != null)
    infoWindow.close();
  showID (pol.id);
  showHTMLInfo(pol);
  pol.showInfoWindow();
  infoWindow = pol.getInfoWindow();
}

function newpol (p) {
  var pol = new cp.maps.Polygon(p.type, p.c,p.lat,p.lng);
  var opts = {
    fillColor: "#ff0000",
    fillOpacity: opac,
    strokeColor: "#000000",
    strokeWeight: (p.type=='adm1')&&(lev_num>1) ? 2.2 : 0.8,
    zIndex: (p.type == 'adm1' ? 3 : 2)
  };
  pol.setOptions(opts);
  pol.id = p.id;
  pol.name = p.name;
  pol.adm = p.adm;
  pol.status = p.status;
  addStatus(pol);
  try {
    pol.agglo = p.agglo;
    addAgglo(pol);
  } catch (ex) {
  }
  pol.wiki = p.wiki;
  pol.pop = p.pop;
  pol.area = p.area;
  if (p.type == 'adm1') 
    pol.area = pol.area*100;
  pol.admtext = "";
  if ((pol.adm != null) && (pol.adm != ''))
    pol.admtext = " ("+pol.adm+")";
  computePolProps(pol);
  pol.setToolTip('<span class="ttt">'+pol.name+'</span>'+pol.admtext+'<br/><span class="ttc">'+((pagelang=='de')?'Für Info klicken.': 'Click for info.')+'</span>');
  pol.setClickCallback(showInfo);
  pol.setMap(map);
  pol.setVisible(true);
  var polsymb = new cp.maps.PolSymbol(pol);
  symbolLayer.add(polsymb);
  return pol;
}

function retrieve (step) {
  if (map == null)
    return;
  var http_request = new XMLHttpRequest();
  var type = (objtype != '') ? objtype : (isAdmin?('adm'+step):'c');
  //log('retrieveAdminPols.php?reqid=' + (++reqID) + '&pageid=' + pageid + '&type=' + type + '&objid=' + objid);
  http_request.open( "GET", 'retrieveAdminPols.php?reqid=' + (++reqID) + '&pageid=' + pageid + '&type=' + type + '&objid=' + objid, true );
  http_request.onreadystatechange = function () {
    if (http_request.readyState == 4 && http_request.status == 200){
       retrievePols( http_request.responseText, step );
       if (step < lev_num)
         retrieve(step+1)
    }
  };
  http_request.send(null);
}

function retrievePols (data,step) {
  var r = eval("(" + data + ")");
  //log(r.reqid+" -> "+r.pols.length);
  colNum = r.cn;
  ic = r.cn-1;
  io = r.cn-2;
  if (io < 0) io = 0;
  dateTxts = r.cols;
  configControl.controlText.innerHTML = dateTxts[ic];
  if (step == 1)
    for (var i=0; i<colNum; i++) {
      var y = r.cols[i].substr(2,4);
      var m = r.cols[i].substr(7,2);
      var d = r.cols[i].substr(10,2);
      dates.push(new Date(y,m-1,d));
    }
  var maxPop = 0;
  for (var i=0; i<r.pols.length; i++) {
    var np = newpol(r.pols[i]);
    if (np.pop[colNum-1] != null && np.pop[colNum-1]>maxPop)
       maxPop = np.pop[colNum-1];
    adminLayer.add(np);
  }
  if (step >= lev_num) {
    loadControl.style.display = 'none';
  }
  adminNum.push(r.pols.length);
  adminVal.push(maxPop);
  cp.maps.Style.setSizeHints(cp.maps.runsOnPad()?symbSize+4:symbSize,true,r.pols.length,maxPop);
  if ((objid == '') && (lev_num > 1))
    cp.maps.enableControl(admControls[step-1],true);
  processUDCEvent('adm'+step);
  loadStep = step;
  if (objid != '') {
    searchMarker(objid);
    objid = '';
  }
}

function redrawMap() {
  if (map == null)
    return;
  for (var i=0; i<adminLayer.length; i++)
    computeFillColor(adminLayer[i]);
  symbolLayer.drawAll();
}

function resetPols() {
  for (var i=0; i<adminLayer.length; i++)
    computePolProps(adminLayer[i]);
  symbolLayer.drawAll();
}

function searchMarker (id) {
  for (var i=0; i<adminLayer.length; i++) {
    var m = adminLayer[i];
    if (m.id == id) {
      if (isAdmin && (m.getLayer() != adminmode))
        processUDCEvent(m.getLayer());
      map.fitBounds(m.getBounds());
      m.click();
      return true;
    }
  }
  return false;
}

function prepareCharts () {
	if (cityData != null)
		return;
	cityData = new cp.charts.DataContainer('ts',1)
	cityChart = new cp.charts.ChartDialog(cityData,cp.charts.ChartDialog.CITY_DATA)
	cityChart.draw(cp.charts.ChartDialog.SIZE_CHART,cp.charts.ChartDialog.ALL_PLACES);
}

function processUDCEvent (cmd, evt) {
  var display = cp.maps.getMode();
  if (cmd == cp.maps.DENSITY_MODE) {
     if (cmd != display)  {
       cp.maps.highlightControl(densityControl);
       cp.maps.hideLegend();
       cp.maps.setMode(cmd);
       redrawMap();
     }
  }
  else if (cmd == cp.maps.POP_MODE) {
     if (cmd != display)  {
       cp.maps.highlightControl(popControl);
       cp.maps.hideLegend();
       cp.maps.setMode(cmd);
       redrawMap();
     }
  }
  else if (cmd == cp.maps.CHANGE_MODE) {
     if (cmd != display)  {
       cp.maps.highlightControl(changeControl);
       cp.maps.hideLegend();
       cp.maps.setMode(cmd);
       redrawMap();
     }
  }
  else if (cmd == cp.maps.STATUS_MODE) {
     if (cmd != display)  {
       cp.maps.highlightControl(statusControl);
       cp.maps.hideLegend();
       cp.maps.setMode(cmd);
       redrawMap();
     }
  }
  else if (cmd == cp.maps.AGGLO_MODE) {
     if (cmd != display)  {
       cp.maps.highlightControl(aggloControl);
       cp.maps.hideLegend();
       cp.maps.setMode(cmd);
       redrawMap();
     }
  }
  else if (cmd.substr(0,3) == 'adm') {
     if (cmd != adminmode) {
       if (! isAdmin) {
         cp.maps.setVisibileLayer('c');
         return;
       }
       adminmode = cmd;
       cp.maps.setVisibileLayer(adminmode);
       var lev = parseInt(cmd.substr(3,1))-1;
       if (admControls[lev] != null)
         cp.maps.highlightControl(admControls[lev]);
       showHTMLInfo(null);
       cp.maps.Style.setSizeHints(cp.maps.runsOnPad()?symbSize+4:symbSize,true,adminNum[lev],adminVal[lev]);
       redrawMap();
     }
  }
  else if (cmd == 'transp') {
    if (evt.ctrlKey)
      opac += 0.1;
    else
      opac -= 0.1;
    if (opac < 0)
      opac = 1;
    else if (opac > 1)
      opac = 0;
    redrawMap();
  }
  else if (cmd == 'config') {
    if (evt.ctrlKey)
      ic++;
    else
      ic--;
    if (ic < 0)
      ic = colNum-1;
    else if (ic >= colNum)
      ic = 0;
    io = ic-1;
    if (io < 0)
      io = 0;
    configControl.controlText.innerHTML = dateTxts[ic];
    resetPols();
    showHTMLInfoSelected();
  }
  else if (cmd == 'chart') {
    showCharts()
  }
  else if (cmd == 'mup')
    resize(50);
  else if (cmd == 'mdown')
    resize(-50);
  else if (cmd == 'help')
    showhelp();
}

function processUDCStatusChange (cmd,evt) {
  if (cmd == cp.maps.CHANGE_MODE) {
     if (evt.target.checked)
       cp.maps.setSubmode(cp.maps.CHANGE_SYMB_SUBMODE);
     else
       cp.maps.setSubmode(cp.maps.CHANGE_NOSYMB_SUBMODE);
     redrawMap();
  }
  else if (cmd == cp.maps.POP_MODE) {
     var inputname = evt.target.name;
     cp.maps.resetRadioSelectors(POP_SELECTORS);
     evt.target.checked = true;
     if (inputname == "circle")
       cp.maps.setSubmode(cp.maps.POP_CIRC_SUBMODE);
     else
       cp.maps.setSubmode(cp.maps.POP_BAR_SUBMODE);
     redrawMap();
  }
}

/*
function resize (offset) {
  mheight = getStyleNumVal (mapElem,"height");
  if ((mheight <= 200) && (offset < 0))
    return;
  mbottom = getStyleNumVal (mapElem,"bottom");
  telem = document.getElementById("admtable");
  theight = telem.style.height;
  if (theight == "")
    theight = "300px";
  theight = parseInt(theight.substr(0,theight.length-2))
  gelem = document.getElementById("admgraph");
  if (gelem != null)
    gbottom = getStyleNumVal (gelem,"bottom");
  if (theight - offset <= 50)
    return;
  mapElem.style.bottom = (mbottom - offset)+"px";
  telem.style.height = (theight - offset)+"px";
  if (gelem != null)
    gelem.style.bottom = (gbottom - offset)+"px";
  google.maps.event.trigger(map, 'resize');
}
*/

function resize (offset) {
  mheight = getStyleNumVal (mapElem,"height");
  if ((mheight <= 200) && (offset < 0))
    return;
  telem = document.getElementById("admtable");
  ttop = getStyleNumVal (telem,"top");
  gelem = document.getElementById("admgraph");
  if (gelem != null)
    gtop = getStyleNumVal (gelem,"top");
  mapElem.style.height = (mheight + offset)+"px";
  telem.style.top = (ttop + offset)+"px";
  if (gelem != null)
    gelem.style.top = (gtop + offset)+"px";
  google.maps.event.trigger(map, 'resize');
}

function init_data() {
	var ird = document.getElementById("inforowdiv")
	ird.innerHTML = '<table><tr id="inforow"><td class="inforow" colspan="20"></td></tr></table>'
	if (vizMode != "") {
		if (objid != '') {
			sym(objid);
			objid = '';
		}
	}
}

function init_maps() {
  if (map != null)
    return;
  mapElem = document.getElementById('admmap');
  try {
    var mheight = getStyleNumVal (mapElem,"height");
    var sheight = window.innerHeight * (isCity && objid==''?0.45:0.55);
	resize (sheight-mheight);
  }
  catch (ex) {}
  map = cp.maps.init (mapElem,startmap,start_y,start_x,start_level,{},cp.maps.DENSITY_MODE,vizMode,pagelang);
  adminLayer = new cp.maps.FeatureArray();
  symbolLayer = new cp.maps.FeatureArray();

  configControl = cp.maps.createMapControl ('config',popDate,(pagelang=='de'?'Bezugsdatum ändern (»Strg« für Umkehrung)':'Change Reference Date (»ctrl« for reverse)'),null,80,3,3,cp.maps.NO_RADIOCONTROL,processUDCEvent);

  densityControl = cp.maps.createMapControl (cp.maps.DENSITY_MODE,(pagelang == 'de'? 'Dichte' : 'Density'),(pagelang=='de'?'Bevölkerungsdichte anzeigen':'Show Population Density'),'#ffcc33',60,3,0,cp.maps.MODE_RADIOCONTROL,processUDCEvent);

  popControl = cp.maps.createMapControl (cp.maps.POP_MODE,(pagelang == 'de'? 'Einwohner' : 'Population'),(pagelang=='de'?'Bevölkerung anzeigen':'Show Population'),null,70,0,0,cp.maps.MODE_RADIOCONTROL,processUDCEvent);
  cp.maps.appendMapControlStatus (popControl,
      '<input type="radio" name="circle" checked="checked"> <label>'+(pagelang=='de'?'Kreis':'Circle')+'</label><br/><input type="radio" name="col"> <label>'+(pagelang=='de'?'Säule':'Bar')+'</label>', 43, POP_SELECTORS, processUDCStatusChange);

  if (years > 0) {
    changeControl = cp.maps.createMapControl (cp.maps.CHANGE_MODE,(pagelang == 'de'? 'Änderung' : 'Change'),(pagelang=='de'?'Bevölkerungsänderung anzeigen':'Show Population Change'),null,65,0,0,cp.maps.MODE_RADIOCONTROL,processUDCEvent);
    cp.maps.appendMapControlStatus (changeControl,
      '<input type="checkbox" name="densitySymbol" value="false"> <label>Symbol</label>', 22, null, processUDCStatusChange);
  }
  if (agglo_mode != '')
    aggloControl = cp.maps.createMapControl (cp.maps.AGGLO_MODE,'Agglo',(pagelang=='de'?'Agglomerationen anzeigen':'Show Agglomerations'),null,60,0,0,cp.maps.MODE_RADIOCONTROL,processUDCEvent);

  statusControl = cp.maps.createMapControl (cp.maps.STATUS_MODE,'Status',(pagelang=='de'?'Status anzeigen':'Show Status'),null,60,0,3,cp.maps.MODE_RADIOCONTROL,processUDCEvent);

  if (lev_num > 1)
    for (var i=1; i<=lev_num; i++) {
      var control = cp.maps.createMapControl ('adm'+i,(pagelang == 'de'? 'Ebene ' : 'Level ')+i,(pagelang == 'de'? 'Ebene '+i+' anzeigen' : 'Show Level '+i),null,55,(i==1)?3:0,(i==lev_num)?3:0,cp.maps.ADM_RADIOCONTROL,processUDCEvent);
      cp.maps.enableControl(control,false);
      admControls.push(control);
    }

  if (isCity && (objid == ''))
    chartControl = cp.maps.createMapControl ('chart',(pagelang == 'de'? 'Diagramm' : 'Chart'),(pagelang=='de'?'Diagramm anzeigen':'Show Population Chart'),null,65,3,3,cp.maps.NO_RADIOCONTROL,processUDCEvent);

  transpControl = cp.maps.createMapControl ('transp',(pagelang == 'de'? 'Transparenz' : 'Transparency'),(pagelang=='de'?'Transparenz ändern (»Strg« für Umkehrung)':'Change Transparency (»ctrl« for reverse)'),null,80,3,3,0,processUDCEvent);

  mupControl = cp.maps.createMapControl ('mup','↓',(pagelang=='de'?'Kartenhöhe erhöhen':'Increase Map Height'),null,20,3,0,cp.maps.NO_RADIOCONTROL,processUDCEvent);
  mdownControl = cp.maps.createMapControl ('mdown','↑',(pagelang=='de'?'Kartenhöhe verringern':'Decrease Map Height'),null,20,0,3,cp.maps.NO_RADIOCONTROL,processUDCEvent);

  helpControl = cp.maps.createMapControl ('help','?',(pagelang=='de'?'Legende anzeigen':'Show Legend'),null,20,3,3,cp.maps.NO_RADIOCONTROL,processUDCEvent);

  if (mapcopyright != '')
    mcrDiv = cp.maps.createMapCopyright(mapcopyright,'block');

  if (isCity || (objid != ''))
    cp.maps.addAdUnit();

  loadControl = cp.maps.createMapControl ('load',(pagelang == 'de'? 'Daten werden geladen ...' : 'Map data are loaded ...'),(pagelang=='de'?'Bitte warten':'Please wait'),'yellow',150,3,3,cp.maps.NO_RADIOCONTROL,processUDCEvent);
  loadControl.style.zIndex = "300";

  try {
    retrieve(1);
  }
  catch (ex) {}
}
