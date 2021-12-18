function DOMHandler(gameboardSize){
    //add something to show that ship is hit and sunk
    //something to notify all ships destroyed
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
                if(owner.getGameboard().getShipGameboard()[i][j] !== 0 && type!=="hit"){
                    gItem.attributes.ship = owner.getGameboard().getShipGameboard()[i][j]
                    gItem.classList.add("ship");
                }
                if(owner.getGameboard().getHitGameboard()[i][j] !== 0 && type!=="ship" && !gItem.classList.contains("hit")){
                    gItem.attributes.ship = owner.getGameboard().getHitGameboard()[i][j]
                    if(owner.getGameboard().getShipGameboard()[i][j] === 0){
                        gItem.classList.add("hitf");
                    }else{
                        if(owner.getGameboard().getShipGameboard()[i][j].isSunk()){
                            gItem.classList.add("hitsunk");
                        }
                        gItem.classList.add("hits");
                    }
                }
                gItem.addEventListener("click",(event)=>{
                    console.log(event);
                    console.log({gItem,gameboard});
                    //here it should mark hit and record it on gameboard
                    owner.getGameboard().placeHit(gItem.id[0],gItem.id[1]);
                    //refreshGameboard(i,j,owner,type);
                    if(!event.target.classList.contains("hit")){
                        event.target.dispatchEvent(new Event('refresh',{
                            bubbles:true,
                            cancelable:true
                        }));
                    }
                    /*event.target.dispatchEvent(new Event('turn',{
                        bubbles:true,
                        cancelable:true
                    }));*/
                })
                gameboard.appendChild(gItem);
            }
        }
        gameboard.type = type;
        gameboard.owner = owner;
        return gameboard;
    }
    function refreshGameboard(a,b,owner,type){
        //after click should mark spot and tell gameboard that it has been hit
        const parent = document.querySelectorAll(".gameboard");
        const parentArr = [...parent];
        const newId = a+""+b;
        console.log({parent,parentArr});
        for(let i = 0;i<parent.length;i++){
            if(parent[i].owner===owner){
                if(parent[i].type === type){
                    const gridElement = parent[i].querySelector(`#${CSS.escape(newId)}`);
                    //const gridElement = parent[i].getElementsById(`${a}${b}`);
                    console.log(gridElement.id);
                }
            }
        }
        //refresh gameboard based on hits and ships
    }
    return {
        createGameboard
    }
}
module.exports = DOMHandler;