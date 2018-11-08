export default class Map {
    constructor(mapSide, matrix){
       this.mapSide = mapSide;
       this.matrix = matrix;
    }

    getMapSide() {
        return this.mapSide;
    }

    getMatrix() {
        return this.matrix;
    }
}