import {p} from './index.js';
import {curSize} from './pixelate.js';

/*

6) create a visualization (bar chart) that shows the distribution of dark and light pixels, this will require additional sorting and clustering of gray values by 2 decimal points (could be multiple functions)
	a) make an object to hold the color clusters from .00 -.99
	b) setup a function to read that object and array in columns, suited to fit in the second 2/3rds of the page

*/

export const vis = function(image, boolean){
	image.visible=boolean;

}


export const gradBars = function(image, size){ //alt as pointalize

	var {x,y,width,height} = curSize(image);
	var colors = [];
	var pixels = [];

	//iteration here using get... push values into arrays
	for (var i = y ; i < height+y; i+=size) {
		for(var j = x; j < width+x; j+=size) {

			var path = new p.Path.Rectangle(j,i,size,size);
			var color = image.getAverageColor(path);
			path.fillColor=color;
			pixels.push(path);
			colors.push(color);
		}
	}


	var bars = sortColors(colors);
	var barPixels = stackShape(bars, width, height,x,y);

	//addInteraction(barPixels);
	addRange(barPixels);

}


//sort and adjust order (dark to light)
//cluster into rounded saturation values
function sortColors(colorArr){
	var colors = colorArr.sort((a,b)=>{
			return b.gray-a.gray;
		});

	var bars={};

	colors.forEach(col=>{
		if (bars[Math.round(col.gray*100)]){
			bars[Math.round(col.gray*100)].push(col);
		} else {
			bars[Math.round(col.gray*100)]=[col];
		};
	})

	return bars;
}

//set up a maximum area and a way to iterate through the clustered object values that enables stacking of units
function stackShape(colorObj, width, height,x,y){

	var max=0;
	for (var keys in colorObj){
		(colorObj[keys].length>=max)? max = colorObj[keys].length: null;
	};

	var nH = (Math.floor(height/max));
	var offset = .5;
	var sX = width+x+100;
	var sY = y+height;

	var barPix=[];

	for (var i=0; i<100; i++){
		var series = colorObj[i];
		if (series){
			series.forEach(item=>{
				var bar = new p.Path.Rectangle(sX,sY,8,nH);
				bar.fillColor = item;
				barPix.push({path:bar, cluster: i, color: item.components });

				sY-= offset+nH;
			})
			sX+=offset+8;
			sY=y+height;
		}
	}

	return barPix;
}

/*

7) bonus - create/alter your functions so that when you hover over a pixel on the bar chart, it highlights on the original pixelated image
 double bonus - on hover, it should highlight itself and give secondary highlights to those values +/- .05 in value

*/

function addInteraction(barArr){ // for the exact color match

	//console.log(p.project);
	barArr.forEach(bar=>{
			var color = bar.path.fillColor;

		bar.path.onMouseEnter=function(event){
			//var color = bar.path.fillColor;
			var items = p.project.getItems({
			    fillColor: color,
			    class: p.Path
			});

			items.forEach(item=>{item.fillColor='white'});
		};

		bar.path.onMouseLeave=function(event){
			//var color = bar.path.fillColor;
			var items = p.project.getItems({
			    fillColor: 'white',
			    class: p.Path
			});

			items.forEach(item=>{item.fillColor=color});
		};

	})

}

function addRange(barArr){ // for the exact color match

	//console.log(p.project);
	barArr.forEach(bar=>{
			var color = bar.path.fillColor;
			var c2 = color.components.slice().map(item=>item+.05);
			var color2 = new p.Color(c2);



		bar.path.onMouseEnter=function(event){
			//var color = bar.path.fillColor;
			var items = p.project.getItems({
			    fillColor: function(obj) {
					        return (obj<color2 && obj>color);
							    },
			    class: p.Path
			});

			items.forEach(item=>{item.data = item.fillColor; item.fillColor='white'});
		};

		bar.path.onMouseLeave=function(event){
			//var color = bar.path.fillColor;
			var items = p.project.getItems({
			    fillColor: 'white',
			    class: p.Path
			});

			items.forEach(item=>{item.fillColor=item.data});
		};

	})

}
