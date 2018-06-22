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

//const kDP = 'P9NiFoyLeZu2bZNvvuQPDWsd' ;

// see https://pro.dp.la/developers/policies#get-a-key
// see the larger materials for request structures https://pro.dp.la/developers/requests

// 3 calls, max 50 each, 1) images, 1) objects, 1) books, produced during 19th century

// bring together and sort by date

// use bootstrap to append a series of small divs into row/columns of thumbnails...

//06.18.18

window.onload=(()=>{
	console.log('window loaded');

	var query = grabFormat(null, 'json');
	//returns a JSON array for multi-object requests and a single JSON object
	//for single-object requests

	//query.addCondition('tag', 'is', )

	//console.log(query);

	//var b = query.bib;
	//var d = query.data;
	//var c = query.citation;

	query.then(result=>{
		//console.log(result.data);
		//console.log(result[0].data);
		//console.log(result.key);
		//console.log(result.data.key);
		console.log(result.data[0]);
		console.log(result.data[0].library);
		console.log(result.data);

		addCards(result.data);

		//console.log(result.data);

		

		//console.log(crtr);
	})


	//query.map(item =>{
	//	return simpEntry(item);
	//});
//try to use addCards to visualize?

//addCards(query);


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
			include: 'bib, citation, data', 
			v: '3'
			//qmode: 'everything'
			//api_key = kDP
		}
	}


	return Axios.get(sample);

});



const arrStr = (item)=>{
	var resEntry = '';

	//does the array have the item? if so, the resulte entry is item and index 0 (the subject?), 
	//otherwise the resulte entry it the item

	Array.isArray(item)? resEntry=item[0] : resEntry=item;

	return resEntry;

}

const simpEntry = (itemObj)=>{
	return {
		//link: itemObj.isShownAt,
//		key: itemObj[0].key;
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

		var card =
		`<div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">

	    <h5 class="card-title">${entry.data.title}</h5></a>
	      <ul>
	      	<li>Abstract Note: ${entry.data.abstractNote}</li>
	      	<li>Date: ${entry.data.date}</li>
	      	<li>key: ${entry.key}</li>
	      	<li>Access Date: ${entry.data.accessDate}</li>

	      </ul>
	     <a href=${entry.links.alternate.href} target = "_blank"><h8 class="card-title">see on zotero</h8></em></a>

  		</div>`

		cards.innerHTML += card ;
	})

	document.querySelector('.col-10').append(cards);

}