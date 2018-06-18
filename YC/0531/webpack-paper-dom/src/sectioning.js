import {p, toolCut, toolHor, toolVert} from './index.js';
import {pixelArr} from './drawing.js';


// //------------------------------------------------------------

export const cutHor = ()=>{

	toolHor.activate();

	/* to cut a horizontal section, use a mouse click to create a new line a y-position,
	make sure to show this cut line with a black stroke

	for all of the pixels in your artificial height field, test whether the line intersects them and grab the initial intersection point height (as gray value)
	(hint: .getIntersections())

	holds those intersection heights in an array so you can make a new, smoothed section line showing those heights*/


	toolHor.onMouseDown=(event)=>{

    //make a cut line and find it's intersections with the grid 'pixels'

    //make a section line and add points from your array of height intersections

	}
}

export const cutVert = ()=>{

	toolVert.activate();

		/* to cut a vertical section, repeat the proccess above but with height registering in the x direction*/

	toolVert.onMouseDown=(event)=>{


	}
}


export const cutClear =()=>{

	toolCut.activate();

	var sections = p.project.getItems({strokeColor:'black'});
	sections.forEach(item=>item.remove());

}


//----------------------------------------------

