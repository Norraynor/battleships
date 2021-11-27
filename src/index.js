import _ from 'lodash';
import './style.css';
import printMe from './print';
import Ship from './Ship';
import DOMHandler from './DOMHandler';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;


    element.appendChild(btn);

    //element.appendChild(DOMHandler(5).createGameboard("hit","mee"))

    return element;
  }
  
  document.body.appendChild(component());