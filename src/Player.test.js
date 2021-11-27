const gameboard = require("./Gameboard");
const player = require("./Player");
let hPlayer = player(gameboard(2,2));
let cPlayer = player(gameboard(2,2));

beforeEach(()=>{
    hPlayer = player(gameboard(2,2));
    cPlayer = player(gameboard(2,2));
})
test('check player making attack when its his turn',()=>{
    hPlayer.setTurn(true);
    hPlayer.attack(0,0);
    expect(hPlayer.getGameboard().getHitGameboard()).toStrictEqual([["x",0],[0,0]]);
})
test('check player making attack when not his turn',()=>{
    hPlayer.setTurn(false);
    hPlayer.attack(0,0);
    expect(hPlayer.getGameboard().getHitGameboard()).toStrictEqual([[0,0],[0,0]]);
})
test('check turn switching to true',()=>{
    expect(hPlayer.setTurn(true)).toBe(true);
})
test('check turn switching to false',()=>{
    expect(hPlayer.setTurn(false)).toBe(false);
})