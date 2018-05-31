import {p, toolClear, toolAdd, toolSub} from './index.js';

export var pixelArr=[];



//---------------------height field functions--------------------

export const setUpGrid = () =>{

	//creates grid or removes grid and recreates
	var sW = p.view.size.width, sH = p.view.size.height;

	toolClear.activate();

	if (pixelArr.length!==0){
		pixelArr.forEach(item=>{
			item.remove();
		})
		pixelArr=[];
		console.log('removed and recreated grid');
	}

	for (var i = 0; i<sW ; i+=20){
		for (var j=0; j<sH; j+=20){
			var pixel = new p.Path.Rectangle(i,j,20,20);
			pixel.fillColor= '#909090';
			pixelArr.push(pixel);
		}
	}

}

export const drawAdd = ()=>{

	toolAdd.activate();

	toolAdd.onMouseDrag = (event)=> {
			//finds current rectangle and edit it's grey color to be lighter
			var rect = p.project.hitTest(event.point).item;
			var gray = rect.fillColor.gray;

			rect.fillColor=gray+.03;

	}

}

export const drawSub = ()=>{

	toolSub.activate();

	toolSub.onMouseDrag = (event)=> {
			//finds current rectangle and edit it's grey color  to be darker
			var rect = p.project.hitTest(event.point).item;
			var gray = rect.fillColor.gray;

			rect.fillColor=gray-.03;
	}

}


