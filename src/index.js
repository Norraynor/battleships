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


function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    const container = document.createElement("div");
    container.classList.add("container");
    
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    player.templateShipsPopulate(player.getGameboard().getShipGameboard());
    computer.templateShipsPopulate(computer.getGameboard().getShipGameboard());

    element.appendChild(btn);
    //refresh?
    refresh(element,container);
    //end refresh?
    element.addEventListener('refresh',(e)=>{
      refresh(element,container);
    })
    return element;
  }

  function refresh(element,container){
    if(element.contains(container)){
      element.removeChild(container);
    }
    container.textContent="";
    const shipGameboard = DOMHandler(size).createGameboard("ship",player);
    shipGameboard.classList.add("player");
    const hitGameboard = DOMHandler(size).createGameboard("hit",player);
    hitGameboard.classList.add("player");
    const cShipGameboard = DOMHandler(size).createGameboard("ship",computer);
    cShipGameboard.classList.add("computer");
    const cHitGameboard = DOMHandler(size).createGameboard("hit",computer);
    cHitGameboard.classList.add("computer");
    container.appendChild(shipGameboard);
    container.appendChild(cHitGameboard);
    container.appendChild(cShipGameboard);
    container.appendChild(hitGameboard);
    element.appendChild(container);
  }
  
  document.body.appendChild(component());