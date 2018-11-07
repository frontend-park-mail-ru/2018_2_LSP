import BaseView from '/scripts/views/BaseView/BaseView.mjs';
import MapBuilder from './mapbuilder.js';

export default class GameMap extends BaseView {
    constructor({boardSide, cardSize} = {}){
        const view = baseView({'headerType': 'back', 'navClass': 'backButton'});
        super(view);
        this.boardSide = boardSide;
    }

    render() {
        //const cardsDistribution = [[0,1], [1,5], [2,2], [3,1]]; //3x3
        const cardsDistribution = [[0,2], [1,7], [2,3], [3,4]]; //4x4
        //const cardsDistribution = [[0,5], [1,9], [2,6], [3,5]]; //5x5
        const mapBuilder = new MapBuilder(cardsDistribution);
        const cardsMap = mapBuilder.generateMap();

        const gameBoard = gameMap({'cardsMap': cardsMap});
        application.insertAdjacentHTML('beforeend', gameBoard); 

        // var cardsArr = new Array(this.boardSide * this.boardSide);
        // const board = gameMap({'cardsQuantity': cardsArr});
        // application.insertAdjacentHTML('beforeend', board);           

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => 
            card.style.width = card.style.height = 'calc(100% / ' + this.boardSide + ')'
        );

        cards.forEach(card => card.addEventListener('click', flipCard));
    }
}

function flipCard() {
    this.classList.add('flip');
    
    // setTimeout(() => {
    //   this.classList.remove('flip');
    // }, 1500);
}