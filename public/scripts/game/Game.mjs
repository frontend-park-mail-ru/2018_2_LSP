import MapBuilder from '/scripts/game/MapBuilder.mjs'
import {CardBuilder, GoldCard, EmptyCard, KillCard} from '/scripts/game/CardBuilder.mjs'

let CARDTYPES = {}
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

const distribution = [[CARDTYPES.DEFAULT, 17], [CARDTYPES.GOLD, 6], [CARDTYPES.KILL, 2]];

let document;

function playerClick() {
  window.game.playerClick(this.id);
}

function flipCard() {
  if (window.game.flipCard(this.id)) {
    this.classList.add('flip');
  }
}

export default class Game {
    constructor(doc, mapSize, playersCount) {
      document = doc;
      UI.document = doc;
      this.map = MapBuilder.generateMap(distribution)
      this.currentPlayer = 1;
      this.playersCardId = [0, -1, -2];
      this.hovered = false;
      this.playersCount = playersCount;
      this.scores = [0, 0, 0];
      this.timeOut = this.startTimer();
      this.totalGoldCount = this.map.getTotalGoldCount();
      console.log(this.totalGoldCount)
  
      for(let i = 1; i <= mapSize*mapSize; ++i) {
        UI.setEventListener(document, 'click', "gamecard-" + i, flipCard)
      }
  
      for (let i = 1; i <= playersCount; i++) {
        let ship = UI.getAreaData("ship-" + i);
        UI.placeDiv("player-" + i, ship[0], ship[1]);
        UI.setEventListener(document, 'click', 'player-' + i, playerClick)
      }
    }
  
    checkForWin() {
      for (let i = 1; i < this.playersCount; i++) {
        if (this.scores[i] > this.totalGoldCount / 2) {
          alert("Игрок " + this.currentPlayer + " выиграл! Вы можете продолжать игру (тестовый режим).");
          return true;
        }
      }
      return false;
    }
  
    startTimer() {
      return window.setTimeout(function() {
        window.game.currentPlayer++;
        if (window.game.currentPlayer % (window.game.playersCount + 1) == 0) {
          window.game.currentPlayer = 1;
        }
        window.game.hovered = false;
        UI.resetOpacity(document);
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
        UI.setLowOpacity(document);
        let moveableCards = this.map.getMoveableCards(this.playersCardId[this.currentPlayer])
        moveableCards.forEach(function(id) {
          document.getElementById("gamecard-" + id).style.opacity = 1;
        });
      }
      else
      {
        this.hovered = false
        UI.resetOpacity(document);
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
          let cardData = UI.getAreaData("ship-" + i)
          UI.placeDiv(document, "player-" + i, cardData[0], cardData[1])
          this.playersCardId[i] = -i;
        }
      }
  
      let cardData = UI.getAreaData("gamecard-" + cardID)
      UI.placeDiv("player-" + this.currentPlayer, cardData[0], cardData[1])
      this.playersCardId[this.currentPlayer] = cardID;
  
  
      let cardType = this.map.getCardType(cardID);
      let cardObject = CardBuilder.build(cardType);
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
          document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'img/gold.png';
          break;
        case CARDTYPES.KILL:
          document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'img/kill.png';
          break;
        default:
          document.getElementById("gamecard-" + cardID).getElementsByTagName('img')[0].src = 'img/water.png';
          break;
      }
  
      UI.resetOpacity(document);
  
      this.hovered = false;
      this.timeOut = this.startTimer();
      return true;
    } 
  }

  function extractNumber(n) {
    return parseInt(n.match(/\d+/)[0]);
  }

  export class UI {
    static resetOpacity(document) {
      for(let i = 1; i <= game.map.size * game.map.size; ++i) {
          document.getElementById("gamecard-" + i).style.opacity = 1;
      }
    }
  
    static setLowOpacity(document) {
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
    
    static setEventListener(document, type, id, listener) {
      console.log(document)
      document.getElementById(id).addEventListener(type, listener)
    }
  }