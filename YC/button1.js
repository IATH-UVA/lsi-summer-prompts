

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  button1 = new button('1', [240, 230, 221], 50);
  button2 = new button('2', [0, 0, 0], 200);

}


function draw() {

  button1.display();
  button2.display();
}


class button {
  constructor(name, color1, position) {
    this.name = name;
    this.color1 = color(...color1);
    this.x = position/2;
    this.y = position/4;
    this.w = position + 100;
    this.l = position + 200;
  
  }

  display() {
  rect(this.x, this.y, this.w, this.l);
  fill(this.color1);
  }

}
