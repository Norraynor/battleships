import _ from 'lodash';
import './style.css';
import printMe from './print';
import Ship from './Ship';
import DOMHandler from './DOMHandler';

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


    element.appendChild(btn);
    const shipGameboard = DOMHandler(5).createGameboard("ship","mee");
    const hitGameboard = DOMHandler(5).createGameboard("hit","mee");
    const cShipGameboard = DOMHandler(5).createGameboard("ship","enemy");
    const cHitGameboard = DOMHandler(5).createGameboard("hit","enemy");
    container.appendChild(shipGameboard);
    container.appendChild(hitGameboard);
    container.appendChild(cShipGameboard);
    container.appendChild(cHitGameboard);
    element.appendChild(container);

    return element;
  }
  
  document.body.appendChild(component());