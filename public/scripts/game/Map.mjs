export default class Map {
    constructor(size) {
      this.size = size;
    }
    getCardType(id) {
      return this._getRandomInt(1, 3);
    }
    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getMoveableCards(cardID) {
      let res = [];
      if (cardID < 0)
      {
        if (cardID == -1)
        {
          let temp = Math.ceil(this.size/2)
          res = [temp-1, temp, temp+1]
        }
        else if (cardID == -2)
        {
          let temp = this.size*this.size - Math.floor(this.size/2)
          res = [temp-1, temp, temp+1]
        }
      }
      else
      {
        if ((cardID + 1) % this.size != 1)
        {
          res.push(cardID + 1)
        }
        if ((cardID - 1) % this.size != 0)
        {
          res.push(cardID - 1)
        }
        if (cardID - 5 >= 1)
        {
          res.push(cardID - 5)
        }
        if (cardID - 6 >= 1)
        {
          res.push(cardID - 6)
        }
        if (cardID - 4 >= 1)
        {
          res.push(cardID - 4)
        }
        if (cardID + 5 <= this.size * this.size)
        {
          res.push(cardID + 5)
        }
        if (cardID + 6 <= this.size * this.size)
        {
          res.push(cardID + 6)
        }
        if (cardID + 4 <= this.size * this.size)
        {
          res.push(cardID + 4)
        }
      }
      return res
    }
    
  }