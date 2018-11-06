
export default class GameMap {
    constructor({boardSize, cardSize} = {}){
        this.boardSize = boardSize;
        this.cardSize = cardSize;
    }

    render() {
        //const view = map({'headerType': 'back','navClass': 'backButton', 'title': 'Правила'});
        const view = gameMap({"cardsQuantity": this.boardSize * this.boardSize});
        application.insertAdjacentHTML('beforeend', view);

        // const gameBoard = document.getElementById("gameBoard");
        // gameBoard.style.width = '' + this.boardSize; px
        // gameBoard.style.height = '' + this.boardSize; px

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.addEventListener('click', flipCard));
    }
}

function flipCard() {
    this.classList.add('flip');
    
    // setTimeout(() => {
    //   this.classList.remove('flip');
    // }, 1500);
}