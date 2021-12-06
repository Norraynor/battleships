function DOMHandler(gameboardSize){
    function createGameboard(type,owner){
        const gameboard = document.createElement("div");
        gameboard.className = "gameboard";
        gameboard.owner = owner;
        gameboard.type = type;
        for(let i = 0; i<gameboardSize;i++){
            for(let j = 0;j<gameboardSize;j++){
                const gItem = document.createElement("div");
                gItem.className = "gameboard-item";
                gItem.id = ("" + i) + (j + "");
                gItem.addEventListener("click",()=>{
                    console.log({gItem,gameboard});
                    //here it should mark hit and record it on gameboard
                })
                gameboard.appendChild(gItem);
            }
        }
        gameboard.type = type;
        gameboard.owner = owner;
        return gameboard;
    }
    function refreshGameboard(){
        //after click should mark spot and tell gameboard that it has been hit
        //refresh gameboard based on hits and ships
    }
    return {
        createGameboard
    }
}
module.exports = DOMHandler;