import {p} from './index.js';
import {curSize} from './pixelate.js';

/*

//------------images and image data --------------

5) create analysis and decomposition functions that work with pixelation to:
	a) sort all of the pixels in an image from darkest to lightest
	b) sort each row of pixels to progress from darkest to lightest
	c) sort each column of pixels to progress from darkest to lightest

	*/

export const sortGen = function(image, size, dir){

	var {x,y,width,height} = curSize(image);
	var pixels =[];
	var row = [];

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		for(var j = x; j < width+x; j+=size) {

			var path = new p.Path.Circle(j,i,size/2-1);
			pixels.push(path);

			var color = image.getAverageColor(path);
			row.push(color);
		}
	}

	//sort and adjust order at level of full array
		if (dir!=='rev'){
			row = row.sort((a,b)=>{
				return b.gray-a.gray;
			})
		} else {
			row = row.sort((a,b)=>{
				return a.gray-b.gray;
			})
		}

	pixels.forEach((path,i)=>{
		path.fillColor = row[i];
	});

}



export const sortRows = function(image, size, dir){

	var {x,y,width,height} = curSize(image);
	var pixels =[];
	var colors = [];

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		var row = []

		for(var j = x; j < width+x; j+=size) {

			var path = new p.Path.Circle(j,i,size/2-1);
			pixels.push(path);

			var color = image.getAverageColor(path);
			row.push(color);
		}

		//sort and adjust order at level of row
		if (dir!=='rev'){
			row = row.sort((a,b)=>{
				return b.gray-a.gray;
			})
		} else {
			row = row.sort((a,b)=>{
				return a.gray-b.gray;
			})
		}
		colors.push(...row);
	}

	pixels.forEach((path,i)=>{
		path.fillColor = colors[i];
	});

}


export const sortColumns = function(image, size, dir){ //alt as pointalize

	var {x,y,width,height} = curSize(image);
	var pixels =[];
	var colors = [];

	//iteration here using get... push values into arrays
	//for (var i = y ; i < height+y; i+=size) {
	for (var i = x ; i < width+x; i+=size) {
		var row = []

		for(var j = y; j < height+y; j+=size) {

			var path = new p.Path.Circle(i,j,size/2-1);
			pixels.push(path);

			var color = image.getAverageColor(path);
			row.push(color);
		}

		//sort and adjust order within column
		if (dir!=='rev'){
			row = row.sort((a,b)=>{
				return b.gray-a.gray;
			})
		} else {
			row = row.sort((a,b)=>{
				return a.gray-b.gray;
			})
		}
		colors.push(...row);
	}

	//finally... with reordered colors - fill pixels

	pixels.forEach((path,i)=>{
		path.fillColor = colors[i];
	});

}



