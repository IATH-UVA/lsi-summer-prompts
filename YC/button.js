var button1;
var button2;
var button3;
var button4;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
 // cnv.mousePressed(chageGray);
  background(0);
  button1 = createButton('who');
  button2 = createButton('where');
  button3 = createButton('why');
  button4 = createButton('what');
  
  button1.position(30, 20);
  button2.position(30, 60);
  button3.position(30, 100);
  button4.position(30, 140);

  button1.mousePressed(changeBG1);
  button2.mousePressed(changeBG2);
  button3.mousePressed(changeBG3);
  button4.mousePressed(changeBG4);

}

// function draw() {
//   button1 = rect(30, 20, 100, 20, 10);
//   button2 = rect(30, 60, 100, 20, 10);
//   button3 = rect(30, 100, 100, 20, 10);
//   button4 = rect(30, 140, 100, 20, 10);
// }

// function draw() {
//   if (mouseIsPressed) {
//     fill(100);
//   } else {
//     fill(255);
//   }
//   button1 = rect(30, 20, 100, 20, 10);

//   if (mouseIsPressed) {
//     fill(100);
//   } else {
//     fill(255);
//   }
//   button2 = rect(30, 60, 100, 20, 10);
// }


function changeBG1() {
  var val = random(255);
  background(val);
}

function changeBG2() {
  var val = random(255);
  background(val);
}

function changeBG3() {
  var val = random(255);
  background(val);
}

function changeBG4() {
  var val = random(255);
  background(val);
}


class buttons {
	constructor() {
		this._button1 = button1;
		this._button2 = button2;
		this._button3 = button3;
		this._button4 = button4;
	}

}