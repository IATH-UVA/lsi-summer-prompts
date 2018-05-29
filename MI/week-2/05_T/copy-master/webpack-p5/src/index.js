//import p5 so we can use those p5 library functions
import p5 from 'p5';

//import button class, so that we have access to button
import Button from './Button.js';

//import emitter class, so that button has access to emitter
import Emitter from './Emitter.js';

//global variables (this whole file can now reference these variables!)
var labels = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'nineth'];
var buttons = [];

//setup, draw, and mousePressed functions are all held within the 'sketch' function
const sketch = (p5) => {

  //make sure to reference data from the display window with the p5 library!
  //can either do this or import p5 in ALL files: button, emitter, and index
  window.p5 = p5;

  //setup function, again, need to reference every function from p5 with 'p5.' beforehand
  p5.setup =()=>{

  	p5.createCanvas(p5.windowWidth, p5.windowHeight);

		labels.forEach((label,i)=>{
			buttons.push(new Button(labels[i], i*140+100, 600));
		})

		p5.frameRate(30);
	}



	//draw function, again: must reference p5 library!
  p5.draw =()=>{

  	p5.background('rgba(255,255,255,.05)');

		buttons.forEach(button=>{

			button.updateButton();
			button.drawButton();
			let emited = button.drawButton();

	    if (emited.state){
	     emited.emitter.update();
	     emited.emitter.display();
	   } else {
	     emited.emitter.reset();
	   }

		})

  }


  //mousePressed function that references the p5 library

  p5.mousePressed = ()=>{

  	buttons.forEach(button=>{
		button.updateButton();
	});

  }


}

//then create a new sketch!
new p5(sketch);
