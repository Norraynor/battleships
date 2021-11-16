const ship = require("./Ship");
let testShip = ship(3);
let i = 0;

beforeEach(() => {
    testShip.hit(i);
});
afterEach(()=>{
    i++;
})
afterAll(()=>{
    i=0;
})
//test if ship sinks after all hits
test('1st hit sunk and hit test on ship of length equal to 3',()=>{
    expect(testShip.isSunk()).toBe(false);
})
test('2nd hit sunk and hit test on ship of length equal to 3',()=>{
    expect(testShip.isSunk()).toBe(false);
})
test('3rd hit sunk and hit test on ship of length equal to 3',()=>{
    expect(testShip.isSunk()).toBe(true);
})
//ship length test
test('ship length',()=>{
    expect(testShip.getLength()).toBe(3);
})