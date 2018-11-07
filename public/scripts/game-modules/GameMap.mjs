import BaseView from '/scripts/views/BaseView/BaseView.mjs';
import MapBuilder from './mapbuilder.js';

export default class GameMap extends BaseView {
    constructor({mapSide} = {}){
        const view = baseView({'headerType': 'back', 'navClass': 'backButton'});
        super(view);
        this.mapSide = mapSide;
    }

    render() {
        const cardsDistribution = [[0,1], [1,5], [2,2], [3,1]]; //3x3
        //const cardsDistribution = [[0,5], [1,9], [2,6], [3,5]]; //5x5
        const mapBuilder = new MapBuilder(cardsDistribution);
        const cardsMap = mapBuilder.generateMap();

        const boardSide = this.mapSide + 2; //с землей вокруг
        const gameBoard = gameMap({'cardsMap': cardsMap, 'boardSide': boardSide});
        application.insertAdjacentHTML('beforeend', gameBoard);

        const cards = document.querySelectorAll('.card, .land-block');
        cards.forEach(card => {
            card.style.width = card.style.height = 'calc(100% / ' + boardSide + ')';
            cards.forEach(card => card.addEventListener('click', flipCard));
        });
    }
}

function flipCard() {
    this.classList.add('flip');
    
    // setTimeout(() => {
    //   this.classList.remove('flip');
    // }, 1500);
}