//import p5 from 'p5';

function Emitter (x, y){
  this.x = x;
  this.y = y;
  this.t = 0;
  this.rad = 10;

  this.display=function(){

      // starting point of each circle
      let xAngle = p5.map(this.x, 0, p5.width, -16 * p5.PI, 16 * p5.PI, true);
      let yAngle = p5.map(this.y, 0, p5.height, -16 * p5.PI, 16 * p5.PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (this.x / p5.width) + yAngle * (this.y / p5.height);


      let myX = this.x + 20 * p5.cos(2 * p5.PI * this.t + this.t);
      let myY = this.y + 20 * p5.sin(2 * p5.PI * this.t + this.t);

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

export default Emitter;
