const gameboard = require("./Gameboard");
const shipGameboard = gameboard(2,3);

test('gameboard creation',()=>{
    expect(shipGameboard.gameboard).toStrictEqual([[0,0,0],[0,0,0]]);
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

xtest('ship placement',()=>{
    shipGameboard.placeShip(1,1)
    expect(shipGameboard.getShipGameboard()).toStrictEqual([[0,0,0],[0,0,0]])
})