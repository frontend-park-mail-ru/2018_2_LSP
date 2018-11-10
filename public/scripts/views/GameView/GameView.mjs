import BaseView from '/scripts/views/BaseView/BaseView.mjs';
import MapBuilder from '/scripts/game/MapBuilder.mjs';
// import Map from '/scripts/game/Map.js';
import GameBus from '/scripts/game/gameBus.mjs';
import Game from '/scripts/game/Game.mjs';

let game;

export default class GameView extends BaseView {
    constructor({mapSide} = {}){
        const view = baseView({'headerType': 'back', 'navClass': 'navigation_left'});
        super(view);
        this.mapSide = mapSide;
    }

    render() {
        const gameBoard = gameMap();
        application.insertAdjacentHTML('beforeend', gameBoard);

        const mapSize = 5;
        const playersCount = 2;
        window.game = new Game(document, mapSize, playersCount); 
        // const mapSize = 5;
        // const playersCount = 2;
        // game = new Game(document, mapSize, playersCount);        
        }
    }


      

    




  