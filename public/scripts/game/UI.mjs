export default class UI {
	constructor(size, timer) {
		this._mapSize = size;
		this._timer = timer;
	}

	resetOpacity() {
		for(let i = 1; i <= this._mapSize * this._mapSize; ++i) {
			document.getElementById('gamecard-' + i).style.opacity = 1;
		}
	}

	setLowOpacity() {
		for(let i = 1; i <= this._mapSize * this._mapSize; ++i) {
			document.getElementById('gamecard-' + i).style.opacity = 0.7;
		}
	}

	moveToCard(object, card) {
		const obj = document.getElementById(object);
		document.getElementById(card).appendChild(obj);
	}

	setEventListener(type, id, listener) {
		document.getElementById(id).addEventListener(type, listener);
	}

	setTimer(time) {
		this._timer = document.getElementById('timer');
		this._timer = this._timer + time;
	}
}