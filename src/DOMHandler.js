function DOMHandler(gameboardSize){
    function createGameboard(type,owner){
        const gameboard = document.createElement("div");
        gameboard.className = "gameboard";
        for(let i = 0; i<gameboardSize;i++){
            for(let j = 0;j<gameboardSize;j++){
                const gItem = document.createElement("div");
                gItem.className = "gameboard-item";
                gItem.id = ("" + i) + (j + "");
                gameboard.appendChild(gItem);
            }
        }
        gameboard.type = type;
        gameboard.owner = owner;
        return gameboard;
    }
    return {
        createGameboard
    }
}
module.exports = DOMHandler;