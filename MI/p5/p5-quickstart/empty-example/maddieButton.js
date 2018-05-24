function setup(){
  createCanvas(640,1080);
}

function draw(){
   const button1 = new Button(width/4, height/4, 40, 20);
   button1.display();
}

function Button(xLoc, yLoc, clr, rad){

    this._x = xLoc;
    this._y = yLoc;
    this._c = clr;
    this._r = rad;


  this.display = function(){
    //console.log('got here', this._c);
    var col = color(150, this._c, 150);
    fill(col);
    noStroke();
    ellipse(this._x,this._y,this._rad,this._rad);
    console.log('got here', col);
  }
};
