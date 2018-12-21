import MapBuilder from '../MapBuilder.mjs';
import gameBus from '../gameBus.mjs';
import Controller from './Controller.mjs';

let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

const SMALL = 5;
const MIDLE = 7;
const BIG = 9;

const distribution_small = [[CARDTYPES.DEFAULT, 17], [CARDTYPES.GOLD, 6], [CARDTYPES.KILL, 2]];
const distribution_midle = [[CARDTYPES.DEFAULT, 32], [CARDTYPES.GOLD, 12], [CARDTYPES.KILL, 5]];
const distribution_big = [[CARDTYPES.DEFAULT, 53], [CARDTYPES.GOLD, 20], [CARDTYPES.KILL, 8]];

/**
 * Главный класс игры
 * @module Game
 */
export default class Singleplayer extends Controller {
	/**
	 * Создание экземпляра игры
	 * @param {number} mapSize размерность карты
	 * @param {number} playersCount количество игроков (2 или 4)
	 * @param {number} pirateCount количество фишек на игрока
	 */
	constructor(players) {
		super(players);
		this.playersCount = players.length;
		this.currentPlayer = 0;

		this.listenGameEvents();
	}

	createMap(size) {
		let distribution = [];
		switch (size) {
		case SMALL:
			distribution = distribution_small;
			break;
		case MIDLE:
			distribution = distribution_midle;
			break;
		case BIG:
			distribution = distribution_big;
			break;
		}
		this.map = MapBuilder.generateMap(distribution);
		return this.map;	// получение карты в виде матрицы
	}

	getCardType(cardID) {
		return this.map.getCardType(cardID);		
	}

	listenGameEvents() {
		gameBus.on('game-pass-step', () => {
			this.currentPlayer = (this.currentPlayer + 1) % this.playersCount;			
			gameBus.emit('game-step', this.currentPlayer);
		});

		gameBus.on('game-ready', () => {
			gameBus.emit('game-step', this.currentPlayer);
		});
	}
}