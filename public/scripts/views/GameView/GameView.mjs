import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';
import gameMap from './gameMap.pug';

export default class GameView extends BaseView {
	constructor({mapSide} = {}){
		super();
		this.mapSide = mapSide;
	}

	render() {
		const gameSection = document.getElementsByClassName('game-section');
		if (gameSection.length != 0) {
			gameSection[0].insertAdjacentHTML('beforeend', gameMap());
		} else {
			application.insertAdjacentHTML('beforeend', gameMap());
		}       

		const mapSize = 5;
		const playersCount = 2;
		const unitsCount = 2;

		window.game = new Game(mapSize, playersCount, unitsCount);       
	}
}


      

    




  