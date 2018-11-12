import BaseView from '../../views/BaseView/BaseView.mjs';
// import MapBuilder from '../../game/MapBuilder.mjs';
// import Map from '../../game/Map.js';
// import GameBus from '../../game/gameBus.mjs';
import Game from '../../game/Game.mjs';

let game;

export default class GameView extends BaseView {
    constructor({mapSide} = {}){
        const view = baseView({'headerType': 'back', 'navClass': 'navigation_left'});
        super(view);
        this.mapSide = mapSide;
    }

    render() {
        const bord = gameMap();
        application.insertAdjacentHTML('beforeend', bord); // gameMap как-то создает карту... хз...

        const mapSize = 5;
        const playersCount = 2;
        window.game = new Game(document, mapSize, playersCount, 2);       
    }
}


      

    




  