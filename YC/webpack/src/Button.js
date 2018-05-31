//import p5 from 'p5';
import Emitter from './Emitter.js';

// Button class
class Button{
class Button{
  constructor(name, x, y){
    this.w = wb;
    this.h = 30;
    this.x = x;
    this.y = y;
    this.name = name;
    this.emitter = new Emitter(x+wb/2, y);
    this.active = false
  };

  // for mouse in correct area
  mouse(){
    return (p5.mouseX>this.x && p5.mouseX<this.x+this.w) && (p5.mouseY>this.y && p5.mouseY<this.y+this.h)
  }

  //boolean to make active/inactive
  updateButton(){
    if (this.mouse() && p5.mouseIsPressed){
      this.active = !(this.active) ;
    }
  }

  //visual elements and updating
  drawButton(){
      strokeWeight(2);

      if (this.active) { p5.fill('red')
      } else if (this.mouse() && !this.active){ p5.fill('magenta')
      } else { fill(255,255,255) };

      rect(this.x, this.y, this.w, this.h, 5);
      textSize(12);
      textAlign(CENTER);
      fill(0,0,0);
      text(this.name, this.w/2+this.x, this.h*2/3+this.y);

      return {// keep series in sync
                state: this.active,
                emitter: this.emitter
              }
  }

}

export default Button;
