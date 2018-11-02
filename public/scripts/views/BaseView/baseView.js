function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function baseView(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"baseView.pug":"nav(class= navClass)\n\n    if headerType == \"landing\"\n        a(class=\"basicButton\" href=\"signup\" data-href=\"signup\") Регистрация\n        a(class=\"basicButton\" href=\"signin\" data-href=\"signin\") Вход\n    else if headerType == \"menu\"\n    else if headerType == \"backToLanding\"\n        a(class=\"basicButton\" href=\"landing\" data-href=\"landing\") Назад\n    else if headerType == \"backToMenu\"\n        a(class=\"basicButton\" href=\"menu\" data-href=\"menu\") Назад в меню\n\nsection(class=\"centerSection\" dataset.sectioname=\"landing\")\n    h2 #{title}\n    div(id=\"content\")\n        block content\n"};
;var locals_for_with = (locals || {});(function (headerType, navClass, title) {;pug_debug_line = 1;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Cnav" + (pug_attr("class", pug_classes([navClass], [true]), false, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "baseView.pug";
if (headerType == "landing") {
;pug_debug_line = 4;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Ca class=\"basicButton\" href=\"signup\" data-href=\"signup\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "Регистрация\u003C\u002Fa\u003E";
;pug_debug_line = 5;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Ca class=\"basicButton\" href=\"signin\" data-href=\"signin\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "Вход\u003C\u002Fa\u003E";
}
else
if (headerType == "menu") {
}
else
if (headerType == "backToLanding") {
;pug_debug_line = 8;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Ca class=\"basicButton\" href=\"landing\" data-href=\"landing\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "Назад\u003C\u002Fa\u003E";
}
else
if (headerType == "backToMenu") {
;pug_debug_line = 10;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Ca class=\"basicButton\" href=\"menu\" data-href=\"menu\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "Назад в меню\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fnav\u003E";
;pug_debug_line = 12;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Csection class=\"centerSection\" dataset.sectioname=\"landing\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 13;pug_debug_filename = "baseView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
;pug_debug_line = 14;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "baseView.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";}.call(this,"headerType" in locals_for_with?locals_for_with.headerType:typeof headerType!=="undefined"?headerType:undefined,"navClass" in locals_for_with?locals_for_with.navClass:typeof navClass!=="undefined"?navClass:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}