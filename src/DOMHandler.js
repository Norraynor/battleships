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
                //gItem.id = ("" + i) + (j + "");
                gItem.coords = ("" + i) + (j + "");
                gItem.setAttribute("coords",("" + i) + (j + ""))
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
                let ghostArr = [];
                gItem.addEventListener("mouseleave",(e)=>{
                    if(gItem.parentElement.classList.contains("player")){
                        if(setup){
                            gItem.classList.remove("setup-mode");
                        }else{
                            gItem.classList.remove("game-mode");
                        }
                    }else{
                        gItem.classList.remove("game-mode");
                    }
                    //remove color from tiles after mouse leaves
                    for(let i = 0;i<ghostArr.length;i++){
                        if(ghostArr[i][0].classList.contains("ghost-ship")){
                            ghostArr[i][0].classList.remove("ghost-ship");
                        }
                        if(ghostArr[i][0].classList.contains("ghost-ship-invalid")){
                            ghostArr[i][0].classList.remove("ghost-ship-invalid");
                        }
                    }
                    ghostArr=[];
                })
                gItem.addEventListener("mouseover",(e)=>{                    
                    if(gItem.parentElement.classList.contains("player")){
                        if(setup){
                            const shipsArr = owner.getShips();
                            let gameboardCur = e.target.parentElement;
                            if(!gameboard.parentElement.vertical){
                                for(let i = e.target.coords[1];i<e.target.coords[1]+shipsArr[0].getLength();i++){      
                                    let currCords = e.target.coords[0]+''+[i];   
                                    console.log(currCords,i,shipsArr[0].getLength());  
                                    ghostArr.push([...gameboardCur.childNodes].filter(item => item.coords === currCords));
                                } 
                            }else{
                                for(let i = e.target.coords[0];i<e.target.coords[0]+shipsArr[0].getLength();i++){      
                                    let currCords = [i]+''+e.target.coords[1];     
                                    ghostArr.push([...gameboardCur.childNodes].filter(item => item.coords === currCords));
                                } 
                            }
                            if(owner.getGameboard().isPlacementValid(parseInt(gItem.coords[0]),parseInt(gItem.coords[1]),shipsArr[0].getLength(),gameboard.parentElement.vertical)){
                                console.log("placement valid")
                                //ghost ship here before placing
                                
                                //add diff color for ghost for all tiles and remove when mouse exits
                                //
                                //---
                                for(let i = 0;i<ghostArr.length;i++){
                                    ghostArr[i][0].classList.add("ghost-ship");
                                }
                                
                            }else{
                                console.log("placement invalid");
                                for(let i = 0;i<ghostArr.length;i++){
                                    ghostArr[i][0].classList.add("ghost-ship-invalid");
                                }
                            }
                            gItem.classList.add("setup-mode");
                        }else{
                            gItem.classList.add("game-mode")
                        }
                    }else{
                        gItem.classList.add("game-mode")
                    }
                })
                gItem.addEventListener("click",(event)=>{
                    //refreshGameboard(i,j,owner,type);
                    console.log(gItem.parentElement)
                    if(setup){
                        if(gItem.parentElement.classList.contains("player")){
                            //place ship here during setup
                            console.log("ship placed - probably");
                            //get ships list and place them one by one
                            let shipsToPlace = owner.getShips();
                            for(let i = 0;i<owner.getShips().length;i++){
                                console.log(shipsToPlace[i].getLength());
                            }
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