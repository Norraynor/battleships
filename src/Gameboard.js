function Gameboard(x,y) {
    function createGameboard(length){
        let arr = new Array(length || 0);
        let i = length;
    
        if (arguments.length > 1) {
            let args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createGameboard.apply(this, args);
        }
        return arr;
        
    }
    function getGameboard(){
        const gameboard = createGameboard(x,y);
        return gameboard;
    }
    //isShipPositionValid -- check if position is in grid and empty(no other ship in this elements)
    //placeShip -- place ship if valid position
    //receiveAttack --take coords and check if hit or miss || if hit then inform that Ship and record hit or miss position
    //check if all ships has been sunk

    return {
        getGameboard
    }
}
module.exports = Gameboard;