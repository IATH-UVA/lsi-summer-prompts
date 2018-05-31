import {p} from './index.js';

/* tasks 2 and 3 */


//only used locally, as demonstration
export const curSize= function(image){

	image.visible=true;

	return {
		x:Math.floor(image.bounds.x),
		y:Math.floor(image.bounds.y),
		width:image.bounds.width,
		height:image.bounds.height
	}
}

/*

2) create a function pixelation() - to be run on an image instance - that pixelates the image by a certain amount (pixel size should be one of the arguments). see examples

*/

//---------quick pixelate function------------
// export const pixelate = function(image,size){ ???
export const pixelate = function(image){

	//image.on('load', function() {
		let gridSize = 12;
		let spacing = 1.5;
	//image.size = new p.Size(40, 30);

	for (var y = 0; y < image.height; y++) {
		for(var x = 0; x < image.width; x++) {
			// Get the color of the pixel:
			var color = image.getPixel(x, y);

			// Create a circle shaped path:
			var path = new p.Path.Circle({
				center: new p.Point(x, y) * gridSize,
				radius: gridSize / 2 / spacing
			});

			// Set the fill color of the path to the color
			// of the pixel:
			path.fillColor = color;
		}
	}

	// Move the active layer to the center of the view, so all 
	// the created paths in it appear centered.
	//project.activeLayer.position = view.center;
//});

}


/*

3) adapt that function to work on any of the loaded instances and b) also has the option to create round or square pixels... this refactoring should have 3 arguments

*/

//-----------square or round version---------------

// export const pixelate = function(image,size,type){ //alt as pointalize


// }
