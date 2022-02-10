//computer player functions
//get its own gameboard

const Gameboard = require("./Gameboard");
const ship = require("./Ship");

function Player(gameboard){
    let playerGameboard = gameboard;
    let turn = false;
    let ships = [];
    function attack(x,y){
        //attack opponent or receive attack
        //place hit on the gameboard
        if(turn){
            playerGameboard.placeHit(x,y);
        }
    }
    function createShips(){
        for(let i = 1;i<playerGameboard.getSize();i++){
            ships.push(ship(i));
        }
    }
    createShips();

    function computerAttack(event){
        //select random from array of coordinates
        randomCoords = playerGameboard.getEmptyHitCoords()[Math.floor(Math.random()*playerGameboard.getEmptyHitCoords().length)];
        //do attack on random coords
        if(randomCoords){
            playerGameboard.placeHit(randomCoords[0],randomCoords[1]);
        }
        
        event.target.dispatchEvent(new Event('refresh',{
            bubbles:true,
            cancelable:true
        }));
        /*event.target.dispatchEvent(new Event('turn',{
            bubbles:true,
            cancelable:true
        }));*/
    }
    function getGameboard(){
        return playerGameboard;
    }
    function setTurn(newTurn){
        return turn = newTurn;
    }
    function getTurn(){
        return turn;
    }
    function getShips(){
        return ships;
    }
    function templateShipsPopulate(){
        const size2 = ship(2);
        const size3 = ship(3);
        const size4 = ship(4);
        const size5 = ship(5);
        //const size6 = ship(6);

        console.log(gameboard);
        playerGameboard.placeShip(0,1,size2,false);
        playerGameboard.placeShip(0,0,size3,true);
        playerGameboard.placeShip(3,0,size4,false);
        playerGameboard.placeShip(0,4,size5,true);
        //gameboard.placeShip(5,0,size6,false);

    }
    function randomizeShipsPopulate(){
        const size2 = ship(2);
        const size3 = ship(3);
        const size4 = ship(4);
        const size5 = ship(5);
        //const size6 = ship(6);
        //const arr=[size2,size3,size4,size5];
        const arr = getShips();
        while(arr.length>0){
            randomCoords = playerGameboard.getEmptyShipCoords()[Math.floor(Math.random()*playerGameboard.getEmptyShipCoords().length)];
            if(playerGameboard.placeShip(randomCoords[0],randomCoords[1],arr[arr.length-1],(Math.random()<0.5))){
                arr.pop();
            }
        }
    }

    function reset(){
        const size = gameboard.getSize();
        playerGameboard = Gameboard(size);
        ships=[];
        createShips();
    }

    return {
        attack,
        computerAttack,
        getGameboard,
        setTurn,
        templateShipsPopulate,
        getTurn,
        randomizeShipsPopulate,
        getShips,
        reset
    }
}
module.exports = Player;
