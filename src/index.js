import _ from 'lodash';
import './style.css';
import printMe from './print';
import Ship from './Ship';
import DOMHandler from './DOMHandler';
import Player from './Player';
import Gameboard from './Gameboard';
const size = 5;
const player = Player(Gameboard(size));
const computer = Player(Gameboard(size));
let turn = false; //false = player turn || true = computer turn
let gameInProgress = true;
let setup = true;


function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    const container = document.createElement("div");
    container.classList.add("container");
    element.classList.add('hello');
    
    // Lodash, currently included via a script, is required for this line to work
    if(setup){
      element.innerText = _.join(['Setup', 'Phase'], ' ');
      btn.innerText = 'End setup!';
    }else{
      element.innerText = _.join(['Game', 'Phase'], ' ');
      btn.innerText = 'End game!';
    }
    btn.addEventListener("click",(e)=>{
      console.log("button clicked")
      setup = !setup;
      /*
      e.target.dispatchEvent(new CustomEvent('statusChange',{
        bubbles:true,
        cancelable:true,
        detail: {statusChange: setup }
      }));
      */
      console.log("event should be dispatched");
      refresh(element,container,btn);
    })
    //btn.onclick = printMe;
    /*btn.addEventListener("click",(event)=>{
      event.target.dispatchEvent(new Event('refresh',{
        bubbles:true,
        cancelable:true
    }));
    })*/

    player.templateShipsPopulate(player.getGameboard().getShipGameboard());
    computer.randomizeShipsPopulate(computer.getGameboard().getShipGameboard());

    element.appendChild(btn);
    //refresh?
    refresh(element,container,btn);
    //end refresh?
    element.addEventListener('refresh',(e)=>{
      if(gameInProgress){
        if(player.getGameboard().checkAllShipsSunk()){
          console.log("player lost");
          gameInProgress=false;
        }else if(computer.getGameboard().checkAllShipsSunk()){
          console.log("computer lost");
          gameInProgress=false;
        }
        console.log(player.getGameboard().getEmptyHitCoords().length);
        console.log(computer.getGameboard().getEmptyHitCoords().length);
        changeTurn(e);
        
        if(turn){
          player.computerAttack(e);
        }
        refresh(element,container,btn);
      }else{
        console.log("game finished");
      }
    })
    /*element.addEventListener('turn',(e)=>{
      console.log("turn: " + turn)
      changeTurn();
      console.log("turn: " + turn)
      if(turn){
        player.computerAttack(e);
      }
    })*/
    return element;
  }
  function changeTurn(){    
      turn = !turn;       
  }

  function refresh(element,container,btn=null){
    if(element.contains(container)){
      element.removeChild(container);
    }
    if(setup){
      element.innerText = _.join(['Setup', 'Phase'], ' ');
      btn.innerText = 'End setup!';
      
    }else{
      element.innerText = _.join(['Game', 'Phase'], ' ');
      btn.innerText = 'End game!';
      
    }
    container.textContent="";
    const shipGameboard = DOMHandler(size).createGameboard("ship",player);
    shipGameboard.classList.add("player");
    const cHitGameboard = DOMHandler(size).createGameboard("hit",computer);
    cHitGameboard.classList.add("computer");
    container.appendChild(shipGameboard);
    container.appendChild(cHitGameboard);
    element.appendChild(btn);
    element.appendChild(container);
    
  }
  
  document.body.appendChild(component());