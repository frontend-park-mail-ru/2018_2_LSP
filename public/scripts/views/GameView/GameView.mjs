import BaseView from '/scripts/views/BaseView/BaseView.mjs';
import MapBuilder from '/scripts/game/MapBuilder.mjs';
// import Map from '/scripts/game/Map.js';
import GameBus from '/scripts/game/gameBus.mjs';
import Game from '/scripts/game/Game.mjs';

export default class GameView extends BaseView {
    constructor({mapSide} = {}){
        const view = baseView({'headerType': 'back', 'navClass': 'navigation_left'});
        super(view);
        this.mapSide = mapSide;
    }

    render() {
        let cardsDistribution = [];
        if (this.mapSide == 3) {
            cardsDistribution = [[0,1], [1,5], [2,2], [3,1]]; //3x3
        } else if (this.mapSide == 5) {
            cardsDistribution = [[0,5], [1,9], [2,6], [3,5]]; //5x5
        } else {
            console.log("Map must be 3x3 or 5x5");
        }
        //GameBus.emit('cardsDistribution', cardsDistribution);

        const mapBuilder = new MapBuilder(cardsDistribution);
        const cardsMap = mapBuilder.generateMap();

        const boardSide = this.mapSide + 2; //с землей вокруг
        const gameBoard = gameMap({'cardsMap': cardsMap, 'boardSide': boardSide});
        application.insertAdjacentHTML('beforeend', gameBoard);

        const cards = document.querySelectorAll('.card, .land-block');
        cards.forEach(card => {
            card.style.width = card.style.height = 'calc(100% / ' + boardSide + ')';
            cards.forEach(card => {
                card.addEventListener('click', flipCard);
                GameBus.on('open-card', flipCard);
            });
        });

        let game = new Game(5, 2);
    }

    static resetOpacity() {
        for(let i = 1; i <= game.map.size * game.map.size; ++i) {
          document.getElementById("gamecard-" + i).style.opacity = 1;
        }
    }
    
    static setLowOpacity() {
        for(let i = 1; i <= game.map.size * game.map.size; ++i) {
          document.getElementById("gamecard-" + i).style.opacity = 0.7;
        }
    }
      
    static placeDiv(id, x_pos, y_pos) {
        let d = document.getElementById(id);
        d.style.left = x_pos+'px';
        d.style.top = y_pos+'px';
    }
      
    static getAreaData(id) {
        let area = document.getElementById(id);
        let rect = area.getBoundingClientRect();
        return [rect.left, rect.top, area.offsetWidth, area.offsetHeight]
    }
    
    static setEventListener(type, id, listener) {
        document.getElementById(id).addEventListener(type, listener)
    }
}



function flipCard() {
    if (game.flipCard(this.id)) {
      this.classList.add('flip');
    }
}

function playerClick() {
    game.playerClick(this.id);
}