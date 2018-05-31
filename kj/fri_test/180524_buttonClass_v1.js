//create instances of the Button class
// var button1 = new Button('Test Button 1', [35,18,78], .5);
// var button2 = new Button('Test Button 2', [45,14,98], .75);

function setup() {

 // create canvas
  createCanvas(windowWidth, windowHeight);
  	background(0);
  	noStroke();
 // setup() runs once
  frameRate(3);
  	button1 = new Button('Test Button 1', [35,18,78], .5);
	button2 = new Button('Test Button 2', [45,255,98], .75);
}

function draw(){

	button1.display();
	button2.display();

}


//class Button constructor
class Button {
	constructor (buttonName, colorArray, position) {

		this.buttonName = buttonName;
		this.buttonColor = color(...colorArray);
		this.x = width*position;
		this.y = height/2;
		this.w = 25;
		this.h = 25;
	}

	display(){
		fill(this.buttonColor);
		rect(this.x, this.y, this.w, this.h);
	}

		//let buttonShape = rect(width*position, height/2, 25, 25);//this is the button shape

// 		//if mouseclick occurs over the shapes position, then do…some function, if false, do nothing
// 	 if (mouseX > left && mouseX < right && mouseY > ps && mouseY < ps + springHeight) {
//     over = true;
//   } else {
//     over = false;
//   }
// 	function draw() {
// 	 // draw() loops forever, until stopped
// 	 rect(buttonShape)//
// 	 text(name, //make text that is centered on the rectangle…so get the position )
// 	  background(204);
// 	  yPos = yPos - 1;
// 	  if (yPos < 0) {
// 	    yPos = height;
// 	  }
// 	  line(0, yPos, width, yPos);
// 	}
// 	}

// 	ellipse ()

// 	function mouseClicked() {
//   if (
//   } else {
//     value = 0;
//   }
// }
// }

}



/*
class Button will have the functions…
it generates instances of classes, that will produce a button
and the 
what is variable between each instance of a button? (name, color1, event1)
*/