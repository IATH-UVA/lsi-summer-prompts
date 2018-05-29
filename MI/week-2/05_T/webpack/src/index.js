import p5 from 'p5';

import Button from './Button.js';
//import Emitter from './Emitter.js';


// // Sketch scope instead of global
const sketch = (p5) => {

  // make library globally available
  window.p5 = p5;

  //
  p5.setup =()=>{
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background('rgba(250,100,140,100)');
    p5.frameRate(2);
  }

  p5.draw =()=>{

  }

  p5.mousePressed = ()=>{

  }


}

new p5(sketch);
