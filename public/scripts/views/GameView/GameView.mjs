import BaseView from '../../views/BaseView/BaseView.mjs';
import Game from '../../game/Game.mjs';


export default class GameView extends BaseView {
    constructor({mapSide} = {}){
        const view = baseView({'headerType': 'back', 'navClass': 'navigation_left'});
        super(view);
        this.mapSide = mapSide;
    }

    render() {
        application.insertAdjacentHTML('beforeend', gameMap());

        const mapSize = 5;
        const playersCount = 2;
        const unitsCount = 2;

        window.game = new Game(mapSize, playersCount, unitsCount);       
    }
}


      

    




  