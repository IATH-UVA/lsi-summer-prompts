import paper from 'paper';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import {setUpGrid, drawAdd, drawSub} from './drawing.js';
import {cutHor, cutVert, cutClear} from './sectioning.js';



//--------radio options for drawing interactions-------------
var optionsDraw = {
	title: 'draw and test terrain',
	name:'draw',
	options:[
	{label: 'create terrain', id:'draw0', value:'create', default: 'checked'},
	{label: 'cut sections', id:'cut0', value: 'cut', default: ''}
	],
	visibility: 'block'
};

var optionsCreate = {
	title: 'create a height field',
	name:'create',
	options:[
	{label: 'add height', id:'draw0a', value:'add', default: 'checked'},
	{label: 'subtract height', id:'draw0b', value: 'subtract', default: ''},
	{label: 'clear and restart', id:'draw0c', value: 'reset', default: ''}
	],
	visibility: 'block'
};

var optionsSection = {
	title: 'cut and show section',
	name:'section',
	options:[
	{label: 'cut horizontal', id:'cut0a', value:'hor', default: 'checked'},
	{label: 'cut vertical', id:'cut0b', value: 'vert', default: ''},
	{label: 'clear sections', id:'cut0d', value: 'clear', default: ''}
	],
	visibility: 'none'
};




var actions = { /// add values later after creating functions
	draw0: {
		draw0a: drawAdd,
		draw0b: drawSub,
		draw0c: setUpGrid
	},
	cut0: {
		cut0a: cutHor, //create these in sectioning.js
		cut0b: cutVert,
		cut0d: cutClear
	}
}

//--------------------- make the shared variables portable---------------

console.log(window);

	export var p = new paper.PaperScope();

	//setting in the global for ease
	export var toolClear = new p.Tool();
	export var toolCut = new p.Tool();

	export var toolAdd = new p.Tool();
	export var toolSub = new p.Tool();

	export var toolHor = new p.Tool();
	export var toolVert= new p.Tool();



//--------------create document structure --------------
/*
look through the starting html and note it's very simple structure

3 rows
header and title
window for canvas with tools at one side
footer for commentary
*/

window.onload=()=>{

	window.p=p;

	//create functions and call here to
	// 1) rework layout and set-up canvas area,
	// 2) add radio options with different visibility and dynamic selection
	// 3) use those options to trigger different canvas interactions
	// 4) fill out the canvas interactions by coding the section analysis layer



	setUpCanvas(); // fill in code for 1
	addRadioChoices(); // complete partial function for 2
	setUpGrid(); // done as example for section tools
	checkRadioSelections(); //done, review

	actions.draw0.draw0a();

	//call individually instead of by button

}

//----------------supporting dynamic dom creation-----------------

function setUpCanvas(){

	/*programmatically create a canvas element, with the id 'myCanvas', a height 70% of the screen, 100% of the surrounding div width and append it to the div with class col-10'

	add a title to the top row

	add some placeholder text to the footer

	set up your paper scoped canvas
	*/
	//create canvas and style it

	var canvas = document.createElement('canvas')
		canvas.id = 'myCanvas';
		canvas.style.height = window.screen.height*.7+'px';
		canvas.style.width = '100%';

	//select column-10 and append canvas
	//var wDiv = document.getElementsByClassName('col-10')[0]; //old style
	var wDiv = document.querySelector('.col-10');
		wDiv.innerHTML = "";
		wDiv.append(canvas);

	//select and add text in the header and footer by selecting rows
	//var rows = document.getElementsByClassName('row'); //old style
	var rows = document.querySelectorAll('.row');
		rows[0].style.height = '8vh';
		rows[0].innerHTML='<div class="col"><h2>Terrain Testing</h2></div>';

		rows[2].style.height = '8vh';
		rows[2].children[0].innerHTML='placeholder for dynamics comments';


	p.setup(myCanvas);



}

function createRadios(valuesObj){ // we'll review this together

	var form = document.createElement('form');

	form.innerHTML+=`<div><h5>${valuesObj.title}</h5></div>`;

	valuesObj.options.forEach((option, i)=>{

				form.innerHTML+=`<div class="form-check">
  <input class="form-check-input" type="radio" id="${option.id}" name="${valuesObj.name}" value="${option.value}" ${option.default}>
  <label class="form-check-label" for="${option.id}">
    ${option.label}
  </label>
</div>`;

	})

	form.innerHTML += `
	</form></br>`;

	form.style.display = valuesObj.visibility;

  return form;
}



function addRadioChoices(){
	/*
	select the right side col-2 and use the above functions to add the radio options in that space
	*/
	var sides = document.querySelector('.col-2');
	sides.innerHTML='';

	var draw = createRadios(optionsDraw);
	var create = createRadios(optionsCreate);
	var section = createRadios(optionsSection);

	sides.append(draw, create, section);

}


function checkRadioSelections(){ // we'll review this listening section...
	var forms = Array.from(document.querySelectorAll('form'));
	var names = ['draw', 'create','section'];
	var ids =['draw0', 'draw0a','cut0a'];

	forms.forEach((item,i)=>{

		if (i>0){
			item.onchange=()=>{
				let draw = Array.from(document.querySelectorAll(`input[name=${names[i]}]`)).filter(item=>item.checked)[0].id;
				let base = Array.from(document.querySelectorAll(`input[name=${names[0]}]`)).filter(item=>item.checked)[0].id;
				ids[i] = draw;


				console.log(actions[base][draw]);

				if (actions[base][draw] !== ''){
					actions[base][draw]();
				}
				//actions[ids[0]][ids[i]]
				//call action here for the canvas based on ids which are active
			}

		} else {
			item.onchange=()=>{
				let base = Array.from(document.querySelectorAll(`input[name=${names[i]}]`)).filter(item=>item.checked)[0].id;
				let create = Array.from(document.querySelectorAll(`input[name=${names[i+1]}]`)).filter(item=>item.checked)[0].id;
				let section = Array.from(document.querySelectorAll(`input[name=${names[i+2]}]`)).filter(item=>item.checked)[0].id;

				//call action here for the canvas based on ids which are active
					forms[1].style.display = 'none';
					forms[2].style.display = 'none';

				if (base==='draw0') {
					forms[1].style.display = 'block';
					actions[base][create]()
				} else if (base==='cut0') {
					forms[2].style.display = 'block';
					actions[base][section]()
				}

			}
		}
	})

}



