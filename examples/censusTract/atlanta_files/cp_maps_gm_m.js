var cp;cp||(cp={});cp.maps={};cp.maps.adUnitDiv=null;cp.maps.log=function(a){try{window.console&&window.console.log("cp.maps.log: "+a)}catch(b){}};cp.maps.setLang=function(a){"de"==a||"D"==a?this.lang="de":"en"==a||"E"==a?this.lang="en":null!=a&&cp.maps.log("Unsupported language "+a)};cp.maps.getLang=function(){return this.lang};
cp.maps.init=function(a,b,c,d,f,e,h,l,j){cp.maps.log("cp.maps.init: version 2013-09-02");var g=google.maps.MapTypeId.TERRAIN;"street"==b||"normal"==b?g=google.maps.MapTypeId.ROADMAP:"sat"==b&&(g=google.maps.MapTypeId.SATELLITE);b=new google.maps.LatLng(c,d);e.zoom=f;e.center=b;e.mapTypeId=g;this.mapElem=a;this.map=new google.maps.Map(a,e);this.mode=h;this.submode=[];this.visibleLayer="";this.vizMode=l;this.lang="en";this.setLang(j);this.svgSupport=window.SVGSVGElement?!0:!1;a=navigator.userAgent.toLowerCase();
this.isPad=0<=a.indexOf("ipad")||0<=a.indexOf("android")&&!a.match(/android.*mobile/);this.overlay=new google.maps.OverlayView;this.overlay.draw=function(){};this.overlay.setMap(this.map);return this.map};cp.maps.POPSYMB_MODE=1;cp.maps.POP_MODE=2;cp.maps.CHANGE_MODE=3;cp.maps.DENSITY_MODE=4;cp.maps.STATUS_MODE=5;cp.maps.AGGLO_MODE=11;cp.maps.setMode=function(a){this.mode=a};cp.maps.getMode=function(){return this.mode};cp.maps.POP_CIRC_SUBMODE=1;cp.maps.POP_BAR_SUBMODE=2;
cp.maps.CHANGE_NOSYMB_SUBMODE=0;cp.maps.CHANGE_SYMB_SUBMODE=1;cp.maps.setSubmode=function(a){this.submode[this.mode]=a};cp.maps.getSubmode=function(){return this.submode[this.mode]};cp.maps.visibleLayer="";cp.maps.setVisibileLayer=function(a){cp.maps.visibleLayer=a};cp.maps.getVisibleLayer=function(){return this.visibleLayer};cp.maps.isSvgSupported=function(){return this.svgSupport};cp.maps.runsOnPad=function(){return this.isPad};cp.maps.latLng2ContainerPixel=function(a){return this.overlay.getProjection().fromLatLngToContainerPixel(a)};
cp.maps.latLng2DivPixel=function(a){return this.overlay.getProjection().fromLatLngToDivPixel(a)};
cp.maps.addAdUnit=function(){null==this.adUnitDiv&&(""!=this.vizMode?this.log("No adUnit on mobile."):(this.adUnitDiv=document.createElement("div"),this.adUnit=new google.maps.adsense.AdUnit(this.adUnitDiv,{format:google.maps.adsense.AdFormat.VERTICAL_BANNER,position:google.maps.ControlPosition.RIGHT_CENTER,backgroundColor:"#f9f9f9",borderColor:"#aaaaaa",titleColor:"#0000cc",textColor:"#000000",urlColor:"#009900",map:this.map,visible:!0,publisherId:"ca-pub-7251478393613561",channelNumber:"3932030395"})))};
cp.maps.formatNum=function(a,b){var c=Math.abs(a),d=""+Math.floor(c),f=d.length,e="de"==this.lang?".":",";txt=1E3>c?d:1E6>c?d.substring(0,f-3)+e+d.substring(f-3):d.substring(0,f-6)+e+d.substring(f-6,f-3)+e+d.substring(f-3);0>a&&(txt="-"+txt);d=""+a;if("i"==b)return txt;c=d.indexOf(".");return 0>c?txt:"de"==this.lang?txt+","+d.substr(c+1):txt+d.substr(c)};cp.maps.radioControls=[];cp.maps.radioSelectors=[];cp.maps.NO_RADIOCONTROL=0;cp.maps.MODE_RADIOCONTROL=1;cp.maps.ADM_RADIOCONTROL=2;
cp.maps.START_HIGHTLIGHT="yellow";cp.maps.resetRadioControls=function(a){for(var b=0;b<this.radioControls.length;b++)this.radioControls[b].radioGroup==a&&this.resetControl(this.radioControls[b])};cp.maps.resetRadioSelectors=function(a){for(var b=0;b<this.radioSelectors.length;b++)if(this.radioSelectors[b].radioGroup==a)for(var c=0;c<this.radioSelectors[b].childElementCount;c++)this.radioSelectors[b].children[c].checked=!1};
cp.maps.resetControl=function(a){a.controlUI.className=a.controlUI.className.substr(0,a.controlUI.className.length-1)+"o";a.controlText.className="controlTextco";a.selected=!1;null!=a.selectControl&&(a.selectControl.style.display="none")};
cp.maps.highlightControl=function(a){a.radioGroup!=this.NO_RADIOCONTROL&&this.resetRadioControls(a.radioGroup);a.controlUI.className=a.controlUI.className.substr(0,a.controlUI.className.length-1)+"x";a.controlText.className="controlTextcx";a.selected=!0;null!=a.selectControl&&(a.selectControl.style.display="block")};cp.maps.enableControl=function(a,b){a.controlText.style.color=b?"#000":"#ccc"};cp.maps.controlIndex=1;
cp.maps.createMapControl=function(a,b,c,d,f,e,h,l,j){var g=document.createElement("div");g.className="control";g.id=a;g.index=cp.maps.controlIndex++;g.radioGroup=l;g.style.paddingLeft=e+"px";g.style.paddingRight=h+"px";var n=document.createElement("div"),m=null!=d?d==cp.maps.START_HIGHTLIGHT?"cs":"cx":"co";n.className="controlUI"+(0<e?"L":"")+(0<h?"R":"")+" "+m;n.title=c;n.style.height=this.isPad?"23px":"17px";g.selected=null!=d;0==e&&(n.style.borderLeftWidth="0px");this.isPad&&31>f&&(f=31);n.style.width=
f+"px";g.appendChild(n);g.controlUI=n;c=document.createElement("div");c.className="controlText"+m;c.style.padding=this.isPad?"3px 2px":"1px 2px";c.innerHTML=b;n.appendChild(c);g.controlText=c;google.maps.event.addDomListener(n,"click",function(b){j(a,b)});g.selectControl=null;map.controls[google.maps.ControlPosition.TOP_LEFT].push(g);l!=this.NO_RADIOCONTROL&&null!=l&&cp.maps.radioControls.push(g);return g};
cp.maps.appendMapControlStatus=function(a,b,c,d,f){var e=document.createElement("div");e.className="controlUIselect";e.style.height=c+"px";e.radioGroup=d;a.appendChild(e);a.selectControl=e;e.innerHTML=b;e.style.display="none";google.maps.event.addDomListener(e,"change",function(b){f(a.id,b)});null!=d&&cp.maps.radioSelectors.push(e);return e};
cp.maps.createMapCopyright=function(a,b){mcrDiv=document.createElement("div");mcrDiv.className="mcr";mcrDiv.innerHTML=a;mcrDiv.index=3;mcrDiv.style.display=b;map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(mcrDiv);return mcrDiv};cp.maps.legendDiv=null;
cp.maps.showLegend=function(a,b,c){this.legendDiv=a;var d="de"==this.lang?"undefiniert":"undefined";a='<table id="helptab">'+("<tr><th>"+("de"==this.lang?"Farbe":"Color")+"</th><th>");if(cp.maps.mode==this.DENSITY_MODE){a+=("de"==this.lang?"Dichte":"Density")+"</th></tr>";c=[0,0.1,1,5,10,25,50,100,250,500,1E3,2500,5E3,1E4,25E3,5E4,75E3];for(var f="de"==this.lang?" Einw./km\u00b2":" pop./km\u00b2",e=0;e<c.length;e++)a+='<tr><td style="background-color:#'+cp.maps.Color.getDensityColor(c[e])+'"></td><td>'+
this.formatNum(c[e])+f+"</td></tr>";a+='<tr><td style="background-color:#'+cp.maps.Color.getDensityColor(null)+'"></td><td>'+d+"</td></tr>"}else if(cp.maps.mode==this.CHANGE_MODE){a+=("de"==this.lang?"\u00c4nderung":"Change")+"</th></tr>";c=[-5,-2,-1.5,-1,-0.5,0,1,1.5,2,2.5,3,4,5,10,15,20,30];f="de"==this.lang?"% / Jahr":"% / year";for(e=0;e<c.length;e++)a+='<tr><td style="background-color:#'+cp.maps.Color.getChangeColor(c[e])+'"></td><td>'+this.formatNum(c[e])+f+"</td></tr>";a+='<tr><td style="background-color:#'+
cp.maps.Color.getChangeColor(null)+'"></td><td>'+d+"</td></tr>"}else if(cp.maps.mode==this.POPSYMB_MODE){a+=("de"==this.lang?"Einwohner":"Population")+"</th></tr>";c=void 0!=b?[1E6,5E6]:[1,1E3,5E3,1E4,2E4,5E4,1E5,25E4,5E5,1E6,5E6];f="de"==this.lang?" Einw.":" pop.";for(e=0;e<c.length;e++)a+='<tr><td style="text-align:center">'+cp.maps.Symbol.getPopSymbSVG(c[e],11,cp.maps.Symbol.getSizeOfSymbol(c[e])).svg+'</td><td style="padding-top:4px">\u2265 '+this.formatNum(c[e])+f+"</td></tr>";void 0==b&&(a+=
'<tr><td style="text-align:center"><img src="'+this.Marker.getPopImgName(-1,!0)+'" /></td><td style="padding-top:4px">'+d+"</td></tr>")}else if(cp.maps.mode==this.POP_MODE){a+=("de"==this.lang?"Einwohner":"Population")+"</th></tr>";c=[1,1E3,5E3,1E4,2E4,5E4,1E5,25E4,5E5,1E6,5E6,25E6];f="de"==this.lang?" Einw.":" pop.";for(e=0;e<c.length;e++)a+='<tr><td style="background-color:#'+cp.maps.Color.getPopColor(c[e])+'"></td><td>'+this.formatNum(c[e])+f+"</td></tr>";a+='<tr><td style="background-color:#'+
cp.maps.Color.getChangeColor(null)+'"></td><td>'+d+"</td></tr>"}else{a+=b+"</th></tr>";for(e=0;e<c.length;e++)a+='<tr><td style="background-color:#'+cp.maps.Color.statusColors.getColor(e).css()+'"></td><td style="text-align:left">'+c[e]+"</td></tr>";a+='<tr><td style="background-color:#'+cp.maps.Color.statusColors.getColor(null).css()+'"></td><td style="text-align:left">'+d+"</td></tr>"}b=window.innerWidth-230;$(this.legendDiv).html(a+"</table>");$(this.legendDiv).css("visibility","visible");$("#helptab").css("visibility",
"visible");$(this.legendDiv).is(":data(dialog)")?$(this.legendDiv).dialog("open"):$(this.legendDiv).dialog({width:220,height:470,title:"de"==this.lang?"Legende":"Legend",position:[b,100]})};cp.maps.hideLegend=function(){null!=this.legendDiv&&$(this.legendDiv).dialog("close")};cp.maps.Color=function(a,b,c){this.r=a;this.g=b;this.b=c};cp.maps.Color.prototype.css=function(){return cp.maps.Color.dec2hex(this.r)+""+cp.maps.Color.dec2hex(this.g)+""+cp.maps.Color.dec2hex(this.b)};
cp.maps.Color.dec2hex=function(a){return"0123456789ABCDEF".charAt(Math.floor(a/16)%16)+"0123456789ABCDEF".charAt(a%16)};cp.maps.Color.hsv2rgb=function(a,b){a%=360;var c=Math.floor(a/60),d=a/60-c,f=0*b,e=b*(1-1*d),d=b*(1-1*(1-d)),h=0,l=0,j=0;0==c&&(h=b,l=d,j=f);1==c&&(h=e,l=b,j=f);2==c&&(h=f,l=b,j=d);3==c&&(h=f,l=e,j=b);4==c&&(h=d,l=f,j=b);5==c&&(h=b,l=f,j=e);return(new cp.maps.Color(Math.floor(255*h),Math.floor(255*l),Math.floor(255*j))).css()};
cp.maps.Color.getPopColor=function(a){return 25E6<=a?"c1d":5E6<=a?"e2f":1E6<=a?"e18":5E5<=a?"f01040":25E4<=a?"fa0810":1E5<=a?"f00":5E4<=a?"ffa500":2E4<=a?"fc2":1E4<=a?"fe7":5E3<=a?"ffa":1E3<=a?"ffd":"fff"};cp.maps.Color.getDensityColor=function(a){if(null==a)return"ccc";if(0==a)return"fff";var b=0.98;a=Math.sqrt(Math.sqrt(a));a=4>a?18*a:8>a?72+12*(a-4):120+9*(a-8);210<a&&(a=210);50>a&&(b-=(50-a)/50);170<a&&(b+=(170-a)/50);return this.hsv2rgb(Math.floor(490-a),b)};
cp.maps.Color.getChangeColor=function(a){if(null==a)return"ccc";0<=a?(a=Math.sqrt(a),a=3>a?50*a+130:30*(a-3)+280,340<a&&(a=340)):(a=60*-Math.sqrt(-a)+130,0>a&&(a=0));return this.hsv2rgb(Math.floor(620-a),0.98)};
cp.maps.Color.statusColors={cols:[new cp.maps.Color(230,171,2),new cp.maps.Color(51,160,44),new cp.maps.Color(227,26,28),new cp.maps.Color(255,255,51),new cp.maps.Color(31,120,180),new cp.maps.Color(231,41,138),new cp.maps.Color(178,223,138),new cp.maps.Color(106,61,154),new cp.maps.Color(202,178,214),new cp.maps.Color(251,154,153),new cp.maps.Color(102,102,102),new cp.maps.Color(255,127,47),new cp.maps.Color(166,206,227),new cp.maps.Color(251,154,153)],addColor:function(a){for(;a>this.cols.length;)this.cols.push(new cp.maps.Color(255*
Math.random(),255*Math.random(),25*Math.random()))},getColor:function(a){if(null==a)return new cp.maps.Color(204,204,204);try{return this.cols[a]}catch(b){return new cp.maps.Color(204,204,204)}}};
cp.maps.Color.setAreaColor=function(a){var b=cp.maps.map.getMapTypeId();a.strokeColor="#ff0000";a.strokeWeight=5;a.strokeOpacity=0.35;b==google.maps.MapTypeId.SATELLITE?(a.fillColor="#ffffff",a.fillOpacity=0.4):b==google.maps.MapTypeId.TERRAIN?(a.fillColor="#ff00ff",a.fillOpacity=0.1):(a.fillColor="#ffff00",a.fillOpacity=0.2);return a};cp.maps.Style={};cp.maps.Style.maxSize=20;cp.maps.Style.scaleDependent=!0;cp.maps.Style.objNum=30;cp.maps.Style.maxVal=1E5;cp.maps.Style.minScaleZoom=7;
cp.maps.Style.maxScaleZoom=14;cp.maps.Style.setSizeHints=function(a,b,c,d){cp.maps.Style.maxSize=a;cp.maps.Style.scaleDependent=b;cp.maps.Style.objNum=c;void 0!=d&&(cp.maps.Style.maxVal=d)};cp.maps.Style.scaleSize=function(a){if(!cp.maps.Style.scaleDependent)return a;var b=cp.maps.map.getZoom();b<cp.maps.Style.minScaleZoom&&(b=cp.maps.Style.minScaleZoom);b>cp.maps.Style.maxScaleZoom&&(b=cp.maps.Style.maxScaleZoom);return a*b/cp.maps.Style.maxScaleZoom};
cp.maps.Style.scaleSymbolSize=function(a,b){if(!cp.maps.Style.scaleDependent)return a;var c=cp.maps.map.getZoom(),d=cp.maps.Style.minScaleZoom,f=d*Math.pow(b,cp.maps.Style.maxScaleZoom-cp.maps.Style.minScaleZoom);c>=cp.maps.Style.maxScaleZoom?d=f:c>cp.maps.Style.minScaleZoom&&(d*=Math.pow(b,c-cp.maps.Style.minScaleZoom));return 2*a*d/f};cp.maps.Style.getBarWidth=function(){return 10>=cp.maps.Style.objNum?40:40>=cp.maps.Style.objNum?30:80>=cp.maps.Style.objNum?25:160>=cp.maps.Style.objNum?20:15};
cp.maps.Marker=function(a,b,c,d){this.layer=a;this.setPosition(new google.maps.LatLng(b,c));this.setVisible(!1);this.minZoom=0;this.radius=10;this.label=null;this.selected=!1;this.setMap(cp.maps.map);this.infowindow=new google.maps.InfoWindow({disableAutoPan:!0,position:this.getPosition()});this.symbol=cp.maps.isSvgSupported()?new cp.maps.Symbol(this):null;var f=this;null!=d&&void 0!=d&&google.maps.event.addListener(f,"click",function(){d(f,!0)});google.maps.Marker.call(this)};
cp.maps.Marker.prototype=new google.maps.Marker;cp.maps.Marker.prototype.getLayer=function(){return this.layer};cp.maps.Marker.prototype.getLabel=function(){return this.label};cp.maps.Marker.prototype.setLabel=function(a){this.label=a};cp.maps.Marker.prototype.getMinZoom=function(){return this.minZoom};cp.maps.Marker.prototype.setMinZoom=function(a){this.minZoom=a};
cp.maps.Marker.prototype.getBounds=function(){var a=this.getPosition();return 0!=a.lat()&&0!=a.lng()?new google.maps.LatLngBounds(a):new google.maps.LatLngBounds};cp.maps.Marker.prototype.setSelected=function(a){this.selected=a;null!=this.getLabel()&&this.getLabel().drawAsPositioned()};cp.maps.Marker.prototype.click=function(){google.maps.event.trigger(this,"click")};
cp.maps.Marker.getPopImgName=function(a,b){var c="http://www.bymap.org/";return c=cp.maps.svgSupport&&!0!=b?c+"Dx.gif":5E6<=a?c+"G5000.gif":1E6<=a?c+"G1000.gif":5E5<=a?c+"G500.gif":25E4<=a?c+"G250.gif":1E5<=a?c+"G100.gif":5E4<=a?c+"G50.gif":2E4<=a?c+"G20.gif":1E4<=a?c+"G10.gif":5E3<=a?c+"G5.gif":1E3<=a?c+"G1.gif":1<=a?c+"G0.gif":c+"Gx.gif"};
cp.maps.Marker.getDensityImgName=function(a){var b="http://www.bymap.org/";return b=cp.maps.svgSupport?b+"Dx.gif":null==a?b+"D0.gif":0==a?b+"D0.gif":8E3<=a?b+"D1.gif":4E3<=a?b+"D2.gif":2E3<=a?b+"D3.gif":1E3<=a?b+"D4.gif":500<=a?b+"D5.gif":250<=a?b+"D6.gif":125<=a?b+"D7.gif":b+"D8.gif"};cp.maps.Marker.getChangeImgName=function(a){var b="http://www.bymap.org/";return b=cp.maps.svgSupport?b+"Dx.gif":null==a?b+"C0.gif":0.75<a?b+"C1.gif":0.2<a?b+"C2.gif":-0.15<a?b+"C3.gif":-0.5<a?b+"C4.gif":b+"C5.gif"};
cp.maps.Marker.getStatusImgName=function(){var a="http://www.bymap.org/";return a=cp.maps.svgSupport?a+"Dx.gif":a+"D0.gif"};cp.maps.Marker.getImgName=function(a){return cp.maps.mode==cp.maps.POPSYMB_MODE?this.getPopImgName(a):cp.maps.mode==cp.maps.POP_MODE?this.getStatusImgName(a):cp.maps.mode==cp.maps.DENSITY_MODE?this.getDensityImgName(a):cp.maps.mode==cp.maps.CHANGE_MODE?this.getChangeImgName(a):cp.maps.mode==cp.maps.STATUS_MODE?this.getStatusImgName(a):null};
cp.maps.Marker.prototype.setData=function(a,b){var c=cp.maps.Marker.getImgName(a);if(null!=c){var d=20,f=20;0==this.getPosition().lat()&&0==this.getPosition().lng()&&(f=d=1);this.setIcon(new google.maps.MarkerImage(c,new google.maps.Size(d,f),new google.maps.Point(0,0),new google.maps.Point(d/2,f/2)))}null!=this.symbol&&this.symbol.setData(a,b)};cp.maps.Marker.prototype.setVisible=function(a){google.maps.Marker.prototype.setVisible.call(this,a);null!=this.symbol&&this.symbol.draw()};
cp.maps.Marker.prototype.setInfoContent=function(a){this.infowindow.setContent(a)};cp.maps.Marker.prototype.getInfoWindow=function(){return this.infowindow};cp.maps.Marker.prototype.showInfoWindow=function(){this.infowindow.open(cp.maps.map,this)};cp.maps.FeatureArray=function(){this.bounds=new google.maps.LatLngBounds;Array.call(this)};cp.maps.FeatureArray.prototype=[];cp.maps.FeatureArray.prototype.add=function(a){this.bounds.union(a.getBounds());this.push(a)};
cp.maps.FeatureArray.prototype.getBounds=function(){return this.bounds};cp.maps.FeatureArray.prototype.drawAll=function(){if(null!=cp.maps.map)for(var a=0;a<this.length;a++)this[a].draw()};
cp.maps.FeatureArray.prototype.drawMostRelevant=function(a){try{if(null!=cp.maps.map){var b=cp.maps.map.getBounds();try{if(!b.intersects(this.getBounds()))return;var c=Math.max(b.getSouthWest().lng(),this.getBounds().getSouthWest().lng()),d=Math.min(b.getNorthEast().lng(),this.getBounds().getNorthEast().lng()),f=Math.max(b.getSouthWest().lat(),this.getBounds().getSouthWest().lat()),e=Math.min(b.getNorthEast().lat(),this.getBounds().getNorthEast().lat()),h=b.toSpan(),l=h.lng()*h.lat(),c=(d-c)*(e-f),
j=cp.maps.map.getMapTypeId()==google.maps.MapTypeId.SATELLITE?1:1.7,g=Math.round(c/l*a*j);3>g&&(g=3)}catch(n){g=a/2}var m=new cp.maps.FeatureArray;a=[];for(var k=this.length-1;0<=k;k--)m.length<g&&(null==b||b.contains(this[k].getPosition()))?m.push(this[k]):a.push(this[k]);for(k=0;k<a.length;k++)a[k].getVisible()&&a[k].setVisible(!1),null!=a[k].getLabel()&&null!=a[k].getLabel().getMap()&&a[k].getLabel().setMap(null),null!=a[k].symbol&&a[k].symbol.draw();for(k=0;k<m.length;k++)null!=m[k].getLabel()&&
m[k].getLabel().resetAlign();for(k=0;k<m.length;k++){var q=m[k];q.getVisible()||q.setVisible(!0);null!=q.getLabel()&&(null==q.getLabel().getMap()&&q.getLabel().setMap(cp.maps.map),q.getLabel().draw(m));null!=q.symbol&&q.symbol.draw()}}}catch(r){cp.maps.log(" drawMostRelevant: "+r)}};cp.maps.Symbol=function(a){this.feature=a;this.pos=a.getPosition();this.pop=this.value=0;this.setMap(cp.maps.map)};cp.maps.Symbol.prototype=new google.maps.OverlayView;
cp.maps.Symbol.prototype.onAdd=function(){var a=document.createElement("div");a.style.position="absolute";this.div_=a;this.div_.style.height="26px";this.div_.style.width="26px";this.div_.style.zIndex="200";this.div_.style.visibility="hidden";this.getPanes().overlayLayer.appendChild(this.div_)};cp.maps.Symbol.prototype.setData=function(a,b){this.value=a;this.pop=b};cp.maps.Symbol.prototype.onRemove=function(){null!=this.div_&&this.div_.parentNode.removeChild(this.div_)};
cp.maps.Symbol.getSizeOfSymbol=function(a){return size=5E6<=a?1:1E6<=a?0.95:5E5<=a?0.9:25E4<=a?0.85:1E5<=a?0.8:5E4<=a?0.75:2E4<=a?0.7:1E4<=a?0.65:5E3<=a?0.6:1E3<=a?0.55:1<=a?0.5:0.4};cp.maps.Symbol.computeChangeRotation=function(a){0<a?(a=30*Math.sqrt(a),90<a&&(a=90)):(a=35*-Math.sqrt(-a),-90>a&&(a=-90));return-a};
cp.maps.Symbol.getSVGCircle=function(a,b,c,d,f,e){var h=0.25*b,l=2*a;f&&(e+='<ellipse cx="'+a+'" cy="'+a+'" rx="'+h+'" ry="'+h+'" style="stroke:#000; fill:#000" />');b-=d/2;return'<svg xmlns="http://www.w3.org/2000/svg" width="'+l+'" height="'+l+'"><ellipse cx="'+a+'" cy="'+a+'" rx="'+b+'" ry="'+b+'" style="stroke:#000; fill:#'+c+"; stroke-width:"+d+'" />'+e+"</svg>"};
cp.maps.Symbol.getSVGRect=function(a,b,c,d,f){var e=0.2*a,h=2*a,l="";f&&(l='<rect x="'+(a-e)+'" y="'+(a-e)+'" width="'+2*e+'" height="'+2*e+'" style="stroke:#000; fill:#000;" />');return'<svg xmlns="http://www.w3.org/2000/svg" width="'+h+'" height="'+h+'"><rect x="'+(a-b)+'" y="'+(a-b)+'" width="'+2*b+'" height="'+2*b+'" style="stroke:#000; fill:#'+c+"; stroke-width:"+d+'" />'+l+"</svg>"};
cp.maps.Symbol.getSVGBar=function(a,b,c,d){var f=a+2*d;52>f&&(f=52);return'<svg xmlns="http://www.w3.org/2000/svg" width="'+(4*d+b)+'" height="'+f+'"><rect x="'+2*d+'" y="'+(f-a)/2+'" width="'+b+'" height="'+a+'" style="stroke:#000; fill:#'+c+"; stroke-width:"+d+'" /><line x1="'+d+'" y1="'+(f+a)/2+'" x2="'+(b+3*d)+'" y2="'+(f+a)/2+'" style="stroke:#000; fill:#000; stroke-width:'+3*d+'" /></svg>'};
cp.maps.Symbol.getPopSymbSVG=function(a,b,c){return{svg:5E5<=a||0>=a||null==a?this.getSVGRect(b,0.9*b*c,cp.maps.Color.getPopColor(a),0.15*b*c,1E6<=a):this.getSVGCircle(b,0.925*b*c,cp.maps.Color.getPopColor(a),0.15*b*c,25E4<=a||1E5>a&&5E4<=a,""),xoff:-b,yoff:-b}};
cp.maps.Symbol.getPopSVG=function(a,b,c){if(cp.maps.getSubmode()==cp.maps.POP_BAR_SUBMODE){b=cp.maps.Style.getBarWidth();c=0.5;null!=a&&0<a&&(c+=100*(a/cp.maps.Style.maxVal));b=cp.maps.Style.scaleSymbolSize(b,1.3);c=cp.maps.Style.scaleSymbolSize(c,1.3);var d=c/2+0.5;26>d&&(d=26);return{svg:this.getSVGBar(c,b,cp.maps.Color.getPopColor(a),0.5),xoff:-b/2-0.5,yoff:-d}}c=0.3;null!=a&&0<a&&(c+=Math.sqrt(a/4E5));c*=b;b=c+0.3*b;26>b&&(b=26);return{svg:this.getSVGCircle(b,c,cp.maps.Color.getPopColor(a),0.1*
c,!1,""),xoff:-b,yoff:-b}};cp.maps.Symbol.getDensitySVG=function(a,b,c){return{svg:this.getSVGCircle(b,0.925*b*c,cp.maps.Color.getDensityColor(a),0.15*b*c,!1,""),xoff:-b,yoff:-b}};
cp.maps.Symbol.getChangeSVG=function(a,b,c){c*=b;26>b&&(b=26);var d="";if(null!=a)var d=0.5*c,f=0.25*c,d='<path d="M -'+d+" "+f+" l "+d+" 0 l 0 "+f+" l "+d+" -"+d+" l -"+d+" -"+d+" l 0 "+f+" l -"+d+' 0 Z" style="stroke:#000000; fill:#aaaaaa; fill-opacity:.5" transform = "translate('+b+" "+b+") rotate("+cp.maps.Symbol.computeChangeRotation(a)+')" />';return{svg:this.getSVGCircle(b,0.95*c,cp.maps.Color.getChangeColor(a),0.1*c,!1,d),xoff:-b,yoff:-b}};
cp.maps.Symbol.getStatusSVG=function(a,b,c){return{svg:this.getSVGCircle(b,0.925*b*c,cp.maps.Color.statusColors.getColor(a).css(),0.15*b*c,!1,""),xoff:-b,yoff:-b}};
cp.maps.Symbol.prototype.draw=function(){if(!(0==this.pos.lat()&&0==this.pos.lng())&&null!=this.div_){var a=this.feature.getVisible()?"visible":"hidden";a!=this.div_.style.visibility&&(this.div_.style.visibility=a);if("hidden"!=this.div_.style.visibility){var a=cp.maps.Style.scaleSymbolSize(cp.maps.Style.maxSize,1.25),b=cp.maps.Symbol.getSizeOfSymbol(this.pop);this.feature.radius=a*b;a=cp.maps.mode==cp.maps.DENSITY_MODE?cp.maps.Symbol.getDensitySVG(this.value,a,b):cp.maps.mode==cp.maps.CHANGE_MODE?
cp.maps.Symbol.getChangeSVG(this.value,a,b):cp.maps.mode==cp.maps.POPSYMB_MODE?cp.maps.Symbol.getPopSymbSVG(this.value,a,b):cp.maps.mode==cp.maps.POP_MODE?cp.maps.Symbol.getPopSVG(this.value,a,b):cp.maps.Symbol.getStatusSVG(this.value,a,b);this.div_.innerHTML=a.svg;b=cp.maps.latLng2DivPixel(this.pos);this.div_.style.width=Math.round(Math.abs(2*a.xoff))+"px";this.div_.style.height=Math.round(Math.abs(2*a.yoff))+"px";this.div_.style.left=Math.round(b.x+a.xoff)+"px";this.div_.style.top=Math.round(b.y+
a.yoff)+"px"}}};cp.maps.Label=function(a,b,c){this.feature=a;a.label=this;this.pos=a.getPosition();this.text=b;this.pxheight=c;this.color_="#fff";this.width=0.667*c*b.length;this.div_=this.halign=this.valign=null};cp.maps.Label.prototype=new google.maps.OverlayView;cp.maps.Label.prototype.resetAlign=function(){this.halign=this.valign=null};cp.maps.Label.prototype.setAlign=function(a,b){this.valign=a;this.halign=b};
cp.maps.Label.prototype.setSingleAlign=function(a){a=null==a||""==a?"E":a.replace("O","E");var b=a.charAt(0);this.valign="N"==b||"S"==b?b:"C";b=a.charAt(a.length-1);this.halign="E"==a||"W"==a?a:"E"==b||"W"==b?"C"+b:"C"};cp.maps.Label.prototype.setColor=function(a){this.color_=a};
cp.maps.Label.prototype.onAdd=function(){var a=document.createElement("div"),b=document.createTextNode(this.text);a.appendChild(b);a.style.position="absolute";this.div_=a;this.div_.style.fontWeight="bold";this.div_.style.fontFamily="Calibri, Arial, helvetica, sans-serif";b=cp.maps.Style.scaleSize(this.pxheight);this.div_.style.fontSize=Math.round(b)+"px";this.div_.style.whiteSpace="nowrap";this.getPanes().overlayLayer.appendChild(a)};
cp.maps.Label.prototype.onRemove=function(){this.halign=this.valign=null;null!=this.div_&&this.div_.parentNode.removeChild(this.div_);this.div_=null};cp.maps.Label.DRAW_ALWAYS=0;cp.maps.Label.DRAW_SATELITE_ONLY=1;cp.maps.Label.drawMode=cp.maps.Label.DRAW_SATELITE_ONLY;cp.maps.Label.setDrawMode=function(a){cp.maps.Label.drawMode=a};
cp.maps.Label.prototype.draw=function(a){if(null!=this.div_)if(0==this.pos.lat()&&0==this.pos.lng())this.div_.style.visibility="hidden";else{var b=cp.maps.Label.drawMode==cp.maps.Label.DRAW_ALWAYS||cp.maps.map.getMapTypeId()==google.maps.MapTypeId.SATELLITE?"visible":"hidden";this.feature.getVisible()||(b="hidden");b!=this.div_.style.visibility&&(this.div_.style.visibility=b);if("hidden"!=b){b=cp.maps.Style.scaleSize(this.pxheight);this.div_.style.fontSize=Math.round(b)+"px";var c=cp.maps.latLng2DivPixel(this.pos),
d=[0,0,0,0],f=this.width=this.div_.clientWidth,e=this.feature.radius+b/4;if(void 0!=a){for(var h=0;h<a.length;h++)if(a[h].label!=this){var l=a[h].label.width,j=cp.maps.latLng2DivPixel(a[h].getPosition());if(Math.abs(c.y-j.y)<2*b){var g="W"==a[h].label.halign?l:"C"==a[h].label.halign?l/2:0;j.x>c.x&&j.x-f-g<c.x&&(d[0]=d[0]+f+g-Math.abs(j.x-c.x));g="E"==a[h].label.halign?l:"C"==a[h].label.halign?l/2:0;j.x<c.x&&j.x+f+g>c.x&&(d[3]=d[3]+f+g-Math.abs(j.x-c.x))}Math.abs(j.x-c.x)<f/2&&Math.abs(j.y-c.y)<2*
e+2*b&&(j.y<c.y&&(d[1]=d[1]+f-Math.abs(j.x-c.x)),j.y>c.y&&(d[2]=d[2]+f-Math.abs(j.x-c.x)))}d[0]<=d[1]&&d[0]<=d[2]&&d[0]<=d[3]?(this.halign="E",this.valign="C"):d[1]<=d[2]&&d[1]<=d[3]?(this.halign="C",this.valign="N"):d[2]<=d[3]?(this.halign="C",this.valign="S"):(this.halign="W",this.valign="C")}this.drawAsPositioned()}}};
cp.maps.Label.prototype.drawAsPositioned=function(){if(!(null==this.div_||"hidden"==this.div_.style.visibility)){var a=cp.maps.Style.scaleSize(this.pxheight);this.div_.style.color=this.feature.selected?"#f00":this.color_;var b=cp.maps.latLng2DivPixel(this.pos),c=this.width,d=this.feature.radius+a/4;"E"==this.halign?(this.div_.style.left=Math.round(b.x+d)+"px",this.div_.style.textAlign="left"):"CE"==this.halign?(this.div_.style.left=Math.round(b.x)+"px",this.div_.style.textAlign="left"):"C"==this.halign?
(this.div_.style.left=Math.round(b.x-c/2)+"px",this.div_.style.textAlign="center"):(this.div_.style.left="CW"==this.halign?Math.round(b.x-c)+"px":Math.round(b.x-d-c)+"px",this.div_.style.textAlign="right");this.div_.style.top="C"==this.valign?Math.round(b.y-a/2)+"px":"N"==this.valign?Math.round(b.y-d-a)+"px":Math.round(b.y+d-0.2*a)+"px";this.div_.style.width=Math.round(c+2)+"px"}};cp.maps.Point={};
cp.maps.Point.uncmpr=function(a,b,c,d){var f=null,e=b.indexOf("#");if(0>e)if(e=b.indexOf("$"),0>e)if(e=b.indexOf("%"),0>e){e=b.indexOf("&");if(0>e){cp.log("cp.maps.Point.uncmpr: "+b);return}f=[-1,-1]}else f=[-1,1];else f=[1,-1];else f=[1,1];a.push(cp.maps.Point.uncmprC(b.substr(0,e),c,d)*f[0]);a.push(cp.maps.Point.uncmprC(b.substr(e+1),c,d)*f[1])};cp.maps.Point.uncmprC=function(a,b,c){for(var d=0,f,e=0;e<a.length;e++)f=a.charCodeAt(e),40==f&&(f=92),41==f&&(f=63),d=d*c+f-b;return d};
cp.maps.Polygon=function(a,b,c,d){this.layer=a;this.symbol=this.label=null;this.minZoom=0;var f=[],e=-1;a=new google.maps.LatLngBounds;for(var h=null,l=0;l<b.length;l++){var j=[],g=b[l];if(!(g instanceof Array))for(var n=g.split("!"),g=[],m=0;m<n.length;m++)cp.maps.Point.uncmpr(g,n[m],47,80);var n=g[0],k=g[1],q=new google.maps.LatLng(k/1E5,n/1E5);j.push();a.extend(q);for(var r=n/1E5,s=k/1E5,m=2;m<g.length;m+=2)n+=g[m],k+=g[m+1],r+=n/1E5,s+=k/1E5,q=new google.maps.LatLng(k/1E5,n/1E5),j.push(q),a.extend(q);
g.length>e&&(e=g.length,h=new google.maps.LatLng(s/(e/2),r/(e/2)));f.push(j)}b={map:cp.maps.map,paths:f,visible:!0};this.bounds=a;this.position=0==c&&0==d?h:new google.maps.LatLng(c,d);this.toolTip=this.infowindow=null;var p=this;google.maps.event.addListener(p,"mouseover",function(a){null!=p.toolTip&&(a=cp.maps.latLng2ContainerPixel(a.latLng),p.toolTip.style.display="block",p.toolTip.style.top=Math.round(a.y-p.toolTip.offsetHeight/2)+"px",p.toolTip.style.left=Math.round(a.x+10)+"px")});google.maps.event.addListener(p,
"mousemove",function(a){null!=p.toolTip&&(a=cp.maps.latLng2ContainerPixel(a.latLng),p.toolTip.style.top=Math.round(a.y-p.toolTip.offsetHeight/2)+"px",p.toolTip.style.left=Math.round(a.x+10)+"px")});google.maps.event.addListener(p,"mouseout",function(){null!=p.toolTip&&(p.toolTip.style.display="none")});google.maps.Polygon.call(this,b)};cp.maps.Polygon.prototype=new google.maps.Polygon;cp.maps.Polygon.prototype.getLayer=function(){return this.layer};cp.maps.Polygon.prototype.getLabel=function(){return this.label};
cp.maps.Polygon.prototype.setLabel=function(a){this.label=a};cp.maps.Polygon.prototype.getMinZoom=function(){return this.minZoom};cp.maps.Polygon.prototype.setMinZoom=function(a){this.minZoom=a};cp.maps.Polygon.prototype.getPosition=function(){return this.position};cp.maps.Polygon.prototype.getBounds=function(){return this.bounds};
cp.maps.Polygon.prototype.setToolTip=function(a){null==a?null!=this.toolTip&&(this.toolTip.style.display="none",this.toolTip=null):(this.toolTip=document.createElement("div"),this.toolTip.setAttribute("class","tooltip"),this.toolTip.innerHTML=a,this.toolTip.style.display="none",cp.maps.mapElem.appendChild(this.toolTip))};
cp.maps.Polygon.prototype.setClickCallback=function(a){var b=this;b.showInfo=a;google.maps.event.addListener(b,"click",function(){null!=b.toolTip&&(b.toolTip.style.display="none");b.showInfo(b)})};cp.maps.Polygon.prototype.setInfoContent=function(a){null==this.infowindow&&(this.infowindow=new google.maps.InfoWindow);this.infowindow.setContent(a)};cp.maps.Polygon.prototype.getInfoWindow=function(){return this.infowindow};
cp.maps.Polygon.prototype.showInfoWindow=function(){null!=this.infowindow&&this.infowindow.open(cp.maps.map,this)};cp.maps.Polygon.prototype.setData=function(a,b){this.symbol&&this.symbol.setData(a,b)};cp.maps.Polygon.prototype.click=function(){null!=this.toolTip&&(this.toolTip.style.display="none");this.showInfo(this)};cp.maps.PolSymbol=function(a){this.feature=a;a.symbol=this;this.pos=a.getPosition();this.pop=this.value=0;this.setMap(cp.maps.map)};cp.maps.PolSymbol.prototype=new google.maps.OverlayView;
cp.maps.PolSymbol.prototype.onAdd=function(){var a=document.createElement("div");a.style.position="absolute";this.div_=a;this.div_.style.height="26px";this.div_.style.width="26px";this.div_.style.zIndex="200";this.div_.style.visibility="hidden";this.getPanes().overlayLayer.appendChild(this.div_)};cp.maps.PolSymbol.prototype.onRemove=function(){null!=this.div_&&this.div_.parentNode.removeChild(this.div_)};cp.maps.PolSymbol.prototype.setData=function(a,b){this.value=a;this.pop=b};
cp.maps.PolSymbol.prototype.getBounds=function(){return this.feature.getBounds()};
cp.maps.PolSymbol.prototype.draw=function(){if(!(0==this.pos.lat()&&0==this.pos.lng())&&null!=this.div_&&cp.maps.mode!=cp.maps.AGGLO_MODE)if(cp.maps.mode==cp.maps.DENSITY_MODE||cp.maps.mode==cp.maps.STATUS_MODE||cp.maps.mode==cp.maps.CHANGE_MODE&&cp.maps.getSubmode()!=cp.maps.CHANGE_SYMB_SUBMODE||cp.maps.visibleLayer!=this.feature.getLayer())this.div_.style.visibility="hidden";else{this.div_.style.visibility="visible";var a=cp.maps.Symbol.getSizeOfSymbol(this.pop);if(cp.maps.mode==cp.maps.CHANGE_MODE)a=
cp.maps.Symbol.getChangeSVG(this.value,1.2*cp.maps.Style.scaleSize(cp.maps.Style.maxSize),a);else if(cp.maps.mode==cp.maps.POP_MODE)a=cp.maps.Symbol.getPopSVG(this.value,cp.maps.Style.scaleSymbolSize(cp.maps.Style.maxSize,1.3),a);else{cp.maps.log("PolSymbol.draw does not support mode: "+cp.maps.mode);return}this.div_.innerHTML=a.svg;this.div_.style.width=Math.round(Math.abs(2*a.xoff))+"px";this.div_.style.height=Math.round(Math.abs(2*a.yoff))+"px";var b=cp.maps.latLng2DivPixel(this.pos);this.div_.style.left=
Math.round(b.x+a.xoff)+"px";this.div_.style.top=Math.round(b.y+a.yoff)+"px"}};