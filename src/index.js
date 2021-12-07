import _ from 'lodash';
import './style.css';
import printMe from './print';
import Ship from './Ship';
import DOMHandler from './DOMHandler';
import Player from './Player';
import Gameboard from './Gameboard';
const size = 5;

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

    const player = Player(Gameboard(size));
    const computer = Player(Gameboard(size));
    player.templateShipsPopulate(player.getGameboard().getShipGameboard());

    element.appendChild(btn);
    const shipGameboard = DOMHandler(size).createGameboard("ship",player);
    const hitGameboard = DOMHandler(size).createGameboard("hit",player);
    const cShipGameboard = DOMHandler(size).createGameboard("ship",computer);
    const cHitGameboard = DOMHandler(size).createGameboard("hit",computer);
    container.appendChild(shipGameboard);
    container.appendChild(hitGameboard);
    container.appendChild(cShipGameboard);
    container.appendChild(cHitGameboard);
    element.appendChild(container);

    return element;
  }
  
  document.body.appendChild(component());