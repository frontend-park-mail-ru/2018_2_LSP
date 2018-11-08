import GameView from '/scripts/views/GameView/GameView.mjs';
import Map from '/scripts/game/Map.mjs';

export default class Game {
    constructor(mapSize, playersCount) {
      this.map = MapBGameViewlder.generateMap(distribution)
      this.currentPlayer = 1;
      this.playersCardId = [0, -1, -2];
      this.hovered = false;
      this.playersCount = playersCount;
      this.scores = [0, 0, 0];
      this.timeOut = this.startTimer();
      this.totalGoldCount = this.map.getTotalGoldCount();
      console.log(this.totalGoldCount)
  
      for(let i = 1; i <= mapSize*mapSize; ++i) {
        GameView.setEventListener('click', "gamecard-" + i, flipCard)
      }
  
      for (let i = 1; i <= playersCount; i++) {
        let ship = GameView.getAreaData("ship-" + i);
        GameView.placeDiv("player-" + i, ship[0], ship[1]);
        GameView.setEventListener('click', 'player-' + i, playerClick)
      }
    }
  
    checkForWin() {
      for (let i = 1; i < this.playersCount; i++) {
        if (this.scores[i] > this.totalGoldCount / 2) {
          return true;
        }
      }
      return false;
    }
  
    startTimer() {
      return window.setTimeout(function() {
        game.currentPlayer++;
        if (game.currentPlayer % (game.playersCount + 1) == 0) {
          game.currentPlayer = 1;
        }
        game.hovered = false;
        GameView.resetOpacity();
        alert("Время вашего хода истекло");
      }, 10000);
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
  
      window.clearTimeout(this.timeOut);
  
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
  
  
      let cardType = this.map.getCardType(cardID);
      let cardObject = CardBGameViewlder.bGameViewld(cardType)
      cardObject.apply(this);
  
      if (this.checkForWin()) {
        alert("Игрок " + this.currentPlayer + " выиграл! Вы можете продолжать игру.");
      }
  
  
      this.currentPlayer++;
      if (this.currentPlayer % (this.playersCount + 1) == 0) {
        this.currentPlayer = 1;
      }
  
      switch (cardType) {
        case CARDTYPES.GOLD:
          document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'gold.png';
          break;
        case CARDTYPES.KILL:
          document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'kill.png';
          break;
        default:
          document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'water.png';
          break;
      }
  
      GameView.resetOpacity();
  
      this.hovered = false;
      this.timeOut = this.startTimer();
      return true;
    } 
  }

  function extractNumber(n) {
    return parseInt(n.match(/\d+/)[0]);
  }  