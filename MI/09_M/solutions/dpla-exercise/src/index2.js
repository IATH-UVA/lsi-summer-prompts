import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


/*NOTES ON ZOTERO & TEXTUAL INTERACTIONS

query resources on site & list all the options

think about internal readers (think about original source/explicit visuals)

goal: to understand where the frustrations are/where we are hitting walls

BHL/NYPL/Hathi/google

where can you get to? what can you actually show at the end of the day?

how to we align our zotero entries so that we can access that data?

what api structures are working/ what are not?

-----

if you have time:
-test updates/batch editing of zotero entries

-----

really just: get familiar with the api structures

1) review old code/dpla exercise
2) explore searching opportunities /
3) explore page limitations
4) in the afternoon: focus on a particular API structure and try to maniplate it to where it is useful?

NOTES about API structures:
___________________________

1)DPLA API
DPLA has IRI's (Internationalized Resources Identifiers) that are fundamental to Linked Data, and is how
most nodes/properties are identified.
->absolute IRI
->relative IRI

Object Structure:

	1)items
		a) docs

	2)collections
		a)count
		b)start
		c)limit
		d)docs
		e)score
		f)facets
		g)terms

CONCLUSION: usable; while the NYPL seems to have the best organization/documentation, I would say DPLA is the second best. seems to be
more do-able in terms of implementing something like it for use by the LSI, because it is not as structured as the NYPL

2)NYPL API ----------------------------------------------------------------------------------------
http://api.repo.nypl.org/

required account sign up in order to access API

Data Structure:
	1)Collection
		a)container
			-item
				-capture(i.e. image/video/audio)

Uses MODS XML standard to describe the content of the items
http://www.loc.gov/standards/mods/
	->MODS is used by the Library of Congress

has a page response limit: 10 responses/page
	->can change this with page parameter

can use 'Public Domain Filtering' to ensure that you are only getting back
material that is not copyrighted

can filter by resolution

can clearly state what the rights of each item in the Digital Collections has

gives many different possibilites for querying their API and provides examples as well

CONCLUSION: WOW! NYPL knows what's up. Seems to be organized in a very accesible way. Clear documentation and data structure makes this a 
good resource and example to follow/implement/integrate

3)HathiTrust API ---------------------------------------------------------------------------------
ducumentation for the API is is a downloadable PDF
https://www.hathitrust.org/documents/hathitrust-data-api-v2_20150526.pdf

Has a rather tedious process just for signing in and gaining access to their collection
->see 'Programmatic Access'
->necessary use of OAuth

Has many, many, many different levels of access/authorization
->'basic_access','extended_access', etc.

NOTE: the "API is meant for burst activities and not large­scale retrieval of content (e.g., for
datasets)."

CONCLUSION: do not know if this is very usable because of all the tedious authentication required


4) ZOTERO API -------------------------------------------------------------------------------------

Authentication is not required for read access to public libraries

Accessing non-public libraries requires use of an API key

Third Party developers are requested to use OAuth to establish credibility

several different parameters that can be used for searches
everything seems to be at the same level, and they are just differentiated by tags
	->some tags support boolean searches
	->parameters:
		-format
		-include
		-style
		-content
		-exporting
		-searching
		-sorting/pagination

	->parameters have values:
		-each value is dependent on the parameter
		-each parameter has a default value

	->sorting/pagination expanded:
		-can edit limit of pages returned
		-can edit where the pages returned begins
		-can edit the direction of the sort value

CONCLUSION: it terms of data structure, i personally am not a fan of how everything is on the same 'level', but understand its advantages when
searching/using metadata to organize. this seems like a good way of implementing text based results.

*/

//the Zotero URL query parameter key

const kDP = 'P9NiFoyLeZu2bZNvvuQPDWsd' ;

// see https://pro.dp.la/developers/policies#get-a-key
// see the larger materials for request structures https://pro.dp.la/developers/requests

// 3 calls, max 50 each, 1) images, 1) objects, 1) books, produced during 19th century

// bring together and sort by date

// use bootstrap to append a series of small divs into row/columns of thumbnails...


window.onload=(()=>{
	console.log('window loaded');

	var query = grabFormat(null, 'json');

	query.then(result=>{
		console.log(result.data);
	})

//06.18.18


//-----------------------general selections----------------------------- 

	document.querySelector('#mainform').addEventListener('submit', (event)=>{
		//we'll unpack this listening together
		event.preventDefault();
		console.log('this is the submit event target ', event, event.target);
		var returns = [].slice.call(event.target);
		returns.pop();

		//values is equivalent to the returns array mapping items with their id,whether or not they
		//have been 'checked' i.e. selected,
		//and thier item value
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

		//calls goes through the values array,
		//and therefore holds the 3 types of format calls (text,video,image)
		var calls = values.map(item=>{ // calls should thus hold the three format calls

			//subj is 1st item held in the values array
			//                   values                  index
			//                   -------                 -----
			//                   subject                   0
			//                    image                    1
			//                    text                     2
			//                    video                    3
			//select the resulting subject format and put it in its own variable
			var subj = subjectFormat(values[0].value);

			if (item.id !== 'subject' && item.checked){
				return grabFormat(subj, item.id);
			}

		//make sure to filter out any empty results
		}).filter(item=>item!==undefined);


		//2) use your promise.all functions in bluebird to then handle the results
		Promise.all(calls)
			.then(results=>{
				// remember that you are working with arrays of arrays of results

				var res =results.map(i => i.data.docs);

				//create an array that you can append the res array to
				//is really just a copy of res
				var resAll=[].concat(...res);

				// 3) integrate the getHathiPage and get simpEntry functions to format your results
				// and remember to sort entries by date. . .
				res = resAll.map(item=>{
					if (!item.object && item.provider.name==="HathiTrust"){
						item.object = getHathiPage(item.originalRecord);
						return simpEntry(item);
					}
					else if(item.provider.name ==="NYPL"){

					} 

					else {
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

//------------------------
//---Integrating Zotero---
// Try: using the Zotero API instead of the DPLA API


const subjectFormat = (subjectTerm)=>{
	return subjectTerm.split(' ').join('+');
}


const grabFormat = ((subject, format)=>{
	//base Zotero API URL; Version 3; ....
	var sample = `https://api.zotero.org/groups/2144277/items`;

	var paraObj = {
		params: {
			format: format,
			include: 'bib',
			v: '3'
			//api_key = kDP
		}
	}


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

//this is written to simplify tapping into the Zotero entries to get a page thumbnail
//passeses in ??  to return a small excerpt and general info
const getZoteroResources = (item) =>{
	return item;
} 

const arrStr = (item)=>{
	var resEntry = '';

	//does the array have the item? if so, the resulte entry is item and index 0 (the subject?), 
	//otherwise the resulte entry it the item

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
