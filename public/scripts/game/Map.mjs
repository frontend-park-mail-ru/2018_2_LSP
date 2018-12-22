let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

export default class Map {
	constructor(matrix, size) {
		this.size = size;
		this.matrix = matrix;
		this.totalGoldCount = 0;
		this.goldMap = [];
		for (let i=0; i < this.size; i++) {
			this.goldMap[i] = new Array(this.size);
		}
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.matrix[i][j] == CARDTYPES.GOLD) {
					this.goldMap[i][j] = 1;
					this.totalGoldCount++;
				}
				else {
					this.goldMap[i][j] = 0;
				}
			}
		}
	}

	decreaseGold(id) {
		id = id - 1;
		let i = Math.floor(id / this.size);
		let j = id % this.size;
		this.goldMap[i][j]--;
	}

	getGoldOnTitle(id) {
		id = id - 1;
		let i = Math.floor(id / this.size);
		let j = id % this.size;
		return this.goldMap[i][j];
	}

	getTotalGoldCount() {
		return this.totalGoldCount;
	}

	getCardType(id) {
		id = id - 1;
		let i = Math.floor(id / this.size);
		let j = id % this.size;
		return this.matrix[i][j];
	}

	getMoveableCards(cardID) {	// получить массив игровых карт на которые можно попасть
		let cards = [];
		if (cardID === 'base-square0') {
			let temp = Math.ceil(this.size/2);
			cards = ['square-' + (temp-1), 'square-' + (temp), 'square-' + (temp+1)];
		} else if (cardID === 'base-square1') {
			let temp = this.size*this.size - Math.floor(this.size/2);
			cards = ['square-' + (temp-1), 'square-' + (temp), 'square-' + (temp+1)];
		} else if (cardID === 'base-square2') {
			let temp = this.size*(Math.floor(this.size/2)) + 1;
			cards = ['square-' + (temp-this.size), 'square-' + (temp), 'square-' + (temp+this.size)];
		} else if (cardID === 'base-square3') {
			let temp = this.size*(Math.floor(this.size/2) + 1);
			cards = ['square-' + (temp-this.size), 'square-' + (temp), 'square-' + (temp+this.size)];
		} else {
			cardID = Number(this.getCardNumber(cardID));
			if ((cardID + 1) % this.size != 1) {
				cards.push('square-' + (cardID + 1));
			}
			if ((cardID - 1) % this.size != 0) {
				cards.push('square-' + (cardID - 1));
			}
			if (cardID - this.size >= 1) {
				cards.push('square-' + (cardID - this.size));
			}
			if (cardID - (this.size+1) >= 1 && (cardID - (this.size+1)) % this.size != 0) {
				cards.push('square-' + (cardID - (this.size+1)));
			}
			if (cardID - (this.size-1) >= 1 && (cardID - (this.size-1)) % this.size != 1) {
				cards.push('square-' + (cardID - (this.size-1)));
			}
			if (cardID + this.size <= this.size * this.size) {
				cards.push('square-' + (cardID + this.size));
			}
			if (cardID + (this.size+1) <= this.size * this.size  && (cardID + (this.size+1)) % this.size != 1) {
				cards.push('square-' + (cardID + (this.size+1)));
			}
			if (cardID + (this.size-1) <= this.size * this.size  && (cardID + (this.size-1)) % this.size != 0) {
				cards.push('square-' + (cardID + (this.size-1)));
			}
		}
		return cards;
	}

	getCardNumber(id) {
		return id.match(/\d+/)[0];
	}
}