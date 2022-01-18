const gameboard = require("./Gameboard");
const ship = require("./Ship");
let shipGameboard = gameboard(3,3);
let shipGameboardV2 = gameboard(3);
let bigShipGameboard = gameboard(5);

test('gameboard creation',()=>{
    expect(shipGameboard.gameboard).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]]);
})
test('gameboard creation v2',()=>{
    expect(shipGameboardV2.gameboard).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]]);
})
test('coords validation 1',()=>{
    expect(shipGameboard.isValidCoords(0,0)).toBe(true);
})
test('coords validation 2',()=>{
    expect(shipGameboard.isValidCoords(1,2)).toBe(true);
})
test('coords validation 3',()=>{
    expect(shipGameboard.isValidCoords(2,3)).toBe(false);
})
test('coords validation 4',()=>{
    expect(shipGameboard.isValidCoords(3,4)).toBe(false);
})
beforeEach(()=>{
    shipGameboard = gameboard(3,3);
    bigShipGameboard= gameboard(5);
})
test('ship placement horizontal',()=>{
    let newS = ship(2);
    shipGameboard.placeShip(1,1,newS,false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,newS,newS],[0,0,0]])
})
test('ship placement vertical',()=>{
    let newS = ship(2);
    shipGameboard.placeShip(1,1,newS,true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,newS,0],[0,newS,0]])
})
test('2nd ship placement on taken tile',()=>{
    let newS = ship(2);
    shipGameboard.placeShip(1,1,newS,false);
    shipGameboard.placeShip(1,1,newS,true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,newS,newS],[0,0,0]])
})
test('2nd ship placement on free tile',()=>{
    let newS = ship(2);
    shipGameboard.placeShip(1,1,newS,false);
    shipGameboard.placeShip(0,1,newS,false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,newS,newS],[0,newS,newS],[0,0,0]])
})
test('ship placement horizontal too long ship',()=>{
    let newS = ship(3);
    shipGameboard.placeShip(1,1,newS,false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]])
})
test('ship placement vertical too long ship',()=>{
    let newS = ship(3);
    shipGameboard.placeShip(1,1,newS,true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]])
})
test('ship placement horizontal longer ship with valid coords',()=>{
    let newS = ship(3);
    shipGameboard.placeShip(0,0,newS,false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[newS,newS,newS],[0,0,0],[0,0,0]])
})
test('ship placement vertical longer ship with valid coords',()=>{
    let newS = ship(3);
    shipGameboard.placeShip(0,0,newS,true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[newS,0,0],[newS,0,0],[newS,0,0]])
})
test('ship placement horizontal longer ship with valid coords and invalid second one',()=>{
    let newS = ship(3);
    shipGameboard.placeShip(0,0,newS,false);
    shipGameboard.placeShip(0,0,newS,true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[newS,newS,newS],[0,0,0],[0,0,0]])
})
test('ship placement with object Ship',()=>{
    let newShip = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[newShip,newShip,0],[0,0,0],[0,0,0]])
})
test('ship hit test',()=>{
    let newShip = ship(2);
    let destro = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    shipGameboard.placeShip(2,1,destro,false);

    expect(shipGameboard.getShipGameboard()).toStrictEqual([[newShip,newShip,0],[0,0,0],[0,destro,destro]]);
    shipGameboard.placeHit(0,0);
    expect(shipGameboard.getShipGameboard()[0][0].isSunk()).toBe(false);
    shipGameboard.placeHit(0,1);
    expect(shipGameboard.getShipGameboard()[0][0].isSunk()).toBe(true);
    expect(shipGameboard.getShipGameboard()[2][1].isSunk()).toBe(false); 
})
test('ships placed array with 1 ship of length 2',()=>{
    let newShip = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    expect(shipGameboard.getPlacedShips().length).toBe(2)
})
test('ships placed array with 2 ship of length 2',()=>{
    let newShip = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    shipGameboard.placeShip(2,0,newShip,false);
    expect(shipGameboard.getPlacedShips().length).toBe(4)
})
test('ships placed array with 3 ship of length 2',()=>{
    let newShip = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    shipGameboard.placeShip(2,0,newShip,false);
    shipGameboard.placeShip(1,2,newShip,true);
    expect(shipGameboard.getPlacedShips().length).toBe(6)
})
test('ships placed array with 4 ship of length 2 but failing once',()=>{
    let newShip = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    shipGameboard.placeShip(2,0,newShip,false);
    shipGameboard.placeShip(1,2,newShip,true);
    shipGameboard.placeShip(1,1,newShip,true);
    expect(shipGameboard.getPlacedShips().length).toBe(6)
})
test('check all ships sunk to be false',()=>{
    let newS = ship(2);
    let newSh = ship(2);
    shipGameboard.placeShip(0,0,newS,false);
    shipGameboard.placeShip(1,0,newSh,false);
    expect(shipGameboard.checkAllShipsSunk()).toBe(false);
})
test('check all ships sunk to be true',()=>{
    let newS = ship(2);
    let newSh = ship(2);
    shipGameboard.placeShip(0,0,newS,false);
    shipGameboard.placeShip(1,0,newSh,false);
    shipGameboard.placeHit(0,0);
    shipGameboard.placeHit(0,1);
    shipGameboard.placeHit(1,0);
    shipGameboard.placeHit(1,1);
    expect(shipGameboard.checkAllShipsSunk()).toBe(true);
})
test('check hit gameboard with 1 hit',()=>{
    shipGameboard.placeHit(0,0);
    expect(shipGameboard.getHitGameboard()).toStrictEqual([["x",0,0],[0,0,0],[0,0,0]])
})
test('check hit gameboard with 1 hit and ship placed',()=>{
    let newS = ship(2);
    shipGameboard.placeShip(0,0,newS,false);
    shipGameboard.placeHit(0,0);
    expect(shipGameboard.getHitGameboard()).toStrictEqual([["x",0,0],[0,0,0],[0,0,0]])
})
test('check hit gameboard with 2 hit and long ship placed',()=>{
    let newS = ship(3);
    shipGameboard.placeShip(0,0,newS,false);
    shipGameboard.placeHit(0,0);
    shipGameboard.placeHit(0,2);
    expect(shipGameboard.getHitGameboard()).toStrictEqual([["x",0,"x"],[0,0,0],[0,0,0]])
})
test('check all empty coords to be empty',()=>{
    expect(gameboard(2,2).getEmptyHitCoords()).toStrictEqual([[0,0],[0,1],[1,0],[1,1]]);
})
test('check placement validation',()=>{    
    let maxShip = ship(5);
    let bigShip = ship(4);
    bigShipGameboard.placeShip(0,2,maxShip,true);
    expect(bigShipGameboard.placeShip(0,2,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(1,2,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(2,2,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(3,2,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(4,2,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(2,0,bigShip,false)).toBe(false);
    expect(bigShipGameboard.placeShip(2,1,bigShip,false)).toBe(false);
    expect(bigShipGameboard.placeShip(2,2,bigShip,false)).toBe(false);
    expect(bigShipGameboard.placeShip(2,3,bigShip,false)).toBe(false);
    expect(bigShipGameboard.placeShip(2,4,bigShip,false)).toBe(false);

    expect(bigShipGameboard.placeShip(1,0,bigShip,true)).toBe(true);
    expect(bigShipGameboard.placeShip(1,1,bigShip,true)).toBe(true);
    expect(bigShipGameboard.placeShip(1,2,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(1,3,bigShip,true)).toBe(false);
    expect(bigShipGameboard.placeShip(1,4,bigShip,true)).toBe(false);



    expect(bigShipGameboard.getShipGameboard()).toBe(bigShip);

    expect(bigShipGameboard.getShipGameboard()[0][2]).toBe(maxShip);
    expect(bigShipGameboard.getShipGameboard()[1][2]).toBe(maxShip);
    expect(bigShipGameboard.getShipGameboard()[2][2]).toBe(maxShip);
    expect(bigShipGameboard.getShipGameboard()[3][2]).toBe(maxShip);
    expect(bigShipGameboard.getShipGameboard()[4][2]).toBe(maxShip);

})