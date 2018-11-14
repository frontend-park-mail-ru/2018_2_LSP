import Map from '/scripts/game/Map.mjs';

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

/*
Распределение представленно следующим образом:
array => [
    [0] => [0, 1],
    [1] => [1, 5],
    [2] => [4, 2],
    [3] => [5, 1]
]
где левый столбец - номера в массиве, правый кортеж: первый элемент - ID карты, второй - количество карт
*/
  
export default class MapBuilder {    
    static generateMap(distribution) {
        let totalCards = 0;
        for (let i = 0; i < distribution.length; i++) { // подсчет общего кол-ва карт 
            totalCards += distribution[i][1];
        }
        let mapSize = Math.sqrt(totalCards);

        let matrix = [];
        for (let i = 0; i < mapSize; i++) { // создание массива игровых карт
            matrix[i] = new Array(mapSize);
        }

        let x = 0;
        let y = 0;
        while (distribution.length > 0) {
            let index = this._getRandomInt(0, distribution.length - 1); // получение индекса типа карты
            let cardType = distribution[index][0];  // тип карты
            distribution[index][1]--;   // уменьшение кол-ва
            if (distribution[index][1] == 0) {
                distribution.remove(index);
            }
            matrix[x][y] = cardType;
            x++;
            if (x == mapSize) {
                x = 0;
                y++;
            }
        }
        let map = new Map(matrix, mapSize);
        return map;
    }

    static _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
