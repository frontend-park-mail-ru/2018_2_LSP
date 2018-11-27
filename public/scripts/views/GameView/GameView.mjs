import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';
import gameMap from './gameMap.pug';
import './GameView.scss';

export default class GameView extends BaseView {
	constructor({mapSide} = {}){
		super();
		this.mapSide = mapSide;
	}

	render() {
		const gameSection = document.getElementsByClassName('game');
		if (gameSection.length != 0) {
			gameSection[0].insertAdjacentHTML('beforeend', gameMap());
		} else {
			const application = document.getElementById('application');			
			application.insertAdjacentHTML('beforeend', gameMap());
		}       

		const mapSize = 5;
		const playersCount = 2;
		const unitsCount = 2;

		window.game = new Game(mapSize, playersCount, unitsCount);       
	}
}


      

    




  