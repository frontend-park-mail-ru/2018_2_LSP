import GameView from '/scripts/views/GameView/GameView.mjs';
import Map from '/scripts/game/Map.mjs';

export default class Game {
    constructor(mapSize, playersCount) {
      this.map = new Map(mapSize)
  
      this.currentPlayer = 1;
      this.playersCardId = [0, -1, -2];
      this.hovered = false;
      this.playersCount = playersCount;
  
      for(let i = 1; i <= mapSize*mapSize; ++i) {
        GameView.setEventListener('click', "gamecard-" + i, flipCard())
      }
  
      for (let i = 1; i <= playersCount; i++) {
        let ship = GameView.getAreaData("ship-" + i);
        GameView.placeDiv("player-" + i, ship[0], ship[1]);
        GameView.setEventListener('click', 'player-' + i, playerClick())
      }
    }
  
    playerClick(id) {
      if (extractNumber(id) != this.currentPlayer)
      {
        return;
      }
    
      if (!this.hovered) {
        this.hovered = true;
        GameView.setLowOpacity();
        let moveableCards = this.map.getMoveableCards(this.playersCardId[this.currentPlayer])
        moveableCards.forEach(function(id) {
          document.getElementById("gamecard-" + id).style.opacity = 1;
        });
      }
      else
      {
        this.hovered = false
        GameView.resetOpacity();
      }
    }
  
    flipCard(id) {
      if (!this.hovered) {
        return false;
      }
      let cardID = parseInt(id.match(/\d+/)[0]);
      let moveableCards = this.map.getMoveableCards(this.playersCardId[this.currentPlayer])
      if (moveableCards.indexOf(cardID) == -1)
      {
        return false;
      }
  
      for (let i = 1; i < this.playersCount + 1; i++) {
        if (this.playersCardId[i] == cardID) {
          let cardData = GameView.getAreaData("ship-" + i)
          GameView.placeDiv("player-" + i, cardData[0], cardData[1])
          this.playersCardId[i] = -i;
        }
      }
  
      let cardData = GameView.getAreaData("gamecard-" + cardID)
      GameView.placeDiv("player-" + this.currentPlayer, cardData[0], cardData[1])
      this.playersCardId[this.currentPlayer] = cardID;
      this.currentPlayer++;
      if (this.currentPlayer % (this.playersCount + 1) == 0) {
        this.currentPlayer = 1;
      }
  
      GameView.resetOpacity();
  
      this.hovered = false;
      return true;
      // let cardType = map.getCardType(cardID);
      // let cardObject = CardBGameViewlder.bGameViewld(cardType)
    } 
  }

  function extractNumber(n) {
    return parseInt(n.match(/\d+/)[0]);
  }  