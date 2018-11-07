function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function gameMap(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"gameMap.pug":"section(class='board', id='gameBoard')\n    each val in cardsQuantity\n        div(class='card', id='gameCard')\n            img(class='front-face', src='img\u002Fwater.png')\n            img(class='back-face', src='img\u002Funopened.png')\n\n    "};
;var locals_for_with = (locals || {});(function (cardsQuantity) {;pug_debug_line = 1;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Csection class=\"board\" id=\"gameBoard\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "gameMap.pug";
// iterate cardsQuantity
;(function(){
  var $$obj = cardsQuantity;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var val = $$obj[pug_index0];
;pug_debug_line = 3;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"card\" id=\"gameCard\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"back-face\" src=\"img\u002Funopened.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var val = $$obj[pug_index0];
;pug_debug_line = 3;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"card\" id=\"gameCard\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"back-face\" src=\"img\u002Funopened.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fsection\u003E";}.call(this,"cardsQuantity" in locals_for_with?locals_for_with.cardsQuantity:typeof cardsQuantity!=="undefined"?cardsQuantity:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}