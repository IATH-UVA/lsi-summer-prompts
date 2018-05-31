import {p} from './index.js';
//import {img} from './index.js';

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

//var img=[];
//pixelation(p.img, 24);

export const pixelation=function(arrImg, pixelSize=12) {
	var raster = arrImg[0];
	var rasters = arrImg[1];
	var rasterss = arrImg[2];


	// raster.size = new p.Size(100, 200);
	// rasters.size = new p.Size(100,100);
	// rasterss.size = new p.Size(100,100);
	//console.log(raster);

	raster.visible = false;
	rasters.visible = false;
	rasterss.visible = false;

	var spacing = 3;

	// raster.size = new p.Size(.55*raster.width, .30*raster.height);
	// rasters.size = new p.Size(.45*raster.width, .20*raster.height);
	// rasterss.size = new p.Size(.75*raster.width, .80*raster.height);

	console.log('here');

		for (var y = 0; y < raster.height; y+=12) {
		for (var x = 0; x < raster.width; x+=12) {
			// Get the color of the pixel:
			// var color = raster.getPixel(x, y);
			//console.log(color);

			// Create a circle shaped path:
			var path = new p.Path.Circle({
				center: new p.Point(x, y) ,
				radius: pixelSize / 2 // spacing

			});
			var color = raster.getAverageColor(path);

			console.log('My');

			// Set the fill color of the path to the color
			// of the pixel:
			path.fillColor = color;
		}
	}


	    for (var y = 0; y < rasters.height; y++) {
		for (var x = 0; x < rasters.width; x++) {
			// Get the color of the pixel:
			var color = rasters.getPixel(x, y);
			//console.log('Oh');

			// Create a circle shaped path:
			var path = new p.Path.Circle({
				center: new p.Point(x, y) * pixelSize,
				radius: pixelSize / 2 / spacing

			});

			console.log('My');

			// Set the fill color of the path to the color
			// of the pixel:
			path.fillColor = color;
		}
	}


		for (var y = 0; y < rasterss.height; y++) {
		for (var x = 0; x < rasterss.width; x++) {
			// Get the color of the pixel:
			var color = rasterss.getPixel(x, y);
			//console.log('Oh');

			// Create a circle shaped path:
			var path = new p.Path.Circle({
				center: new p.Point(x, y) * pixelSize,
				radius: pixelSize / 2 / spacing

			});

			console.log('My');

			// Set the fill color of the path to the color
			// of the pixel:
			path.fillColor = color;
		}
	}

	//p.project.activeLayer.p.position = p.view.center;

}

//p.project.activeLayer.p.position = p.view.center;



//export const pixelate = function pixelation(arrImg, pixelSize){};



//---------quick pixelate function------------
// export const pixelate = function(image,size){

// }


/*

3) adapt that function to work on any of the loaded instances and b) also has the option to create round or square pixels... this refactoring should have 3 arguments

*/

//-----------square or round version---------------

// export const pixelate = function(image,size,type){ //alt as pointalize


// }
