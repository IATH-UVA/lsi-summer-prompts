  let beet;
  let carrot;

function setup() {
  createCanvas(windowWidth, windowHeight);
  beet = new Veg([25,69,180], width/2, 100);
  carrot = new Veg([180,69,25], width/3, 250);
}


function draw() {
  background(255);
  beet.display();
  carrot.display();

}


class Veg {
  constructor(c, xpos, ypos) {
      this.c = c;
      this.xpos = xpos;
      this.ypos = ypos;
    };


    display() {
      stroke(0);
      fill(this.c);
      ellipse(this.xpos, this.ypos, 25, 25);
    }

      //if mouse position is over the ellipse…a different color


    }