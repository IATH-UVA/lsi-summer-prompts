//using p5
//edited example from http://coursescript.com/notes/interactivecomputing/interactivity/
//v2: making buttons into classes…and the difference between them is if they control r,g,b, or all 3


var backgroundColor;
var isOverCircle;
var buttons = []

//instantiate buttons for the primary colors (RGB)
let redButton;
let blueButton;
let greenButton;

redButton = new ColorButton(red);
blueButton = new ColorButton(blue);
greenButton = new ColorButton(green);

//setup
 
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  
  // default background color
  backgroundColor = color(255, 255, 255);
}
 
function draw() 
{
  background(backgroundColor);
 
  // get distance between mouse and circle
  var distance = dist(mouseX, mouseY, windowWidth/2, windowHeight/2); 
  
  // if the distance is less than the circle's radius
  if(distance < windowWidth/5)
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }
  
  // draw a circle
  ellipseMode(CENTER);
  stroke(255, 204, 0);
  strokeWeight(5);
  if(isOverCircle == true)
  {
    fill(255, 204, 0);
    cursor(CROSS);
  } else {
    fill(0,0,0,0); 
    cursor(ARROW); 
  }
  ellipse(windowWidth/2, windowHeight/2, windowWidth/5, windowWidth/5);
  
}
 
function mousePressed()
{
  if(isOverCircle == true)
  {
    backgroundColor = color(random(255), random(255), random(255));
  }
}

class ColorButton (primaryColor) {
	this.primaryColor = primaryColor

	if this.primaryColor = 'red' {

	}

}