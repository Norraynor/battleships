function DOMHandler(gameboardSize){
    //add something to show that ship is hit and sunk
    //something to notify all ships destroyed
    function createGameboard(type,owner,setup=true){        
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
                    if(owner.getGameboard().getHitGameboard()[i][j] !== "x"){
                        if(!gItem.classList.contains("ship")){
                            gItem.classList.add("ship");
                        }
                    }else{
                        if(gItem.classList.contains("ship")){                            
                            gItem.classList.remove("ship");
                        }
                        gItem.classList.add("ship-sunk");
                    }
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
                //if setup then this should not work
                gItem.addEventListener("click",(event)=>{
                    //refreshGameboard(i,j,owner,type);
                    console.log(gItem.parentElement)
                    if(setup){
                        if(gItem.parentElement.classList.contains("player")){
                            //place ship here during setup
                            console.log("ship placed - probably");
                            //get ships list and place them one by one
                        }
                    }else{
                        if(gItem.parentElement.classList.contains("computer")){
                            if(!event.target.classList.contains("hitf") && !event.target.classList.contains("hits")){
                                //here it should mark hit and record it on gameboard
                                owner.getGameboard().placeHit(gItem.id[0],gItem.id[1]);   
                                event.target.dispatchEvent(new Event('refresh',{
                                    bubbles:true,
                                    cancelable:true
                                }));                     
                            }
                        }
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