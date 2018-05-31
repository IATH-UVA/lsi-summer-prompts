import p5 from 'p5';

import Button from './Button.js';
import Emitter from './Emitter.js';


// // Sketch scope instead of global
const sketch = (p5) => {

  // make library globally available
  window.p5 = p5;

  //
  p5.setup =()=>{
  	p5.createCanvas(p5.windowWidth, p5.windowHeight);

  	p5.background('rgba(10,200,250,100)');

    labels.forEach(label,i) => {
      buttons.push(new Button(labels[i], i*140+100,600))
    };

  	p5.frameRate(2);

  }

  p5.draw =()=>{

    Button.forEach(function(button){
      button.updateButton();
      button.drawButton();

    });

  }

  p5.mousePressed = ()=>{
    Button.forEach(function(button){

    })

  }


}

export Button from './Button.js';

new p5(sketch);



