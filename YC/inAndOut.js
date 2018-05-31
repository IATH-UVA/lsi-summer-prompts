function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  inAndOut1 = new inAndOut([240, 230, 221], 50);
  inAndOut1.drawArea();

}

function draw() {
		//inAndOut1.drawArea();
		inAndOut1.drawClick();
	}

class inAndOut {
	constructor(colorA, areaLocation) {
		this.colorA = color(...colorA,100);
		this.colorB = colorA.reverse();
		this.x = areaLocation + 100;
		this.y = areaLocation + 200;
		this.w = areaLocation * 8;
		this.l = areaLocation * 5;
		//this.t = 60;
	}



	drawArea() {
        //fill(this.colorA);
        stroke(180, 70);
        rect(this.x, this.y, this.w,this.l);

        	
    }


    mouse(){
    //console.log((mouseX>this.x && mouseX<this.x+this.w) && (mouseY>this.y && mouseY<this.y+this.l));
    return (mouseX>this.x && mouseX<this.x+this.w) && (mouseY>this.y && mouseY<this.y+this.l)

    }


    drawClick() {

    	if (this.mouse() && mouseIsPressed) {
    		//console.log('is it correct?');
    		noStroke();
    		fill(this.colorB);
    		rect(mouseX, mouseY, this.w/16, this.l/10);
    		// for(var i=0; i<100; i++) {
    		// 	return rect(mouseX, mouseY, this.w/16-i, this.l/10-i);
    		// }


    	} else if (!this.mouse() && mouseIsPressed) {
    		noStroke();
    		fill(this.colorA);
    		//ellipse(mouseX, mouseY, this.w/16, this.l/10);
    		//push();
    		for(var i=0; i<100; i++) {
    			return ellipse(mouseX, mouseY, this.w/16-i, this.l/10-i);
    		}
    		//pop();
    	}

    }


}



   







