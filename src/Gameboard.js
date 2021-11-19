function Gameboard(x,y) {
    const ship = require("./Ship");
    const board = createGameboard(x,y);
    let shipBoard= JSON.parse(JSON.stringify(board));
    let hitBoard = JSON.parse(JSON.stringify(board));

    function createGameboard(x=0,y=0){
        let innerArr = new Array(y).fill(0);
        let arr = new Array(x).fill(innerArr);
        return arr;
    }
    /*function getGameboard(){
        const gameboard = createGameboard(x,y);
        return gameboard;
    }*/
    function placeShip(a,b, ship=null, vertical = false){
        //needs position checking (checks if item is not already taken by other ship)
        console.log({board,shipBoard,ship});
        console.log(ship.getLength());
        if(isValidCoords(a,b)){
            if(vertical){
                if(isValidCoords(a+ship.getLength()-1,b)){
                    for(let i=0;i<ship.getLength();i++){
                        shipBoard[a+i][b]="ship";
                    }
                }
            }else{
                if(isValidCoords(a,b+ship.getLength()-1)){
                    for(let i=0;i<ship.getLength();i++){
                        shipBoard[a][b+i]="ship";
                    }
                }
            }            
            console.log({board,shipBoard});
            return console.log("placed ship");
        }
        console.log("wrong coords");

        //create ship at given location
        //check if location is valid
    }
    function placeHit(a,b){
    }
    function isValidCoords(a,b){
        if(a>board.length-1 || b>board.length-1){
            return false;
        }
        return true;
    }
    function isPositionValid(a,b){
        
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