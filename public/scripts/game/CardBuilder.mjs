class GoldCard {
    constructor() {}
}
  
class EmptyCard {
    constructor() {}
}
  
class KillCard {
      constructor() {}
}

class CardBuilder {
    constructor() {}
    static build(id) {
      switch (id) {
        case 1:
          return new GoldCard();
        case 2:
          return new EmptyCard();
        case 3:
          return new KillCard();
      }
    }
}