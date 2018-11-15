import BaseView from '../../views/BaseView/BaseView.mjs';
// import MapBuilder from '../../game/MapBuilder.mjs';
// import Map from '../../game/Map.js';
// import GameBus from '../../game/gameBus.mjs';
import Game from '../../game/Game.mjs';

let game;

export default class GameView extends BaseView {
    constructor({mapSide} = {}){
        const view = baseView({'headerType': ''});
        super(view);
        this.mapSide = mapSide;
    }

    render() {
        const gameSection = document.getElementsByClassName("gameSection");
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


      

    




  