import paper from 'paper';;
import Funfetti from './funfetti.jpg';
import './style.css';

//functions imported from other .js files
import {pixelate} from './pixelate.js';
import {filter, levels, thresholds} from './filter.js';

//exports this same PaperScope to other .js files?
export const p = new paper.PaperScope();
p.setup(myCanvas);


var imgClones=[]; // empty array in which to push image duplicates


/*

1) basic image = load an image and distribute across the canvas 3 times - make the size of each .75% of the window height (use raster.size to downsample the image)

* make sure to use raster.onLoad functions to work with images only after they've loaded

//-----------

*/
const imgIterations = 5; //how many versions of the image do you want?
const spaceImage = function (i){
	return (i*(p.view.size.width/imgIterations) + .5*(p.view.size.width/imgIterations)); 
	//?returns x-value… as function of windowWidth and # imgIterations?
}

const scaleImage = function (image){
	let newWidth = p.view.size.width/imgIterations;
	let scaleFactor = newWidth/image.width;
	let newHeight = scaleFactor*image.height;
	image.size = new p.Size(newWidth, newHeight);
};

//console.log(size);


var raster = new p.Raster({source: Funfetti});
//sets raster as Funfetti
raster.visible = true;



raster.onLoad = ()=> {

	imgClones.push(raster);


// push unedited rasters into imgUnedited array by # in imgIterations
	for (let i=1; i<imgIterations; i++) { 
		var clone = raster.clone();
		imgClones.push(clone);
	}
	//and for each of those images in the array…display them at center position with new scale
	imgClones.forEach((item,i) => {
		scaleImage(item);
		var x = spaceImage(i);
		var y = p.view.size.height/2
		item.position = new p.Point(x, y);


	});
	//raster.visible = false;
}



//lastly, the 


/*

2) create a function pixelation() - to be run on an image instance - that pixelates the image by a certain amount (pixel size should be one of the arguments). see examples

put this code into another file and import for use...

*/

//raster.on('load' pixelate(raster));

/*

3) adapt that function to work on any of the loaded instances and b) also has the option to create round or square pixels... this refactoring should have 3 arguments

*/




	/*
//-----------

4) create 3 filter functions, adapted from your pixel work that alter the color of the image - explore the color object attributes and consider your options

	one can work with simple amplifications... like saturation
	one should alter the rgb values of image
	one should use a conditional logic to explore things like thresholds and conditional color replacement

*/



/*

//------------images and image data --------------

5) create analysis and decomposition functions that work with pixelation to:
	a) sort all of the pixels in an image from darkest to lightest
	b) sort each row of pixels to progress from darkest to lightest
	c) sort each column of pixels to progress from darkest to lightest

6) create a visualization (bar chart) that shows the distribution of dark and light pixels, this will require additional sorting and clustering of gray values by 2 decimal points (could be multiple functions)
	a) make an object to hold the color clusters from .00 -.99
	b) setup a function to read that object and array in columns, suited to fit in the second 2/3rds of the page

7) bonus - create/alter your functions so that when you hover over a pixel on the bar chart, it highlights on the original pixelated image
 double bonus - on hover, it should highlight itself and give secondary highlights to those values +/- .05 in value

*/
