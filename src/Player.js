//computer player functions
//get its own gameboard

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
    return {
        attack,
        computerAttack,
        getGameboard,
        setTurn
    }
}
module.exports = Player;
