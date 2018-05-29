import p5 from 'p5';

import Button from './Button.js';
//import Emitter from './Emitter.js';


// // Sketch scope instead of global
const sketch = (p5) => {

  // make library globally available
  window.p5 = p5;

  //
  p5.setup =()=>{

  }

  p5.draw =()=>{

  }

  p5.mousePressed = ()=>{

  }


}

new p5(sketch);



