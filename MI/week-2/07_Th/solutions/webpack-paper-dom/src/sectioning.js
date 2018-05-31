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
		var cut = new p.Path.Line(0, event.point.y,  p.view.size.width, event.point.y);
		cut.strokeColor='black';

		var inters =[];

    for (var j = 0; j <pixelArr.length; j++) {
            grabIntersections(cut, pixelArr[j]);
    }

    function grabIntersections(line,rect){
    	var intersections = rect.getIntersections(line);
    	if (intersections[0]){
    		inters.push(p.view.size.height - rect.fillColor.gray*100);
    	}
    }
    inters.reverse();

    //make a sectipn line and add points from your array of height intersections
		  var section = new p.Path({
					strokeColor: 'black',
					strokeWidth: 5,
					strokeCap: 'round',
					opacity: event.point.y/p.view.size.height
				});

		  for (var i=0; i<p.view.size.width; i+=20){
		  	var yPt=inters.pop();
		  	section.add(new p.Point(i,yPt));
		  }
		  section.smooth();

	}
}

export const cutVert = ()=>{

	toolVert.activate();

		/* to cut a vertical section, repeat the proccess above but with height registering in the x direction*/

	toolVert.onMouseDown=(event)=>{

		var cut = new p.Path.Line(event.point.x, 0,  event.point.x, p.view.size.height);
		cut.strokeColor='black';

		var inters =[];

    for (var j = 0; j < pixelArr.length; j++) {
            grabIntersections(cut, pixelArr[j]);
    }

    function grabIntersections(line,rect){
    	var intersections = rect.getIntersections(line);
    	if (intersections[0]){
    		inters.push(p.view.size.width - rect.fillColor.gray*100);
    	}
    }
    inters.reverse();

		  var section = new p.Path({
					strokeColor: 'black',
					strokeWidth: 5,
					strokeCap: 'round',
					opacity: event.point.x/p.view.size.width
				});

		  for (var i=0; i<p.view.size.height; i+=20){
		  	var xPt=inters.pop();
		  	section.add(new p.Point(xPt,i));
		  }

		  section.smooth();

	}
}


export const cutClear =()=>{

	toolCut.activate();

	var sections = p.project.getItems({strokeColor:'black'});
	sections.forEach(item=>item.remove());

}


//----------------------------------------------

