import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';
import gameMap from './gameMap.pug';
import gamePlayers from './gamePlayers.pug';
import gameTimer from './gameTimer.pug';
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
			gameSection[0].insertAdjacentHTML('beforeend', gamePlayers());
			// gameSection[0].insertAdjacentHTML('beforeend', gameTimer());
		} else {
			const application = document.getElementById('application');			
			application.insertAdjacentHTML('beforeend', gameMap());
			application.insertAdjacentHTML('beforeend', gamePlayers());
			// application.insertAdjacentHTML('beforeend', gameTimer());
		}       

		const mapSize = 5;
		const playersCount = 2;
		const unitsCount = 2;

		window.game = new Game(mapSize, playersCount, unitsCount);       
	}
}


      

    




  