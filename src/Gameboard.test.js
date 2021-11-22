const gameboard = require("./Gameboard");
const ship = require("./Ship");
let shipGameboard = gameboard(3,3);

test('gameboard creation',()=>{
    expect(shipGameboard.gameboard).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]]);
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
})
test('ship placement horizontal',()=>{
    shipGameboard.placeShip(1,1,ship(2),false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,"ship","ship"],[0,0,0]])
})
test('ship placement vertical',()=>{
    shipGameboard.placeShip(1,1,ship(2),true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,"ship",0],[0,"ship",0]])
})
test('2nd ship placement on taken tile',()=>{
    shipGameboard.placeShip(1,1,ship(2),false);
    shipGameboard.placeShip(1,1,ship(2),true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,"ship","ship"],[0,0,0]])
})
test('2nd ship placement on free tile',()=>{
    shipGameboard.placeShip(1,1,ship(2),false);
    shipGameboard.placeShip(0,1,ship(2),false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,"ship","ship"],[0,"ship","ship"],[0,0,0]])
})
test('ship placement horizontal too long ship',()=>{
    shipGameboard.placeShip(1,1,ship(3),false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]])
})
test('ship placement vertical too long ship',()=>{
    shipGameboard.placeShip(1,1,ship(3),true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,0,0],[0,0,0]])
})
test('ship placement horizontal longer ship with valid coords',()=>{
    shipGameboard.placeShip(0,0,ship(3),false);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([["ship","ship","ship"],[0,0,0],[0,0,0]])
})
test('ship placement vertical longer ship with valid coords',()=>{
    shipGameboard.placeShip(0,0,ship(3),true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([["ship",0,0],["ship",0,0],["ship",0,0]])
})
test('ship placement horizontal longer ship with valid coords and invalid second one',()=>{
    shipGameboard.placeShip(0,0,ship(3),false);
    shipGameboard.placeShip(0,0,ship(3),true);
    expect(shipGameboard.getShipGameboard()).toStrictEqual([["ship","ship","ship"],[0,0,0],[0,0,0]])
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
test.only('ships placed array with 4 ship of length 2 but failing once',()=>{
    let newShip = ship(2);
    shipGameboard.placeShip(0,0,newShip,false);
    shipGameboard.placeShip(2,0,newShip,false);
    shipGameboard.placeShip(1,2,newShip,true);
    shipGameboard.placeShip(1,1,newShip,true);
    expect(shipGameboard.getPlacedShips().length).toBe(6)
})