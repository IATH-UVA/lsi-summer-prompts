
console.log('hello there');

// //-------------------------initial---------------------------------

// //like in processing, draw an elipse
// var rad = 40
// var circArr = [];

// var circle = new Path.Circle({
//     center: [50,50],
//     radius: 40,
//     fillColor: 'white',
//     strokeColor: 'black',
//     opacity: 0.5
// });

// circArr.push(circle);

// //-------------------------initial mouse interaction note functional structure-----------------

// //add internactions
// function onMouseMove(event) {
//     circle.position = event.point;
//     //console.log('event.point', event.point);
// }

// function onMouseDown(event) {
// 	circle.fillColor = 'none';
// 	rad = 40
// }


// function onMouseDrag(event) {
//     var myCircle = new Path.Circle(new Point(event.point), rad);
// 		myCircle.fillColor = 'black';
// 		myCircle.opacity = 0.5;
// 		rad--;
// 		(rad<-40)? rad=40: null;
// 		circArr.push(myCircle);
// }

// function onMouseUp(event) {
// 	circle.fillColor = 'white';
// 	var line = new Path();
// 	line.strokeColor = 'black';

// 	//console.log(circArr);
// 	var i =0;

// 	while (circArr.length>0){
// 		var radEx = circArr[i].bounds.width/2;
// 		circArr[i].scale(1/radEx);
// 		line.add(new Point(circArr[i].position.x, circArr[i].position.y));

// 		circArr.shift();

// 	}

// }


//-------------------------initial mouse conditional adapted----------------------------

/*

button object with emitter object
link behaviors. . .

*/

var labels = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'nineth'];
var buttons = [];
var emissions = {};
var emit = [];
var wb = 100;
var yo = 600;


// call new Buttons and emitters

for (var i=0; i<labels.length; i++){
		emissions[labels[i]]=null;
		buttons.push(new Button(labels[i], i*140+100, yo));
		//console.log(emissions);
}




function onFrame(event) {
		for (var i=0; i<labels.length; i++){
		if (emissions[labels[i]] !== null){

			var relX = 20 * Math.cos(2 * Math.PI * event.count+event.count);
			var relY = 1 + 20 * Math.sin(2 * Math.PI * event.count+event.count);

			emissions[labels[i]].position -= new Point(relX,relY);
			//emissions[labels[i]].position -= new Point(0,1);
			if(emissions[labels[i]].position.y<0){emissions[labels[i]].position += new Point(0,yo-10);};
		}
	}
}


// Button class
function Button(name, x, y) {

  var path = new Path.Rectangle(new Point(x, y), new Size(wb, 30));
  path.strokeColor='black';
  path.fillColor = 'white';
  path.data = name;

  var text = new PointText(new Point(x+wb/2, y+30*2/3));
  text.fillColor='black';
  text.content = name;
  text.justification = 'center';

// When the mouse moves on top of the item, set its opacity
// to a random value between 0 and 1:
	path.onMouseEnter = function(event) {
	    if (this.fillColor.green===1){this.fillColor='magenta';}
	}

	path.onMouseLeave = function(event) {
	    if (this.fillColor.blue===1){this.fillColor='white';}
	}

	path.onMouseDown = function(event) {
		if (this.fillColor.blue===1 && this.fillColor.red===1){
			this.fillColor='red';
			// add emitter here- as triggered on mousedown
			new Emitter(name, x+wb/2, y-10)
		} else {
			this.fillColor='white';
			//remove emitter here as triggered on mouse down boolean
			emissions[name].remove();
			emissions[name]=null;

		}
	}

}

function Emitter(name,x,y){

	var pathR = new Path.Circle(new Point(x, y), 5);
	pathR.fillColor='black';
	emissions[name] = pathR;
	//console.log(emissions);

}


