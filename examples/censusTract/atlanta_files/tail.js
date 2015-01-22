var lang = pagelang;

if (navigator.userAgent.match(/Android/i)) window.scrollTo(0,1);

function activateTwitter() {
  var divElem = document.getElementById('twhead');
  var txt = document.title;
  if (txt.length > 118)
    txt = txt.substring(0,118);
  txt += " -";
  divElem.innerHTML = '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?text='+encodeURIComponent(txt)+'&lang='+lang+'" style="width:130px; height:20px;"></iframe>';
}

function activateFacebook() {
  var divElem = document.getElementById('fbhead');
  divElem.innerHTML = '<iframe src="//www.facebook.com/plugins/like.php?href=' + window.location.href +
    '&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=recommend&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; border-width:0px; overflow:hidden; width:110px; height:21px;" allowTransparency="true">';
}

function activateGPlus() {
  var divElem = document.getElementById('googleplus');
  divElem.innerHTML = '<div class="g-plusone" data-size="medium" data-href="' + window.location.href + '"></div>';
  window.___gcfg = {
    lang: (lang=='de'?'de':'en-US')
  };
  (function() {
     var po = document.createElement("script");
     po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/plusone.js";
     var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);
  })();
}

if (vizMode == "") {
  document.writeln('<div id="social">');
  document.writeln('<div id="twhead"><a href="javascript:activateTwitter()"><img src="http://www.citypopulation.de/images/dummy_twitter.png" alt="" title="' +
    (lang=='de'?'Aktiviere Twitter Button':'Activate Tweet Button') + '" /></a></div>');
  document.writeln('<div id="fbhead"><a href="javascript:activateFacebook()"><img src="http://www.citypopulation.de/images/dummy_facebook_'+lang+'.png" alt="" title="' +
    (lang=='de'?'Aktiviere Facebook Button':'Activate Facebook Button') + '" /></a></div>');
  document.writeln('<div id="googleplus"><a href="javascript:activateGPlus()"><img src="http://www.citypopulation.de/images/dummy_gplus.png" alt="" title="' +
    (lang=='de'?'Aktiviere Google+ Button':'Activate Google+ Button') + '" /></a></div>');
  document.writeln(	'<div id="lang"><a href="javascript:cp.changeLangPage()"><img src="../images/lang_' + (lang=='de'?'en.gif" title="English"':'de.gif" title="Deutsch"') + ' alt=""></a></div>');
  document.writeln('</div>');
}

if (vizMode != "") {
  $("#fba1").attr("href","http://m.facebook.com/citypopulation/");
  $("#fba2").attr("href","http://m.facebook.com/citypopulation/");
}

