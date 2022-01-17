const EMPTY_SPACE = 0;
const HIT ="x";

function Gameboard(x,y=null) {
    if(y===null){
        y=x;
    }
    const ship = require("./Ship");
    const board = createGameboard(x,y);
    let shipBoard= JSON.parse(JSON.stringify(board));
    let hitBoard = JSON.parse(JSON.stringify(board));

    function createGameboard(x=0,y=0){
        let innerArr = new Array(y).fill(EMPTY_SPACE);
        let arr = new Array(x).fill(innerArr);
        return arr;
    }
    function isPlacementValid(a,b,length,vertical){
        if(vertical){
            for(let i=0;i<length;i++){
                if(!isPositionValid(a+i,b)){
                    return false;
                }
            }
            return true;
        }
        else{
            for(let i=0;i<length;i++){
                if(!isPositionValid(a,b+i)){
                    return false;
                }
            }
            return true;
        }
    }
    /*function isPlacementValid(a1,b1,a2,b2,vertical){
        console.log("checking placement",{a1,a2,b1,b2});
        if(!vertical){
            //check starting pos
            if(isPositionValid(a1,b1)){
                //check end pos
                if(isPositionValid(a1,b2)){
                    //go through every position
                    for(let i = b1;i<=b2;i++){
                        console.log(i)
                        if(!isPositionValid(a1,i)){
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        if(vertical){
            if(isPositionValid(a1,b1)){
                if(isPositionValid(a2,b1)){
                    for(let i = a1;i<=a2;i++){
                        console.log(i)
                        if(!isPositionValid(i,b1)){
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }*/

    //need to fix placement issues where it doesnt check all the tiles on the way
    function placeShip(a,b, ship=null, vertical = false){
        console.log(isPlacementValid(a,b,ship.getLength(),vertical))
        /*if(vertical){
            if(isPlacementValid(a,b,a+ship.getLength()-1,b),vertical){
                for(let i=0;i<ship.getLength();i++){
                    if(ship===null){
                        shipBoard[a+i][b]="ship";
                    }else{
                        shipBoard[a+i][b]=ship;
                    }
                }                
            }
        }else{
            if(isPlacementValid(a,b,a,b+ship.getLength()-1),vertical){
                for(let i=0;i<ship.getLength();i++){
                    if(ship===null){
                        shipBoard[a][b+i]="ship";
                    }else{
                        shipBoard[a][b+i]=ship;
                    }
                }                
            }
        }*/
        
        if(isPositionValid(a,b)){
            if(vertical){
                if(isPositionValid(a+ship.getLength()-1,b)){
                    if(isPlacementValid(a,b,ship.getLength(),vertical)){
                        for(let i=0;i<ship.getLength();i++){
                            if(ship===null){
                                shipBoard[a+i][b]="ship";
                            }else{
                                shipBoard[a+i][b]=ship;
                            }
                        }
                    }
                    return true;
                }else{
                    //console.log("ship too long");
                    return false;
                }
            }else{
                if(isPositionValid(a,b+ship.getLength()-1)){
                    if(isPlacementValid(a,b,ship.getLength(),vertical)){
                        for(let i=0;i<ship.getLength();i++){
                            if(ship===null){
                                shipBoard[a][b+i]="ship";
                            }else{
                                shipBoard[a][b+i]=ship;
                            }
                        }
                    }
                    return true;
                }else{
                    //console.log("ship too long");
                    return false;
                }
            }
            console.log({board,shipBoard});
            return console.log("placed ship"); 
        }else{
            //console.log("wrong coords"); 
        }
    }
    function placeHit(a,b){
        if(hitBoard[a][b]!== HIT){
            if(typeof shipBoard[a][b] === 'object'){
                shipBoard[a][b].hit();
            }
            hitBoard[a][b] = HIT;
            return true;
        }
        else{
            console.log("place already hit");
            return false;
        }
    }
    function isValidCoords(a,b){
        if(a>board.length-1 || b>board.length-1){
            return false;
        }
        return true;
    }
    function getPlacedShips(){
        let objArr = [];
        for(let i=0;i<x;i++){
            objArr.push(...(shipBoard[i].filter(obj=> typeof obj==='object')))
        }
        return objArr;
    }
    function checkAllShipsSunk(){
        const shipsArr = getPlacedShips();
        for(let i=0;i<shipsArr.length;i++){
            if(!shipsArr[i].isSunk()){
                return false;
            }
        }
        return true;
    }
    function isPositionValid(a,b){
        if(isValidCoords(a,b) && shipBoard[a][b] === EMPTY_SPACE){
            return true;
        }
        return false;
    }
    function getShipGameboard(){
        return shipBoard;
    }
    function getHitGameboard(){
        return hitBoard;
    }
    function getEmptyHitCoords(){
        let arr =[];
        for(let i = 0;i<hitBoard.length;i++){
            for(let j = 0;j<hitBoard[0].length;j++){
                if(hitBoard[i][j] !== HIT){
                    arr.push([i,j]);
                }
            }
        }
        return arr;
    }
    function getEmptyShipCoords(){
        let arr =[];
        for(let i = 0;i<shipBoard.length;i++){
            for(let j = 0;j<shipBoard[0].length;j++){
                if(shipBoard[i][j] !== HIT){
                    arr.push([i,j]);
                }
            }
        }
        return arr;
    }

    return {
        gameboard: board,
        isValidCoords,
        placeShip,
        placeHit,
        getShipGameboard,
        getPlacedShips,
        checkAllShipsSunk,
        getHitGameboard,
        getEmptyHitCoords,
        getEmptyShipCoords
    }
}
module.exports = Gameboard;