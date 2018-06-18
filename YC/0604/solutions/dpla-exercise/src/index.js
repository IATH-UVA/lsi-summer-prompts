import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const kDP = '5923dd6cd08de1200d544796148a13fa' ;

// see https://pro.dp.la/developers/policies#get-a-key
// see the larger materials for request structures https://pro.dp.la/developers/requests

// 3 calls, max 50 each, 1) images, 1) objects, 1) books, produced during 19th century

// bring together and sort by date

// use bootstrap to append a series of small divs into row/columns of thumbnails...


window.onload=(()=>{
	console.log('window loaded');

//-----------------------general selections-----------------------------
	document.querySelector('#mainform').addEventListener('submit', (event)=>{
		//we'll unpack this listening together
		event.preventDefault();
		console.log('this is the submit event target ', event, event.target);
		var returns = [].slice.call(event.target);
		returns.pop();

		var values = returns.map(item=>{
			return {
				id: item.id,
				checked: (item.className.includes('check'))? item.checked : null,
				value: item.value
				}
		});

		//based on working the values returned create query searches
		//and load materials to the main page
		//making several functions is the cleanest way to do this.

		//1) make an array 'calls' that goes thru the form returns
		//formats the entries and makes calls to the dpla api
		//this means that calls will be an array of promises

		var calls = values.map(item=>{ // calls should thus hold the three format calls

		var subj = subjectFormat(values[0].value);

		if (item.id !== 'subject' && item.checked){
			return grabFormat(subj, item.id);
		}

		}).filter(item=>item!==undefined);


		//2) use your promise.all functions in bluebird to then handle the results
		Promise.all(calls)
			.then(results=>{
				// remember that you are working with arrays of arrays of results

				var res =results.map(i => i.data.docs);
				var resAll=[].concat(...res);

				// 3) integrate the getHathiPage and get simpEntry functions to format your results
				// and remember to sort entries by date. . .
				res = resAll.map(item=>{
					if (!item.object && item.provider.name==="HathiTrust"){
						item.object = getHathiPage(item.originalRecord);
						return simpEntry(item);
					} else {
						return simpEntry(item);
					}
				}).sort((a,b)=>{return a.date-b.date});

				// 4) fill out the function below that takes your formatted results and adds cards to the main window
				addCards(res);


				// 5) bonus - add buttons to resort existing cards order or to display additional values on the side.


			})
			.catch(console.log);





	});
});


/* write as many functions down here as desired, to simplify your code and avoid repetition */

const subjectFormat = (subjectTerm)=>{
	return subjectTerm.split(' ').join('+');
}


const grabFormat = ((subject, format)=>{
	var sample = `https://api.dp.la/v2/items?q="${subject}"&page_size=50&sourceResource.date.before=1900-01-01&sourceResource.type=${format}&api_key=${kDP}`;

	return Axios.get(sample);

});

//for instance this is written to simplify tapping the MARC entries of Hathi records to get a page thumbnail
const getHathiPage = (itemOrigRec) =>{ //pass in entries' original record which lack 'object'

	var arcArr = itemOrigRec.datafield.filter(entry=>entry.tag==="974");
	var arcId = arcArr[0].subfield.filter(field=>field.code==='u')[0]['#text'];

	var imgsrc = `https://babel.hathitrust.org/cgi/imgsrv/image?id=${arcId};seq=0;width=400`

	console.log(imgsrc);
	return imgsrc; // returns thumbnail of sorts.... initial page.

}

const arrStr = (item)=>{
	var resEntry = '';
	Array.isArray(item)? resEntry=item[0] : resEntry=item;

	return resEntry;

}

const simpEntry = (itemObj)=>{
	return {
		link: itemObj.isShownAt,
		thumb: (itemObj.object)? itemObj.object: null,
		title: (itemObj.sourceResource.title) ? arrStr(itemObj.sourceResource.title) : null,
		creator:(itemObj.sourceResource.creator) ? arrStr(itemObj.sourceResource.creator) : null,
		publisher: (itemObj.sourceResource.publisher) ? arrStr(itemObj.sourceResource.publisher) : null,
		type: (itemObj.sourceResource.type) ? arrStr(itemObj.sourceResource.type) : null,
		date: itemObj.sourceResource.date.begin,
		source: itemObj.provider.name,
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

		//4) add the html with inserted js to create the cards here

		var card =` <div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">
		  <div class="card-header">
		    date: ${entry.date}
		  </div>
	    <img class="card-img-top align-self-center" src="${entry.thumb}" style="width: 10rem;" alt="Card image cap">
	    <div class="card-body">
	    <a href=${entry.link} target="_blank"><h5 class="card-title">${entry.title}</h5></a>
	      <ul>
	      	<li>creator:${entry.creator}</li>
	      	<li>publisher:${entry.publisher}</li>
	      	<li>type:${entry.type}</li>
	      	<li>source:${entry.source}</li>
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
