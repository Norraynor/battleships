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