
export default class GameMap {
    constructor({boardSide, cardSize} = {}){
        this.boardSide = boardSide;
    }

    render() {
        //const view = map({'headerType': 'back','navClass': 'backButton', 'title': 'Правила'});
        var cars = new Array(this.boardSide * this.boardSide);
        const view = gameMap({"cardsQuantity": cars});
        application.insertAdjacentHTML('beforeend', view);        

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