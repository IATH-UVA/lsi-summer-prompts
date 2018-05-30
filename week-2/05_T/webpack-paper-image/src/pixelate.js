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

/*

2) create a function pixelation() - to be run on an image instance - that pixelates the image by a certain amount (pixel size should be one of the arguments). see examples

put this code into another file and import for use...

*/

//---------quick pixelate function------------
export const pixelate = function(image,size){

}


/*

3) adapt that function to work on any of the loaded instances and b) also has the option to create round or square pixels... this refactoring should have 3 arguments

*/

//-----------square or round version---------------

// export const pixelate = function(image,size,type){ //alt as pointalize


// }
