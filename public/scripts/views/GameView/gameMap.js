function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function gameMap(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"gameMap.pug":"mixin landEmptyRow\n    - for (var i = 0; i \u003C boardSide; ++i) {        \n        div(class='land-block', id='gameCard')\n            if i == (boardSide-1) \u002F 2\n                img(class='land-card', src='img\u002Fbase.png')\n            else\n                img(class='land-card', src='img\u002Fempty.png')\n    - }\n\nmixin emptyTile\n    div(class='land-block', id='gameCard')\n        img(class='land-card', src='img\u002Fempty.png') \n\nsection(class='board', id='gameBoard')\n    +landEmptyRow\n    each row in cardsMap\n        +emptyTile      \n        each val in row\n            div(class='card', id='gameCard')\n                if val == 0\n                    img(class='front-face', src='img\u002Fgold.png')\n                else if val == 1\n                    img(class='front-face', src='img\u002Fwater.png')\n                else if val == 2\n                    img(class='front-face', src='img\u002Fgrass.png')\n                else if val == 3\n                    img(class='front-face', src='img\u002Fplant.png')\n                img(class='back-face', src='img\u002Funopened.png')\n        +emptyTile\n    +landEmptyRow"};
;var locals_for_with = (locals || {});(function (boardSide, cardsMap) {;pug_debug_line = 1;pug_debug_filename = "gameMap.pug";
pug_mixins["landEmptyRow"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "gameMap.pug";
for (var i = 0; i < boardSide; ++i) {        
{
;pug_debug_line = 3;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"land-block\" id=\"gameCard\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "gameMap.pug";
if (i == (boardSide-1) / 2) {
;pug_debug_line = 5;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"land-card\" src=\"img\u002Fbase.png\"\u002F\u003E";
}
else {
;pug_debug_line = 7;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"land-card\" src=\"img\u002Fempty.png\"\u002F\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 8;pug_debug_filename = "gameMap.pug";
}
};
;pug_debug_line = 10;pug_debug_filename = "gameMap.pug";
pug_mixins["emptyTile"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 11;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"land-block\" id=\"gameCard\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"land-card\" src=\"img\u002Fempty.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 14;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Csection class=\"board\" id=\"gameBoard\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "gameMap.pug";
pug_mixins["landEmptyRow"]();
;pug_debug_line = 16;pug_debug_filename = "gameMap.pug";
// iterate cardsMap
;(function(){
  var $$obj = cardsMap;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var row = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = "gameMap.pug";
pug_mixins["emptyTile"].call({
block: function(){
;pug_debug_line = 17;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "     ";
}
});
;pug_debug_line = 18;pug_debug_filename = "gameMap.pug";
// iterate row
;(function(){
  var $$obj = row;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var val = $$obj[pug_index1];
;pug_debug_line = 19;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"card\" id=\"gameCard\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "gameMap.pug";
if (val == 0) {
;pug_debug_line = 21;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgold.png\"\u002F\u003E";
}
else
if (val == 1) {
;pug_debug_line = 23;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
}
else
if (val == 2) {
;pug_debug_line = 25;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgrass.png\"\u002F\u003E";
}
else
if (val == 3) {
;pug_debug_line = 27;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fplant.png\"\u002F\u003E";
}
;pug_debug_line = 28;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"back-face\" src=\"img\u002Funopened.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var val = $$obj[pug_index1];
;pug_debug_line = 19;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"card\" id=\"gameCard\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "gameMap.pug";
if (val == 0) {
;pug_debug_line = 21;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgold.png\"\u002F\u003E";
}
else
if (val == 1) {
;pug_debug_line = 23;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
}
else
if (val == 2) {
;pug_debug_line = 25;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgrass.png\"\u002F\u003E";
}
else
if (val == 3) {
;pug_debug_line = 27;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fplant.png\"\u002F\u003E";
}
;pug_debug_line = 28;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"back-face\" src=\"img\u002Funopened.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

;pug_debug_line = 29;pug_debug_filename = "gameMap.pug";
pug_mixins["emptyTile"]();
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var row = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = "gameMap.pug";
pug_mixins["emptyTile"].call({
block: function(){
;pug_debug_line = 17;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "     ";
}
});
;pug_debug_line = 18;pug_debug_filename = "gameMap.pug";
// iterate row
;(function(){
  var $$obj = row;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var val = $$obj[pug_index2];
;pug_debug_line = 19;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"card\" id=\"gameCard\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "gameMap.pug";
if (val == 0) {
;pug_debug_line = 21;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgold.png\"\u002F\u003E";
}
else
if (val == 1) {
;pug_debug_line = 23;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
}
else
if (val == 2) {
;pug_debug_line = 25;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgrass.png\"\u002F\u003E";
}
else
if (val == 3) {
;pug_debug_line = 27;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fplant.png\"\u002F\u003E";
}
;pug_debug_line = 28;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"back-face\" src=\"img\u002Funopened.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var val = $$obj[pug_index2];
;pug_debug_line = 19;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"card\" id=\"gameCard\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "gameMap.pug";
if (val == 0) {
;pug_debug_line = 21;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgold.png\"\u002F\u003E";
}
else
if (val == 1) {
;pug_debug_line = 23;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
}
else
if (val == 2) {
;pug_debug_line = 25;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fgrass.png\"\u002F\u003E";
}
else
if (val == 3) {
;pug_debug_line = 27;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fplant.png\"\u002F\u003E";
}
;pug_debug_line = 28;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"back-face\" src=\"img\u002Funopened.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

;pug_debug_line = 29;pug_debug_filename = "gameMap.pug";
pug_mixins["emptyTile"]();
    }
  }
}).call(this);

;pug_debug_line = 30;pug_debug_filename = "gameMap.pug";
pug_mixins["landEmptyRow"]();
pug_html = pug_html + "\u003C\u002Fsection\u003E";}.call(this,"boardSide" in locals_for_with?locals_for_with.boardSide:typeof boardSide!=="undefined"?boardSide:undefined,"cardsMap" in locals_for_with?locals_for_with.cardsMap:typeof cardsMap!=="undefined"?cardsMap:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}