import {p} from './index.js';

/* tasks 2 and 3 */


//only used locally, as demonstration
export const curSize= function(image){

	image.visible=false;

	return {
		x:Math.floor(image.bounds.x),
		y:Math.floor(image.bounds.y),
		width:image.bounds.width,
		height:image.bounds.height
	}
}

//---------quick pixelate function------------
// export const pixelate = function(image,size){ //alt as pointalize

// 	var {x,y,width,height} = curSize(image);

// 	//iteration here using get... push values into arrays
// 	for (var i = y ; i < height+y; i+=size) {
// 		for(var j = x; j < width+x; j+=size) {

// 			//var path = new p.Path.Rectangle(j,i,size,size);
// 			var path = new p.Path.Circle(j,i,size/2-1);
// 			var color = image.getAverageColor(path);

// 			path.fillColor = color;
// 		}
// 	}

// }


//-----------square or round version---------------

export const pixelate = function(image,size,type){ //alt as pointalize

	var {x,y,width,height} = curSize(image);

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		for(var j = x; j < width+x; j+=size) {

			if (type!=='round'){
				var path = new p.Path.Rectangle(j,i,size,size);
			} else {
				var path = new p.Path.Circle(j,i,size/2-1);
			}
			var color = image.getAverageColor(path);

			path.fillColor = color;
		}
	}

}
