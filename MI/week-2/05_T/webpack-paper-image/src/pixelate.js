import {p} from './index.js';
import Tiffany from './tiffany-window.jpg';

/* tasks 2 and 3 */

//only used locally, as demonstration
export const curSize = function(image){

	image.visible=false;

	return {
		x:Math.floor(image.bounds.x),
		y:Math.floor(image.bounds.y),
		width:image.bounds.width,
		height:image.bounds.height
	}
}

/*

2) create a function pixelation() - to be run on an image instance - that pixelates the image by a certain amount (pixel size should be one of the arguments). see examples

put this code into another file and import for use...

*/

//---------quick pixelate function--------
export const pixelate = function(image,size){

	//use variables from given method of curSize
	var{x, y, width, height} = curSize(image);

		//begin at image x bound ; iterate untill height of image+bound of image; pointalize only every pixel necessary
		for(var i = x; i < height+x; i+=size){
			//begin at image y bound ; iterate untill width of image+bound of image; pointalize only every pixel necessary
			for(var j = y; j < width+y; j+=size){
				//get color of pixel
				var color = image.getPixel(i,j);
				var path = new p.Path.Rectangle(i,j,size,size);
				path.fillColor = color;
			}
		}
}

/*

3) adapt that function to work on any of the loaded instances and b) also has the option to create round or square pixels... this refactoring should have 3 arguments

*/

//-----------square or round version---------------

export const pointalize = function(image,size,type){ //alt as pointalize

	//use variables from given method of curSize
	var{x, y, width, height} = curSize(image);



		//begin at image x bound ; iterate untill height of image+bound of image; pointalize only every pixel necessary
		for(var i = x; i < height+x; i+=size){
			//begin at image y bound ; iterate untill width of image+bound of image; pointalize only every pixel necessary
			for(var j = y; j < width+y; j+=size){
				//get color of pixel
				var color = image.getPixel(i,j);

				if(type === 'round'){
					var path = new p.Path.Circle(i,j, size/2);
				}else{
					var path = new p.Path.Rectangle(i,j,size,size);
				}
			path.fillColor = color;
			}
		}
}
