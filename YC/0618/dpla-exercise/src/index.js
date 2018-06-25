import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

//const kDP = 'P9NiFoyLeZu2bZNvvuQPDWsd' ;

// see https://pro.dp.la/developers/policies#get-a-key
// see the larger materials for request structures https://pro.dp.la/developers/requests

// 3 calls, max 50 each, 1) images, 1) text, 1) videos, produced during 19th century
//bring together and sort by date

// append a series of small divs or formatted 'cards' into row/columns of thumbnails...




window.onload=(()=>{
	console.log('window loaded');

	var query = grabFormat(null, 'json');


//-----------------------general selections-----------------------------
/*	document.querySelector('#mainform').addEventListener('submit', (event)=>{
		event.preventDefault();
		var returns = [].slice.call(event.target);
		returns.pop();

		var values = returns.map(item=>{
			return {
				id: item.id,
				checked: (item.className.includes('check'))? item.checked : null,
				value: item.value
				}
		});


*/
		//based on working the values returned create query searches
		//and load materials to the main page
		//making several functions is the cleanest way to do this.

	//1) make an array 'calls' that goes thru the form returns
		//formats the entries and makes calls to the dpla api
		//this means that calls will be an array of promises



		// var calls = values.map(item=>{ // calls should thus hold the three format calls

		// //write code for call here
		// var subj = grabtFormat(values[0].value);
		// if(item.id !== 'subject'&& item.checked){
		// 	return grabFormat(subj, item.id);
		// }

		// }).filter(item=>item!==undefined);


	//2) use your promise.all functions in bluebird to then handle the results
		query.then(result=>{

				console.log(result.data);
				console.log(result);
				var resultFirst=result.data;

				// remember that you are working with arrays of arrays of results
				/*
				var res =results.map(i => i.data.docs);
				var resAll=[].concat(...res);


	// 3) integrate the getHathiPage and get simpEntry functions to format your results array
	// and remember to sort entries by date. . .
				//write code to format arrays and hold core data for each entry, including thumbnails
				res = resAll.map(item=>{
					if (!item.object && item.provider.name==="HathiTrust"){
						//item.object = getHathiPage(item.originalRecord);
						return simpEntry(item);
					} else {
						return simpEntry(item);
					}
				}).sort((a,b)=>{return a.date - b.date});*/


	// 4) fill out the function below that takes your formatted results and adds cards to the main window
				addCards(resultFirst);


	// 5) bonus - add buttons to resort existing cards order or to display additional values on the side.


			})
			.catch((error) =>{console.log('error')});


			/*axios.get('/user')
                 .then(function(response){
                       console.log(response.data);
                       console.log(response.status);
                       console.log(response.statusText);
                       console.log(response.headers);
                       console.log(response.config);
                       });
             */

			// const querystring = require('querystring');
			// axios.post('https://api.zotero.org/groups/2144277/items/', querystring.stringify({
			// 	'title':'',
			// 	'data':{},
			// }))

	//});


}); 


/* write as many functions down here as desired, to simplify your code and avoid repetition */
const subjectFormat = (subjectTerm)=>{
	return subjectTerm.split(' ').join('+');
}


const grabFormat = ((subject, format)=>{
	var sample = `https://api.zotero.org/groups/2144277/items`
	//q="${subject}"&page_size=50&sourceResource.date.before=1900-01-01&sourceResource.type=${format}&api_key=${kDP}`;
	var paraObj = {
		params: {
			format: 'json',
			include: 'bib,citation,data',
			v: '3',
			limit: '100',
			sort: 'date',
			//style:'chicago-note-bibliography',
            //q:'summer',
            //itemType:'artwork',
			//direction: 'asc',
			//qmode: 'everthing'
			//api_key: kDP,

		}
	}

	return Axios.get(sample, paraObj);

});


/*
export function Post(url, data) {
    
    //convert Array to String
     
    function searchArray(data){
        Object.keys(data).forEach((key) => {
            if ((typeof data[key]) === 'array') {
                data[key] = JSON.stringify(data[key]) // for interior JSON object
            }else if ((typeof data[key]) === 'object'){
                searchArray(data[key])
            }
        })
    }

    searchArray(data); //convert array to string
    let params = qs.stringify(data); //qs module for converting params
   return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
            resolve(response.data)
        }, err => {
             reject(err);
        })
    })
}
*/



//const inputField = document.querySelector('#input');


//for instance this is written to simplify tapping the MARC entries of Hathi records to get a page thumbnail
/*const getHathiPage = (itemOrigRec) =>{ //pass in entries' original record which lack 'object'
    console.log(itemOrigRec);

	var arcArr = itemOrigRec.datafield.filter(entry=>entry.tag==="974");
	var arcId = arcArr[0].subfield.filter(field=>field.code==='u')[0]['#text'];

	var imgsrc = `https://babel.hathitrust.org/cgi/imgsrv/image?id=${arcId};seq=0;width=400`

	console.log(imgsrc);
	return imgsrc; // returns thumbnail of sorts.... initial page.

} */


// var itemForExport;
// while (itemForExport = Zotero.nextItem()){
// 	Zotero.write(item.title);
// }




const arrStr = (item)=>{
	var resEntry = '';
	if (Array.isArray(item)) {
		resEntry=item[0];
	} else {
		resEntry=item;
	}; 

	return resEntry;

}

const simpEntry = (itemObj)=>{
	return {
		link: itemObj.links.alternate.herf,
		place: (itemObj.data.place)? itemObj.data.place: null,
		title: (itemObj.data.title) ? arrStr(itemObj.data.title) : null,
		author:(itemObj.data.creators) ? arrStr(itemObj.data.creators) : null,
		//abstract: (itemObj.data.abstractNote) ? arrStr(itemObj.data.abstractNote) : null,
		date: itemObj.data.date,
	}
}


const addCards = (arr) => {

	if (!document.querySelector('#cards')) {
			var cards = document.createElement('div');
			cards.id = "cards";
			cards.style.display = 'flex';
			cards.style.flexWrap = 'wrap';
			cards.style.height = '80vh';
			cards.style.overflow ='auto';
	}

	arr.forEach(entry=>{

		//4) add/edit the html with inserted js to create the cards here, look at the bootstrap options

		var card = '';

		var card =` <div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">
		  <div class="card-header">
		    ItemType: ${entry.data.itemType}
		  </div>
	    <div class="card-body">
	    <a href=${entry.links.alternate.href} target="_blank"><h5 class="card-title">${entry.data.title}</h5></a>
	      <ul>
	      	<li>place:${entry.data.place}</li>
	      	<li>author:${entry.data.creators}</li>
	      	<li>date:${entry.data.date}</li>
	      </ul>
	    </div>
  </div>`


		cards.innerHTML += card ;
	})

	document.querySelector('.col-10').append(cards);

}


//other ideas:

				//aggregate by decade then medium, decade year then author, decade then source
				//radio buttons to that effect
