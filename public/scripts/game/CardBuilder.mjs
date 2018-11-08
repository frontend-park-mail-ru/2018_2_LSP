let CARDTYPES = {}
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

export class CardBuilder {
  constructor() {}
  static build(id) {
    switch (id) {
      case CARDTYPES.GOLD:
        return new GoldCard();
      case CARDTYPES.KILL:
        return new KillCard();
      default:
        return new EmptyCard();
    }
  }
}

export class GoldCard {
  constructor() {}
  apply(game) {
    let cardID = game.playersCardId[game.currentPlayer];
    if (game.map.getGoldOnTitle(cardID) > 0) {
      game.map.decreaseGold(cardID);
      game.scores[game.currentPlayer] += 1;
      alert("Вы нашли сундук! Получите пироженку в подарок. Теперь у вас " + game.scores[game.currentPlayer] + " пирожен(?)");
    }
  }
}

export class EmptyCard {
  constructor() {}
  apply(game) {}
}

export class KillCard {
    constructor() {}
    apply(game) {
      let cardData = UI.getAreaData("ship-" + game.currentPlayer)
      UI.placeDiv("player-" + game.currentPlayer, cardData[0], cardData[1])
      game.playersCardId[game.currentPlayer] = -game.currentPlayer;
    }
}

