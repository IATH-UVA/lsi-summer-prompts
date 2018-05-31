import {p} from './index.js';

let newColorArr = [];

let invertColor = function (originalColor) {
	return (255-originalColor);
}

const newColorArr = originalColor.map(invertColor())


let colorInverter = function(color) {
	//how will color arrive into this function? as an array? 
	// if so, then each item in the array gets remapped? 
	color.map(invertColor());
}