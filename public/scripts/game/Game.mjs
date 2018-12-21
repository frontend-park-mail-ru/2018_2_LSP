import CardBuilder from './CardBuilder.mjs';
import Player from './Player.mjs';
import UI from './UI.mjs';
import Bus from './gameBus.mjs';

let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

 
/**
 * Главный класс игры
 * @module Game
 */
export default class Game {
	/**
	 * Создание экземпляра игры
	 * @param {number} mapSize размерность карты
	 * @param {number} playersCount количество игроков (2 или 4)
	 * @param {number} pirateCount количество фишек на игрока
	 */
	constructor(controller, mapSize, playersCount, pirateCount, myPlayer = -1) {
		this._gameController = controller;

		this.map = this._gameController.createMap(mapSize);	// создание карты

		this.myPlayer = myPlayer;
		this.currentPlayer = -1;
		this.playersCount = playersCount;
		
		this.timeOut = this.startTimer();
		this.totalGoldCount = this.map.getTotalGoldCount();
		this.currentSelectedPirate = 0; // TODO убрать ???

		this.hovered = false;

		this.players = Array(playersCount);
		for(let i = 0; i < playersCount; i++) {
			this.players[i] = new Player();
			this.players[i].addPirates(pirateCount, 'base-square' + i);
		}

		this.UI = new UI(mapSize, this.timeOut, this.playersCount);

		// навешиваем событие переворота карточки
		for(let i = 1; i <= mapSize * mapSize; ++i) {
			this.UI.setEventListener('click', 'gamecard-' + i, function() {
				window.game.pirateStep(this.id);
			});
		}
	
		// навешиваем событие выбора пирата
		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getPirates().length; j++) {
				const id = 'pirate-' + i + '-' + j;
				this.UI.setEventListener('click', id, function() {
					window.game.playerClick(this.id);
				});
			}
		}

		Bus.on('game-step', (current) => {
			this.currentPlayer = current;
			this.UI.changeCurrentPlayer(this.currentPlayer);
			if (this.myPlayer === -1 || this.currentPlayer === this.myPlayer) {
				this._selectPirates(this.currentPlayer);
			}
		});

		Bus.on('game-pirate-go', (data) => {
			this.moveUnit(data['playerID'], data['pirateID'], data['cardID']);
		});

		Bus.emit('game-ready', {});
	}

	/**
	 * Проверка выиграша какого-либо игрока
	 */
	checkForWin() {
		this.players.forEach(player => {
			if (player.getScore() > this.totalGoldCount / 2) {
				return true;
			}
		});
		return false;
	}
  
	startTimer() {
		return window.setTimeout(function() {
			// this.currentPlayer = (this.currentPlayer + 1) % this.playersCount;
			this.hovered = false;
			// this.UI.resetSelected();
			alert('Время вашего хода истекло');
		}, 30000);
	}

	/**
	 * Обработка нажатия на пирата
	 * @param {string} id id пирата на которого нажали
	 */
	playerClick(id) {
		if (this._getPlayerNumber(id) != this.currentPlayer || (this.myPlayer !== -1 && this.currentPlayer !== this.myPlayer)) {
			return;
		}
		this.UI.resetSelected();
	
		if (!this.hovered) {
			this.hovered = true;
			this.UI.setLowOpacity();
			let pirateID = this._getPirateNumber(id);
			let currentCard = this.players[this.currentPlayer].getPirate(pirateID).getCard();
			const moveableCards = this.map.getMoveableCards(currentCard);
			this.UI.selectCards(moveableCards);
			this.currentSelectedPirate = pirateID; // TODO убрать
		} 
		else {
			this.hovered = false;
			this.UI.resetSelected();
			//=====================
			// выделение кораблей текущего игрока
			//=================
		}
	}

	/**
	 * Обработка нажатия на карточку
	 * @param {string} id id нажатой карточки
	 */
	pirateStep(id) {
		if (!this.hovered) {
			return false;
		}
		const cardID = parseInt(this.getCardNumber(id));
		const currentCard = this.players[this.currentPlayer].getPirate(this.currentSelectedPirate).getCard();
		let moveableCards = this.map.getMoveableCards(currentCard);
		if (moveableCards.indexOf('square-' + this.getCardNumber(id)) == -1) {
			return false;
		}
	
		window.clearTimeout(this.timeOut);
		this.moveUnit(this.currentPlayer, this.currentSelectedPirate, cardID);


		this.UI.resetSelected();

		if (this.checkForWin()) {
			if (this.done === undefined) {
				alert('Игрок ' + this.currentPlayer + ' выиграл! Вы можете продолжать игру (тестовый режим).');
				this.done = true;
			}
		}

		//==================
		this._passStep(this.currentSelectedPirate, cardID);
		this.hovered = false;
		return true;
	}
	
	_getPlayerNumber(id) {
		return id.match(/\d+/g).map(Number)[0];
	}
	
	_getPirateNumber(id) {
		return id.match(/\d+/g).map(Number)[1];
	}

	getCardNumber(id) {
		return id.match(/\d+/)[0];
	}

	_passStep(pirate, card) {
		// this.currentPlayer = -1;
		Bus.emit('game-pass-step', {'pirate': '' + pirate, 'card': '' + (card-1)});

		this.timeOut = this.startTimer();
	}

	_selectPirates(current) {
		const currentPiratesCards = [];
		const pirateList = this.players[current].getPirates();
		pirateList.forEach((pirateOfPlayer) => {
			currentPiratesCards.push(pirateOfPlayer.getCard());
		});
		this.UI.selectCards(currentPiratesCards);
	}

	moveUnit(playerID, pirateID, cardID) {
		this.players[playerID].getPirate(pirateID).setCard('square-' + cardID);

		const pirate = `pirate-${playerID}-${pirateID}`;
		this.UI.moveToCard(pirate, `square-${cardID}`);
	
		this.flipCard(cardID);
	}

	flipCard(cardID) {
		const cardType = this._gameController.getCardType(cardID);
		const cardObject = CardBuilder.build(cardType);
		cardObject.apply(this);

		const card = document.getElementById('gamecard-' + cardID);
		switch (cardType) {
		case CARDTYPES.GOLD:
			card.getElementsByTagName('img')[0].src = 'img/gold.png';
			break;
		case CARDTYPES.KILL:
			card.getElementsByTagName('img')[0].src = 'img/kill.png';
			break;
		default:
			card.getElementsByTagName('img')[0].src = 'img/water.png';
			break;
		}
		card.classList.add('flip');
	}
}