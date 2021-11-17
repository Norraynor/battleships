function Gameboard(x,y) {
    const ship = require("./Ship");
    const board = createGameboard(x,y);
    let shipBoard = board;
    let hitBoard = board;

    function createGameboard(x=0,y=0){
        let innerArr = new Array(y).fill(0);
        let arr = new Array(x).fill(innerArr);
        return arr;
    }
    function getGameboard(){
        const gameboard = createGameboard(x,y);
        return gameboard;
    }
    function placeShip(a,b){
        //create ship at given location
        //check if location is valid
    }
    function placeHit(a,b){
    }
    function isValidCoords(a,b){
        if(a<board.length || b<board[0].length){
            return true;
        }
        return false;
    }
    function getShipGameboard(){
        return shipBoard;
    }
    //isShipPositionValid -- check if position is in grid and empty(no other ship in this elements)
    //placeShip -- place ship if valid position
    //receiveAttack --take coords and check if hit or miss || if hit then inform that Ship and record hit or miss position
    //check if all ships has been sunk

    return {
        gameboard: board,
        isValidCoords,
        placeShip,
        placeHit,
        getShipGameboard
    }
}
module.exports = Gameboard;