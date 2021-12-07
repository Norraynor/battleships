//computer player functions
//get its own gameboard

const ship = require("./Ship");

function Player(gameboard){
    let turn = false;
    function attack(x,y){
        //attack opponent or receive attack
        //place hit on the gameboard
        if(turn){
            gameboard.placeHit(x,y);
        }
    }
    function computerAttack(){
        if(turn){
            //select random from array of coordinates
            randomCoords = gameboard.getEmptyHitCoords()[Math.floor(Math.random()*getEmptyHitCoords().length)];
            //do attack on random coords
            gameboard.placeHit(randomCoords[0],randomCoords[1]);
        }
    }
    function getGameboard(){
        return gameboard;
    }
    function setTurn(newTurn){
        return turn = newTurn;
    }
    function templateShipsPopulate(){
        const size2 = ship(2);
        const size3 = ship(3);
        const size4 = ship(4);
        const size5 = ship(5);
        console.log(gameboard);
        gameboard.placeShip(0,1,size2,false);
        gameboard.placeShip(0,0,size3,true);
        gameboard.placeShip(3,0,size4,false);
        gameboard.placeShip(0,4,size5,true);
    }
    return {
        attack,
        computerAttack,
        getGameboard,
        setTurn,
        templateShipsPopulate
    }
}
module.exports = Player;
