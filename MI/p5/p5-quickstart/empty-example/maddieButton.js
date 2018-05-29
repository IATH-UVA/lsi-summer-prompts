var r,g,b;

function setup(){
  background(0);
  createCanvas(1080,800);

  r = random(255);
  g = random(255);
  b = random(255);

  // let c1 = color(0, 40, Math.random(100, 200));
  // let c2 = color(0, Math.random(100, 200), 40);
}

function draw(){
   //background(0);
   const button1 = new Button(width/4, height/4, 100);
   const button2 = new Button(width/2, height/4, 100);
   const button3 = new Button(width/2, height/2, 100);
   const button4 = new Button(width/4, height/2, 100);



   button1.revolve();
   button2.revolve();
   button3.revolve();
   button4.revolve();
   // button1.populate();

   button1.changeColor();
   button2.changeColor();
   button3.changeColor();
   button4.changeColor();

   button1.display();
   button2.display();
   button3.display();
   button4.display();


}

function Button(xLoc, yLoc, radius){

  this._x = xLoc;
  this._y = yLoc;
  this._rad = radius;
  var d = dist(mouseX, mouseY, this._x, this._y);

  this.display = function(){
    fill(r, g, b, 100);
    noStroke();
    ellipse(this._x,this._y,this._rad,this._rad);
  }

  this.revolve = function(){
      if(mouseIsPressed && d<100){
        translate(p5.Vector.fromAngle(millis()/ 1000,75));
    }
  }

  this.changeColor = function(){
    if(keyIsPressed){

      if(d<100){
        if(keyCode === 65){
          r = random(255);
        }
        if(keyCode === 71){
          g = random(255);
        }
        if(keyCode === 66){
          b = random(255);
        }
      //  r = random(255);
      //  g = random(255);
      //  b = random(255);
      }
    }
  }

};

// function keyIsPressed(){
//   var d = dist(mouseX, mouseY, this._x, this._y);
//   if(d<100){
//     r = random(255);
//     g = random(255);
//     b = random(255);
//   }
// }

// this.populate = function(){
//   var buttons = [];
//   if(keyIsPressed){
//     for(var i = 0; i < 100; i++){
//       buttons[i] = new Button(Math.random(0, width), Math.random(0, height), Math.random(0,255), 100);
//       buttons[i].revolve();
//       buttons[i].display();
//     }
//   }
//
// }

// this.changeColor = function(){
//   if(keyIsPressed){
//     var d = dist(mouseX, mouseY, this._x, this._y)
//     //console.log(d);
//
//     if(d < 100){
//       r = random(255);
//       g = random(255);
//       b = random(255);
//     }

    //var col = color (0,Math.random(100,200),this._c);
    // fill(c2);
    // noStroke();
    // ellipse(this._x,this._y,this._r,this._r);
//   }
// }
