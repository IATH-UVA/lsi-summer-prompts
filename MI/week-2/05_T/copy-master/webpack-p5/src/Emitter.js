
class Emitter{
  constructor(x, y){
	this.x = x;
  this.y0 = y;
  this.y = y;
  this.t = 0;
  this.rad = 10;
  }

  display(){

  		// starting point of each circle
      let xAngle = p5.map(this.x, 0, p5.width, -16 * p5.PI, 16 * p5.PI, true);
      let yAngle = p5.map(this.y, 0, p5.height, -16 * p5.PI, 16 * p5.PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (this.x / p5.width) + yAngle * (this.y / p5.height);


  	  let myX = this.x + 20 * p5.cos(2 * p5.PI * this.t + this.t);
      let myY = this.y + 20 * p5.sin(2 * p5.PI * this.t + this.t);

      // let myX2 = this.x + 20 * cos(2 * PI * this.t + this.t);
      // let myY2 = this.y + 20 * sin(2 * PI * this.t + this.t);

      p5.ellipse(myX, myY, this.rad); // draw particle
      //ellipse(myX2, myY2, this.rad);
  }

  update(){
  		this.y --;
  		this.t ++;
      this.t ++;

  		if (this.y<=0){
  			this.y=this.y0;
  			this.t=0;
  		}
  }

  reset(){
  			this.y=this.y0;
  			this.t=0;
  }

}

export default Emitter;
