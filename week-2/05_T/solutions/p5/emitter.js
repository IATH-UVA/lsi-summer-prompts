// old style declaration as a function
function Emitter (x, y){
  this.x = x;
  this.y = y;
  this.t = 0;
  this.rad = 10;

  this.display=function(){

      // starting point of each circle
      let xAngle = map(this.x, 0, width, -16 * PI, 16 * PI, true);
      let yAngle = map(this.y, 0, height, -16 * PI, 16 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (this.x / width) + yAngle * (this.y / height);


      let myX = this.x + 20 * cos(2 * PI * this.t + this.t);
      let myY = this.y + 20 * sin(2 * PI * this.t + this.t);

      ellipse(myX, myY, this.rad); // draw particle
  }

  this.update=function(){
      this.y --;
      this.t ++;
      this.t ++;

      if (this.y<=0){
        this.y=y;
        this.t=0;
      }
  }

  this.reset=function(){
        this.y=y;
        this.t=0;
  }

}
