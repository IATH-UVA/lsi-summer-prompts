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
	//return given image at give pixel size
	return image.size = new Size(size, size);
}


/*

3) adapt that function to work on any of the loaded instances and b) also has the option to create round or square pixels... this refactoring should have 3 arguments

*/

//-----------square or round version---------------

export const pointalize = function(image,size,type){ //alt as pointalize

	//create a new raster item from the given image
	var raster = new Raster(image);

	//hide the Raster
	raster.visible = false;

	//the size of our grid cells:
	var gridSize = 12;

	var spacing = 1.2;

	raster.on('load', function() {
		raster.size = new Size(size, size);

		for(var y = 0; y < raster.height; y++){
			for(var x = 0; x < raster.width; x++){
				//get color of pixel
				var color = ras.getPixel(x,y);

				//create a circle shaped path:
				var path = new Path.Circle({
					center: new Point(x,y) * gridSize,
					radius: girdSize / 2 / spacing
				});

				//set fill color of the path to the color of the pixel
				path.fillColor = color;
			}
		}

		//move the active layer to the center of the view, so all the created paths in it appear centered
		project.activeLayer.position = view.center;
	});

	//move the active layer to the center of the view:
	project.activeLayer.position = view.center;

	}


}
