var pos1 = window.location.href.indexOf("/php/");
if ((pos1>=0) && (window.location.href.substring(0,pos1) != "http://www.citypopulation.de"))
  window.location.replace("http://www.citypopulation.de"+window.location.href.substring(pos1));
