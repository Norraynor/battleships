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
    function placeShip(a,b, ship=null, vertical = false){
        if(isPositionValid(a,b)){
            console.log("position valid "+[a,b])
            if(vertical){
                if(isPlacementValid(a,b,ship.getLength(),vertical)){
                    console.log("placement validated for ship: "+ship.getLength()+" orientation:"+vertical);
                    for(let i=0;i<ship.getLength();i++){
                        if(ship===null){
                            shipBoard[a+i][b]="ship";
                        }else{
                            shipBoard[a+i][b]=ship;
                        }
                    }
                    return true;
                }else{
                    return false;
                }
            }else{
                if(isPlacementValid(a,b,ship.getLength(),vertical)){
                    console.log("placement validated for ship: "+ship.getLength()+" orientation:"+vertical);
                    for(let i=0;i<ship.getLength();i++){
                        if(ship===null){
                            shipBoard[a][b+i]="ship";
                        }else{
                            shipBoard[a][b+i]=ship;
                        }
                    }
                    return true;
                }else{
                    return false;
                }
            }
        }else{
            console.log("wrong coords"); 
            return false;
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
    function getSize(){
        return x;
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
        getEmptyShipCoords,
        getSize,
        isPlacementValid
    }
}
module.exports = Gameboard;