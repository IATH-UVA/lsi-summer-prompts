
console.log('hello there');

//-------------------------initial---------------------------------

// function setup() {

// }

// function draw() {
//   ellipse(50, 50, 80, 80);
// }

//-------------------------initial mouse conditional-----------------

// function setup() {
//   createCanvas(640, 480);
// }

// function draw() {
//   if (mouseIsPressed) {
//     fill(0);
//   } else {
//     fill(255);
//   }
//   ellipse(mouseX, mouseY, 80, 80);
// }

//-------------------------initial mouse conditional adapted----------------------------

/*

first - create a function that explores the current window size - use mozilla's references on the DOM and p5's references to output size to the console

second - change the drawing framerate and appearance attributes of the ellipse being drawn

third - create a non-looping version of this initial interaction that modifies and ellipse based on the mouse location. Use the mouse being pressed to initiate the drawing of a new ellipse.

*/

function setup() {
  createCanvas(windowWidth, windowHeight); //change to screen size (1)
  //frameRate(30); //slow down (3)
  noteDiff();
  noLoop(); //(5)
}

function draw() {
	background('rgba(0,0,0,.125)'); //add transparency (4)

  // if (mouseIsPressed) { //turn off for noLoop/mousePressed() combo (5)
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  noStroke(); //color and appearance (5)
  var {wDiff, yDiff} = mouseDiff(); //(6)

  ellipse(mouseX, mouseY, wDiff/10, yDiff/10); //(6) super simple  response

  //mouseDiff(); //(2)
}

function noteDiff(){
	console.log(window, window.innerWidth, window.innerHeight); // look through structures . . . (1)
	console.log(windowWidth, windowHeight);
}

function mouseDiff(){ // to log and later manipulate screen (2)
	var wDiff = windowWidth-mouseX;
	var yDiff = windowHeight-mouseY;

	console.log(wDiff, yDiff);
	return {wDiff, yDiff};
}

function mousePressed() {
  redraw();
}

