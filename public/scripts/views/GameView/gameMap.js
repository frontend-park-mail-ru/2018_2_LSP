function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function gameMap(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"gameMap.pug":"mixin card(id, type)\n    div(class= 'card', id= id)\n        img(class= 'front-face', src= 'img\u002Fwater.png')\n        img(class= 'back-face', src= 'img\u002F'+ type + '.png')\n\nmixin base_row(id, type)\n    - var length = 3\n    - for (var card = 0; card \u003C length; card++)\n        +card('gameCard', 'base')\n    +card(id, type)\n    - for (var card = 0; card \u003C length; card++)\n        +card('gameCard', 'base')\n\nmixin field(size)\n    - for (var row = 0; row \u003C size; row++)\n        +card('gameCard', 'base')\n        - for (var card = 1; card \u003C= size; card++)\n            +card('gamecard-'+ ((row*size)+card), 'unopened')\n        +card('gameCard', 'base')\ndiv(class= \"gameSection\")\n    div(style= \"position:absolute;z-index: 1\" id= \"player-0-0\")\n        img(src=\"img\u002Fships\u002Fred.png\", style= \"width:45px\")\n    div(style= \"position:absolute;z-index: 1\" id= \"player-0-1\")\n        img(src=\"img\u002Fships\u002Fred.png\", style= \"width:45px\")\n    div(style= \"position:absolute;z-index: 1\" id= \"player-1-0\")\n        img(src=\"img\u002Fships\u002Fgreen.png\", style= \"width:45px\")\n    div(style= \"position:absolute;z-index: 1\" id= \"player-1-1\")\n        img(src=\"img\u002Fships\u002Fgreen.png\", style= \"width:45px\")\n    section(class='board', id='gameBoard')\n        +base_row('ship-0', 'ship')\n        +field(5)\n        +base_row('ship-1', 'ship')\n    \n    "};
;pug_debug_line = 1;pug_debug_filename = "gameMap.pug";
pug_mixins["card"] = pug_interp = function(id, type){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"card\""+pug_attr("id", id, true, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg class=\"front-face\" src=\"img\u002Fwater.png\"\u002F\u003E";
;pug_debug_line = 4;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"back-face\""+pug_attr("src", 'img/'+ type + '.png', true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 6;pug_debug_filename = "gameMap.pug";
pug_mixins["base_row"] = pug_interp = function(id, type){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 7;pug_debug_filename = "gameMap.pug";
var length = 3
;pug_debug_line = 8;pug_debug_filename = "gameMap.pug";
for (var card = 0; card < length; card++)
{
;pug_debug_line = 9;pug_debug_filename = "gameMap.pug";
pug_mixins["card"]('gameCard', 'base');
}
;pug_debug_line = 10;pug_debug_filename = "gameMap.pug";
pug_mixins["card"](id, type);
;pug_debug_line = 11;pug_debug_filename = "gameMap.pug";
for (var card = 0; card < length; card++)
{
;pug_debug_line = 12;pug_debug_filename = "gameMap.pug";
pug_mixins["card"]('gameCard', 'base');
}
};
;pug_debug_line = 14;pug_debug_filename = "gameMap.pug";
pug_mixins["field"] = pug_interp = function(size){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 15;pug_debug_filename = "gameMap.pug";
for (var row = 0; row < size; row++)
{
;pug_debug_line = 16;pug_debug_filename = "gameMap.pug";
pug_mixins["card"]('gameCard', 'base');
;pug_debug_line = 17;pug_debug_filename = "gameMap.pug";
for (var card = 1; card <= size; card++)
{
;pug_debug_line = 18;pug_debug_filename = "gameMap.pug";
pug_mixins["card"]('gamecard-'+ ((row*size)+card), 'unopened');
}
;pug_debug_line = 19;pug_debug_filename = "gameMap.pug";
pug_mixins["card"]('gameCard', 'base');
}
};
;pug_debug_line = 20;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv class=\"gameSection\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv style=\"position:absolute;z-index: 1\" id=\"player-0-0\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg src=\"img\u002Fships\u002Fred.png\" style=\"width:45px\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv style=\"position:absolute;z-index: 1\" id=\"player-0-1\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg src=\"img\u002Fships\u002Fred.png\" style=\"width:45px\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv style=\"position:absolute;z-index: 1\" id=\"player-1-0\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg src=\"img\u002Fships\u002Fgreen.png\" style=\"width:45px\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cdiv style=\"position:absolute;z-index: 1\" id=\"player-1-1\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Cimg src=\"img\u002Fships\u002Fgreen.png\" style=\"width:45px\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "gameMap.pug";
pug_html = pug_html + "\u003Csection class=\"board\" id=\"gameBoard\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "gameMap.pug";
pug_mixins["base_row"]('ship-0', 'ship');
;pug_debug_line = 31;pug_debug_filename = "gameMap.pug";
pug_mixins["field"](5);
;pug_debug_line = 32;pug_debug_filename = "gameMap.pug";
pug_mixins["base_row"]('ship-1', 'ship');
pug_html = pug_html + "\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}