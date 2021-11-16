const gameboard = require("./Gameboard");

test('gameboard creation',()=>{
    expect(gameboard(2).getGameboard()).toStrictEqual([[],[]]);
})