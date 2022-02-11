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
let vertical = false;
let winner = "";


function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    const verticalBtn = document.createElement('button');
    const container = document.createElement("div");
    const mainText = document.createElement('div');
    mainText.classList.add("main-text");
    container.classList.add("container");
    element.classList.add('hello');
    verticalBtn.classList.add("vertical-btn");
    // Lodash, currently included via a script, is required for this line to work
    if(setup){
      mainText.innerText = _.join(['Setup', 'Phase'], ' ');
      btn.classList.remove("hidden");
      btn.innerText = 'End setup!';
      verticalBtn.classList.remove("hidden");
      
      if(vertical){
        verticalBtn.innerText = "vertical"
        container.vertical = true;
      }else{
        verticalBtn.innerText = "horizontal"
        container.vertical = false;
      }
    }else{
      mainText.innerText = _.join(['Game', 'Phase'], ' ');
      btn.classList.add("hidden");
      verticalBtn.classList.add("hidden");
    }
    btn.addEventListener("click",(e)=>{
      setup = !setup;   
      refresh(element,container,btn,verticalBtn,mainText);
    })
    verticalBtn.addEventListener("click",(e)=>{
      vertical=!vertical;
      refresh(element,container,btn,verticalBtn,mainText);
    })

    //player.templateShipsPopulate(player.getGameboard().getShipGameboard());
    computer.randomizeShipsPopulate(computer.getGameboard().getShipGameboard());

    element.appendChild(mainText);
    element.appendChild(btn);
    element.appendChild(verticalBtn);

    refresh(element,container,btn,verticalBtn,mainText);
    
    element.addEventListener('refresh',(e)=>{
      if(gameInProgress){
        if(player.getGameboard().checkAllShipsSunk()){
          console.log("player lost");
          winner = computer;
          gameInProgress=false;
        }else if(computer.getGameboard().checkAllShipsSunk()){
          console.log("computer lost");
          winner = player;
          gameInProgress=false;
        }
        changeTurn();

        if(turn && !setup){
          player.computerAttack(e);
        }
        refresh(element,container,btn,verticalBtn,mainText);
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

  function refresh(element,container,btn=null,verticalBtn=null,mainText=null){
    console.log("refreshing")
    if(element.contains(container)){
      element.removeChild(container);
    }
    if(setup){
      mainText.innerText = _.join(['Setup', 'Phase'], ' ');
      btn.classList.remove("hidden");
      btn.innerText = 'End setup!';
      verticalBtn.classList.remove("hidden");
      
      if(vertical){
        verticalBtn.innerText = "vertical"
        container.vertical = true;
      }else{
        verticalBtn.innerText = "horizontal"
        container.vertical = false;
      }
      
    }else{
      if(gameInProgress){
        mainText.innerText = _.join(['Game', 'Phase'], ' ');
      }else{
        if(winner === player){
          mainText.innerText = _.join(['Player', 'Win!'], ' ');
        }else{
          mainText.innerText = _.join(['Opponent', 'Win!'], ' ');
        }
      }
      btn.classList.add("hidden");
      verticalBtn.classList.add("hidden")      
    }
    container.textContent="";
    const shipGameboard = DOMHandler(size).createGameboard("ship",player,setup);
    shipGameboard.classList.add("player");
    const cHitGameboard = DOMHandler(size).createGameboard("hit",computer,setup);
    cHitGameboard.classList.add("computer");
    container.appendChild(shipGameboard);
    container.appendChild(cHitGameboard);
    container.appendChild(DOMHandler(size).createAvailableShips(player));
    element.appendChild(mainText);
    element.appendChild(btn);
    element.appendChild(verticalBtn);
    element.appendChild(container);
    
  }

  
  document.body.appendChild(component());