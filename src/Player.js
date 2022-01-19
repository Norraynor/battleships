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
    function computerAttack(event){
        //select random from array of coordinates
        randomCoords = gameboard.getEmptyHitCoords()[Math.floor(Math.random()*gameboard.getEmptyHitCoords().length)];
        //do attack on random coords
        if(randomCoords){
            gameboard.placeHit(randomCoords[0],randomCoords[1]);
        }
        else{
            console.log("no more moves")
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
        return gameboard;
    }
    function setTurn(newTurn){
        return turn = newTurn;
    }
    function getTurn(){
        return turn;
    }
    function templateShipsPopulate(){
        const size2 = ship(2);
        const size3 = ship(3);
        const size4 = ship(4);
        const size5 = ship(5);
        //const size6 = ship(6);

        console.log(gameboard);
        gameboard.placeShip(0,1,size2,false);
        gameboard.placeShip(0,0,size3,true);
        gameboard.placeShip(3,0,size4,false);
        gameboard.placeShip(0,4,size5,true);
        //gameboard.placeShip(5,0,size6,false);

    }
    function randomizeShipsPopulate(){
        const size2 = ship(2);
        const size3 = ship(3);
        const size4 = ship(4);
        const size5 = ship(5);
        //const size6 = ship(6);
        const arr=[size2,size3,size4,size5];

        while(arr.length>0){
            randomCoords = gameboard.getEmptyShipCoords()[Math.floor(Math.random()*gameboard.getEmptyShipCoords().length)];
            if(gameboard.placeShip(randomCoords[0],randomCoords[1],arr[arr.length-1],(Math.random()<0.5))){
                console.log("successfully placed ship")
                arr.pop();
            }
            else{
                console.log("failed to place ship");
            }
        }
    }
    return {
        attack,
        computerAttack,
        getGameboard,
        setTurn,
        templateShipsPopulate,
        getTurn,
        randomizeShipsPopulate
    }
}
module.exports = Player;
