import p5 from 'p5';

import Button from './Button.js';
import Emitter from './Emitter.js';

console.log(window);

var labels = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'nineth'];
var buttons = [];
var wb = 100;


// // Sketch scope instead of global
const sketch = (p5) => {

  // make library globally available
  window.p5 = p5;

  //

  p5.setup =()=>{

  	p5.createCanvas(p5.windowWidth, p5.windowHeight);

  	p5.background('rgb(10, 100, 200)');

  labels.forEach((label,i)=>{
    buttons.push(new Button(labels[i], i*140+100, 600));

  })

  p5.frameRate(30);
  }

//

  p5.draw =()=>{

  	 buttons.forEach(button=>{

    button.updateButton();
    let emited = button.drawButton();
    //console.log(emited);

    if (emited.state){
     emited.emitter.update();
     emited.emitter.display();
   } else {
     emited.emitter.reset();
   }

  })
  }

  p5.mousePressed = ()=>{
    buttons.forEach(button=>{
     button.updateButton();
  }
}
}

new p5(sketch);



