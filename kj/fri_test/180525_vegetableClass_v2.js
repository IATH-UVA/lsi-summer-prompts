  let beet;
  let carrot;

  beet = new Veg(color(255, 0, 0), 0, 100, 2);
  carrot = new Veg(color(0, 0, 255), 0, 10, 1);

  beet.move();
  beet.display();
  carrot.move();
  cattor.display();

class Veg {
  constructor(c, xpos, ypos, xspeed) {
      this.c = c;
      this.xpos = xpos;
      this.ypos = ypos;
      this.xspeed = speed;
    }

    display() {
      stroke(0);
      fill(c);
      ellipse(xpos, ypos, 20, 10);
    }

    move() {
      xpos = xpos + xspeed;
      if (xpos > width) {
        xpos = 0;
      }
    }
}