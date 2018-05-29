// Button class in the new syntax
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
    return (mouseX>this.x && mouseX<this.x+this.w) && (mouseY>this.y && mouseY<this.y+this.h)
  }

  //boolean to make active/inactive
  updateButton(){
    if (this.mouse() && mouseIsPressed){
      this.active = !(this.active) ;
    }
  }

  //visual elements and updating
  drawButton(){
      strokeWeight(2);

      if (this.active) { fill('red')
      } else if (this.mouse() && !this.active){ fill('magenta')
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
