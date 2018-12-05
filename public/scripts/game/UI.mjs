export default class UI {
	constructor(size, timer) {
		this._mapSize = size;
		this._timer = timer;
	}

	resetSelected() {
		for(let i = 1; i <= this._mapSize * this._mapSize; ++i) {
			const card = document.getElementById('square-' + i);
			card.style.opacity = 1;
			card.classList.remove('game__card_selected');		
		}
	}

	setLowOpacity() {
		for(let i = 1; i <= this._mapSize * this._mapSize; ++i) {
			document.getElementById('square-' + i).style.opacity = 0.7;
		}
	}

	selectCards(cardsId) {
		cardsId.forEach(function(id) {
			const card = document.getElementById('square-' + id);
			card.style.opacity = 1;
			card.classList.add('game__card_selected');
		});
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