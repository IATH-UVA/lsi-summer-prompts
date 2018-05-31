
console.log('hello there');

//-------------------------initial mouse conditional adapted----------------------------

/*

button object
emitter object
link behaviors. . .

*/

var labels = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'nineth'];
var buttons = [];
var wb = 100;


function setup(){
	//console.log(window);

	createCanvas(windowWidth, windowHeight);

	labels.forEach((label,i)=>{
		buttons.push(new Button(labels[i], i*140+100, 600));

	})

	frameRate(30);
}

function draw(){
	background('rgba(255,255,255,.05)');

	buttons.forEach(button=>{

		button.updateButton();
		let emited = button.drawButton();
    //console.log(emited);

    if (emited.state){
     emited.emitter.update();
     emited.emitter.display();
   } else {
     emited.emitter.reset();
   }

	})

	//forEach and cycle through with internal updates and display functions / inverse of snowflake or squiggly line...

}


function mousePressed(){
	buttons.forEach(button=>{
		button.updateButton();
	});
}



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

