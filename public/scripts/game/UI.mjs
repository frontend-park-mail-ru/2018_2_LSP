export class UI {
    constructor() {}

	static resetOpacity(document) {
		for(let i = 1; i <= game.map.size * game.map.size; ++i) {
			document.getElementById("gamecard-" + i).style.opacity = 1;
		}
	}

	static setLowOpacity(document) {
		for(let i = 1; i <= game.map.size * game.map.size; ++i) {
			document.getElementById("gamecard-" + i).style.opacity = 0.7;
		}
	}

	static placeDiv(id, x_pos, y_pos) {
		let d = document.getElementById(id);
		d.style.left = x_pos+'px';
		d.style.top = y_pos+'px';
	}

	static getAreaData(id) {
		let area = document.getElementById(id);
		let rect = area.getBoundingClientRect();
		return [rect.left, rect.top, area.offsetWidth, area.offsetHeight];
	}  

	static setEventListener(document, type, id, listener) {
		document.getElementById(id).addEventListener(type, listener);
	}
}