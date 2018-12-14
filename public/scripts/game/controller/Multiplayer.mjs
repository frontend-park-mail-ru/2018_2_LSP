import MapBuilder from '../MapBuilder.mjs';
// import CardBuilder from './CardBuilder.mjs';
// import Player from './Player.mjs';
// import UI from './UI.mjs';
// import Bus from './gameBus.mjs';
import Controller from './Controller.mjs';

/**
 * Главный класс игры
 * @module Game
 */
export default class Multiplayer extends Controller {
	/**
	 * Создание экземпляра игры
	 * @param {number} mapSize размерность карты
	 * @param {number} playersCount количество игроков (2 или 4)
	 * @param {number} pirateCount количество фишек на игрока
	 */
	constructor() {
		super();
	}

	createMap() {
		return MapBuilder.generateEmptyMap(5);	// получение карты в виде матрицы        
	}
}