import {p} from './index.js';
import {curSize} from './pixelate.js';

export const filter =function(image,size,type, val){ //alt as pointalize

	var {x,y,width,height} = curSize(image);

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		for(var j = x; j < width+x; j+=size) {

			var path = new p.Path.Rectangle(j,i,size,size);
			var color = image.getAverageColor(path);
			color[type]=val;

			path.fillColor = color;
		}
	}

}


export const levels = function(image,size, colObj){ //alt as pointalize

	var {x,y,width,height} = curSize(image);

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		for(var j = x; j < width+x; j+=size) {

			var path = new p.Path.Rectangle(j,i,size,size);
			//var path = new p.Path.Circle(j,i,size/2-1);
			var color = image.getAverageColor(path);
			var keys = Object.keys(colObj);
			keys.forEach(key=>{
				color[key]+=colObj[key];
			})
			//console.log(color);

			path.fillColor = color;
		}
	}

}

export const thresholds = function(image,size, level){

	var {x,y,width,height} = curSize(image);
	image.visible=false;

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		for(var j = x; j < width+x; j+=size) {

			var path = new p.Path.Rectangle(j,i,size,size);
			//var path = new p.Path.Circle(j,i,size/2-1);
			var color = image.getAverageColor(path);

			if (color.gray<level){
				color='white';
			}			//console.log(color);

			path.fillColor = color;
		}
	}

}
