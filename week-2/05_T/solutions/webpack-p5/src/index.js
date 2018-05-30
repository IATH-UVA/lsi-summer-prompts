import p5 from 'p5';

import Button from './Button.js';
import Emitter from './Emitter.js';

  var labels = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'nineth'];
	var buttons = [];

// // Sketch scope instead of global
const sketch = (p5) => {

  // make library globally available
  window.p5 = p5;


  //--------------------setup-----------------
  p5.setup =()=>{

  	p5.createCanvas(p5.windowWidth, p5.windowHeight);

		labels.forEach((label,i)=>{
			buttons.push(new Button(labels[i], i*140+100, 600));
		})

		p5.frameRate(30);
	}



	//--------------------draw-----------------

  p5.draw =()=>{

  	p5.background('rgba(255,255,255,.05)');

		buttons.forEach(button=>{

			button.updateButton();
			button.drawButton();
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


  //------------------mousepressed--------------

  p5.mousePressed = ()=>{

  	buttons.forEach(button=>{
		button.updateButton();
	});

  }


}

new p5(sketch);



