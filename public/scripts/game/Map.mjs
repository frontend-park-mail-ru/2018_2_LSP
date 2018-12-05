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
		if (cardID === 'base-0') {
			let temp = Math.ceil(this.size/2);
			cards = [temp-1, temp, temp+1];
		} else if (cardID === 'base-1') {
			let temp = this.size*this.size - Math.floor(this.size/2);
			cards = [temp-1, temp, temp+1];
		} else {
			cardID = Number(this.getCardNumber(cardID));
			cards.push(cardID);
			if ((cardID + 1) % this.size != 1) {
				cards.push(cardID + 1);
			}
			if ((cardID - 1) % this.size != 0) {
				cards.push(cardID - 1);
			}
			if (cardID - 5 >= 1) {
				cards.push(cardID - 5);
			}
			if (cardID - 6 >= 1 && (cardID - 6) % this.size != 0) {
				cards.push(cardID - 6);
			}
			if (cardID - 4 >= 1 && (cardID - 4) % this.size != 1) {
				cards.push(cardID - 4);
			}
			if (cardID + 5 <= this.size * this.size) {
				cards.push(cardID + 5);
			}
			if (cardID + 6 <= this.size * this.size  && (cardID + 6) % this.size != 1) {
				cards.push(cardID + 6);
			}
			if (cardID + 4 <= this.size * this.size  && (cardID + 4) % this.size != 0) {
				cards.push(cardID + 4);
			}
		}
		return cards;
	}

	getCardNumber(id) {
		return id.match(/\d+/)[0];
	}
}