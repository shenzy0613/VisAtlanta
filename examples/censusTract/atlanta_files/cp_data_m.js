var cp;cp||(cp={});cp.log=function(a){try{window.console&&window.console.log("cp.log: "+a)}catch(b){}};cp.log("cp.data: version 2013-09-07");cp.init=function(a,b){cp.setLang(a);void 0!=b&&cp.setVizMode(b)};cp.LANG_DE="de";cp.LANG_EN="en";cp.VIZMODE_DESKTOP="";cp.VIZMODE_MOBIPORTRAIT="320";cp.VIZMODE_MOBILANDSCAPE="480";cp.lang=cp.LANG_EN;cp.vizMode=cp.VIZMODE_DESKTOP;
cp.determineVizModeInHead=function(){try{var a=navigator.userAgent.toLowerCase();640>=screen.width||a.match(/android.*mobile/)||0<=a.indexOf("iphone")||0<=a.indexOf("ipod")||0<=a.indexOf("windows phone")||0<=a.indexOf("opera mobi")||0<=a.indexOf("blackberry")||0<=a.indexOf("symbianos")?(cp.vizMode=window.innerWidth<1.1*window.innerHeight?cp.VIZMODE_MOBIPORTRAIT:cp.VIZMODE_MOBILANDSCAPE,document.writeln('<meta name="viewport" content="width='+cp.vizMode+',initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0">'),
document.writeln('<meta name="apple-touch-icon" content="apple-touch-icon.png">'),document.writeln('<meta name="apple-mobile-web-app-capable" content="yes">')):cp.vizMode=cp.VIZMODE_DESKTOP;document.writeln('<meta name="format-detection" content="telephone=no">')}catch(b){cp.log("cp.determineVizModeInHead: "+b),cp.vizMode=cp.VIZMODE_DESKTOP}return cp.vizMode};cp.setVizMode=function(a){cp.vizMode=a};cp.getVizMode=function(){return cp.vizMode};
cp.getVizValue=function(a,b){return cp.vizMode==cp.VIZMODE_DESKTOP?a:b};cp.getOrientation=function(){return window.innerWidth<1.1*window.innerHeight?cp.VIZMODE_MOBIPORTRAIT:cp.VIZMODE_MOBILANDSCAPE};cp.isTouchDevice=function(){return"undefined"!=typeof window.ontouchstart?!0:!1};cp.ocCallbacks=[function(a){cp.vizMode=a;cp.log("vizMode changed to: "+a)}];cp.addOcCallback=function(a){cp.ocCallbacks.push(a)};
window.addEventListener("resize",function(){if(cp.vizMode!=cp.VIZMODE_DESKTOP){var a=cp.getOrientation();if(cp.vizMode!=a)for(var b=0;b<cp.ocCallbacks.length;b++)cp.ocCallbacks[b](a)}},!1);cp.setLang=function(a){"de"==a||"D"==a?cp.lang=cp.LANG_DE:"en"==a||"E"==a?cp.lang=cp.LANG_EN:null!=a&&cp.log("unsupported language: "+a)};cp.getLang=function(){return cp.lang};cp.getLangText=function(a,b){return cp.lang==cp.LANG_DE?a:b};
cp.changeLangPage=function(){var a=parent.window.location.href;""!=parent.window.location.hash&&(a=a.replace(parent.window.location.hash,""));""!=parent.window.location.search&&(a=a.replace(parent.window.location.search,""));if(0<a.indexOf("index_d.html")&&0>a.indexOf("mapindex_d.html"))parent.window.location.href=a.substring(0,a.length-12);else if(0<a.indexOf("_d.html"))parent.window.location.href=a.substring(0,a.length-7)+".html"+parent.window.location.search;else if(0<a.indexOf(".html"))parent.window.location.href=
a.substring(0,a.length-5)+"_d.html"+parent.window.location.search;else if(0<a.indexOf("search.php")){var b=parent.window.location.search.indexOf("lang=de"),c="en";0<parent.window.location.search.indexOf("lang=en")&&(b=parent.window.location.search.indexOf("lang=en"),c="de");0<=b&&(parent.window.location.href=a+parent.window.location.search.substring(0,b+5)+c+parent.window.location.search.substring(b+7))}else parent.window.location.href=0<a.indexOf("_d.php")?a.substring(0,a.length-6)+".php"+parent.window.location.search:
0<a.indexOf(".php")?a.substring(0,a.length-4)+"_d.php"+parent.window.location.search:a+"index_d.html"};cp.loadScript=function(a,b,c){cp.log("load "+a);var d=document.createElement("script");d.type="text/javascript";d.async=b;d.src=a;null!=c&&void 0!=c&&(d.onload=function(){c()});a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(d,a)};
cp.getParam=function(a){var b=window.location,c=b.search.indexOf(a+"=");if(0>c)return"";c+=a.length+1;a=b.search.indexOf("&",c);0>a&&(a=b.search.length);b=b.search.substring(c,a);"null"==b&&(b="");0<=b.indexOf("%")&&(b=decodeURI(b));return b};cp.data={};
cp.data.toDate=function(a){if("object"==typeof a)return a;for(;0<a.length&&("0">a.charAt(0)||"9"<a.charAt(0));)a=a.substr(1);7==a.length?a+="-01":4==a.length&&(a+="-01-01");if(10>a.length)return new Date(2013,0,1);var b=a.substr(0,4),c=a.substr(5,2);a=a.substr(8,2);return new Date(b,c-1,a)};cp.data.dateDiffInYears=function(a,b){"string"==typeof a&&(a=cp.data.toDate(a));"string"==typeof b&&(b=cp.data.toDate(b));return(b-a)/315576E5};
cp.data.computeAnnualChange=function(a,b,c,d){if(!a||!b)return null;a=this.dateDiffInYears(a,b);return 0<c&&0<a&&0<d?Math.round(1E4*(Math.exp(Math.log(d/c)/a)-1))/100:null};cp.data.INT_MODE="i";
cp.data.formatNum=function(a,b){var c=Math.abs(a),d=""+Math.floor(c),f=d.length,g=cp.getLangText(".",",");txt=1E3>c?d:1E6>c?d.substring(0,f-3)+g+d.substring(f-3):d.substring(0,f-6)+g+d.substring(f-6,f-3)+g+d.substring(f-3);0>a&&(txt="-"+txt);d=""+a;if(b==cp.data.INT_MODE)return txt;c=d.indexOf(".");return 0>c?txt:cp.lang==cp.LANG_DE?txt+","+d.substr(c+1):txt+d.substr(c)};
cp.data.cellValue=function(a,b,c){if(null==a||void 0==a)return b?c:"";if(b){b=a.innerHTML;var d=b.toUpperCase().indexOf("<A");if(0<=d)return c;b=a.textContent;txt1="";a=cp.getLangText(",",".");for(var f=d=!1,g=0;g<b.length;g++)ch=b.charAt(g),"0"<=ch&&"9">=ch||"-"==ch?(txt1+=ch,d=!0):ch==a&&(txt1+=ch,f=!0,a="$$");return d?f?parseFloat(txt1):parseInt(txt1):c}b=a.textContent;d=b.indexOf(" {");0<=d&&(b=b.substr(0,d));return b};cp.data.cValue=function(a,b){return cp.data.cellValue(a,b,null)};
cp.data.compareValue=function(a,b){return cp.data.cellValue(a,b,0)};cp.data.COMPARE_ORD_NUM=0;cp.data.COMPARE_ALPHA=1;cp.data.COMPARE_NUM=2;cp.data.compareMode=cp.data.COMPARE_NUM;
cp.data.rep=[/'/g,"",/-/g,"",/ /g,"",/-/g,"",/\u00f8/g,"o",/\u00e3/g,"a",/\u00f4/g,"o",/\u00e8/g,"e",/\u00e9/g,"e",/\u00f3/g,"o",/\u00fa/g,"u",/\u00e4/g,"a",/\u00f6/g,"o",/\u00fc/g,"u",/\u0101/g,"a",/\u012b/g,"i",/\u00e1/g,"a",/\u014d/g,"o",/\u016b/g,"u",/\u00ed/g,"i",/\u010d/,"c",/\u1e25/,"h",/\u1e6d/,"t",/\u00e0/g,"a",/\u00ef/g,"i",/\u0117/g,"e",/\u0219/g,"s",/\u1e63/,"s",/\u015f/,"s",/\u017e/,"z"];
cp.data.Row=function(a,b){if("string"==typeof a){a=a.toLowerCase();for(var c=0;c<cp.data.rep.length;c+=2)a=a.replace(cp.data.rep[c],cp.data.rep[c+1])}this.value=a;this.row=b};cp.data.compare=function(a,b){if(cp.data.compareMode==cp.data.COMPARE_NUM){var c=b.value-a.value;return 0!=c?c:a.row.ordNum-b.row.ordNum}return cp.data.compareMode==cp.data.COMPARE_ORD_NUM?a.row.ordNum-b.row.ordNum:a.value<b.value?-1:a.value==b.value?a.row.ordNum-b.row.ordNum:1};
cp.data.sortTable=function(a,b,c,d,f){a=document.getElementById(a);if(null!=a){var g=a.firstChild;"TBODY"!=g.nodeName.toUpperCase()&&(g=a.childNodes[1]);if("TBODY"!=g.nodeName.toUpperCase())cp.log("sortTable: no tbody found!");else{if(void 0==a.rows[0].ordNum)for(var e=0;e<a.rows.length;e++)a.rows[e].ordNum=e;cp.data.compareMode=c?cp.data.COMPARE_NUM:d?cp.data.COMPARE_ORD_NUM:cp.data.COMPARE_ALPHA;d=[];for(var h=a.rows.length-f,e=1;e<h;e++)d[e-1]=new cp.data.Row(cp.data.compareValue(a.rows[e].cells[b],
c),a.rows[e]);d.sort(cp.data.compare);for(e=0;e<h-1;e++)g.appendChild(d[e].row);if(0<f)for(e=1;e<=f;e++)g.appendChild(a.rows[1])}}};cp.social={};
cp.social.addSocial=function(a){var b=document.getElementById("social");if(null!=b){var c='<div id="twhead"><a href="javascript:cp.social.activateTwitter()"><img src="http://www.citypopulation.de/images/dummy_twitter.png" alt="" title="'+cp.getLangText("Aktiviere Twitter Button","Activate Tweet Button")+'" /></a></div><div id="fbhead"><a href="javascript:cp.social.activateFacebook()"><img src="http://www.citypopulation.de/images/dummy_facebook_'+cp.lang+'.png" alt="" title="'+cp.getLangText("Aktiviere Facebook Button",
"Activate Facebook Button")+'" /></a></div><div id="googleplus"><a href="javascript:cp.social.activateGPlus()"><img src="http://www.citypopulation.de/images/dummy_gplus.png" alt="" title="'+cp.getLangText("Aktiviere Google+ Button","Activate Google+ Button")+'" /></a></div>';!1!=a&&(c+='<div id="lang"><a href="javascript:cp.changeLangPage()"><img src="http://www.citypopulation.de/images/lang_'+cp.getLangText('en.gif" title="English"','de.gif" title="Deutsch"')+' alt=""></a></div>');b.innerHTML=c}};
cp.social.activateTwitter=function(){var a=document.getElementById("twhead"),b=document.title,c=b.indexOf(" on City");0<c&&(b=b.substring(0,c));c=b.indexOf("- Statistics");0<c&&(b=b.substring(0,c));118<b.length&&(b=b.substring(0,118));a.innerHTML='<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?text='+encodeURIComponent(b+" -")+"&lang="+cp.lang+'" style="width:130px; height:20px;"></iframe>'};
cp.social.activateFacebook=function(){document.getElementById("fbhead").innerHTML='<iframe src="//www.facebook.com/plugins/like.php?href='+window.location.href+'&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=recommend&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; border-width:0px; overflow:hidden; width:110px; height:21px;" allowTransparency="true">'};
cp.social.activateGPlus=function(){document.getElementById("googleplus").innerHTML='<div class="g-plusone" data-size="medium" data-href="'+window.location.href+'"></div>';window.___gcfg={lang:"de"==cp.lang?"de":"en-US"};cp.loadScript("https://apis.google.com/js/plusone.js",!0)};