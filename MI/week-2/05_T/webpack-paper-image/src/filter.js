import {p} from './index.js';
import {curSize} from './pixelate.js';

	/*
//-----------

4) create 3 filter functions, adapted from your pixel work that alter the color of the image - explore the color object attributes and consider your options

	one can work with simple amplifications... like saturation
	one should alter the rgb values of image
	one should use a conditional logic to explore things like thresholds and conditional color replacement
  other possible parameters: type, val
*/

export const filter =function(image,size){
  //use variables from given method of curSize
  var{x, y, width, height} = curSize(image);

  var tWidth = width - (width%size);
  var tHeight = height - (height%size);

  image.size = new p.Size(tWidth, tHeight);

    //begin at image x bound ; iterate untill height of image+bound of image; pointalize only every pixel necessary
    for(var i = x; i < height+x; i+=size){
      //begin at image y bound ; iterate untill width of image+bound of image; pointalize only every pixel necessary
      for(var j = y; j < width+y; j+=size){
        var path = new p.Path.Circle(i,j,size/2);
        var val = image.getAverageColor(path);
        path.fillColor = val;
        console.log(val);
        path.scale(1 - val.gray);
      }
  }
}

export const levels = function(image,size){
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

      path.onMouseMove = function(event){
        // var clr = image.getPixel(i,j);
        // var path2 = new p.Path.Rectangle(i,j,size,size);
        // path.fillColor = clr;

        console.log(event);
        //path.size = size/2;

        path.fillColor.alpha = 0.5;
        console.log(path.fillColor.alpha);

      }
    }
  }
}

export const thresholds = function(image,size, level){


}
