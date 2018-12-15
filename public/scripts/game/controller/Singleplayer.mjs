import MapBuilder from '../MapBuilder.mjs';
// import CardBuilder from './CardBuilder.mjs';
// import Player from './Player.mjs';
// import UI from './UI.mjs';
import Bus from '../gameBus.mjs';
import Controller from './Controller.mjs';

let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

const distribution = [[CARDTYPES.DEFAULT, 17], [CARDTYPES.GOLD, 6], [CARDTYPES.KILL, 2]];

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
	}

	createMap() {
		return MapBuilder.generateMap(distribution);	// получение карты в виде матрицы
	}
}