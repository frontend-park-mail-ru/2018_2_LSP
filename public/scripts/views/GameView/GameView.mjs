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
        // let cardsDistribution = [];
        // if (this.mapSide == 3) {
        //     cardsDistribution = [[0,1], [1,5], [2,2], [3,1]]; //3x3
        // } else if (this.mapSide == 5) {
        //     cardsDistribution = [[0,5], [1,9], [2,6], [3,5]]; //5x5
        // } else {
        //     console.log("Map must be 3x3 or 5x5");
        // }
        // //GameBus.emit('cardsDistribution', cardsDistribution);

        // const mapBuilder = new MapBuilder();
        // const cardsMap = mapBuilder.generateMap(cardsDistribution);

        // const boardSide = this.mapSide + 2; //с землей вокруг
        const gameBoard = gameMap();
        application.insertAdjacentHTML('beforeend', gameBoard);

        // const cards = document.querySelectorAll('.card, .land-block');
        // cards.forEach(card => {
        //     card.style.width = card.style.height = 'calc(100% / ' + boardSide + ')';
        //     cards.forEach(card => {
        //         card.addEventListener('click', flipCard);
        //         GameBus.on('open-card', flipCard);
        //     });
        // });

        const mapSize = 5;
        const playersCount = 2;

        game = new Game(document, mapSize, playersCount);
        
    }

    
    }
    




  