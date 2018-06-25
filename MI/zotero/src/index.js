import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

/*task:
-----------------------------------------------------------------
1. Go through file and understand file 
2. use test samples online to try to do some searches
	->test files on zotero have TESTING in title
3. attempt PUT method

work on put and posts, use conditionals to break stuff apart
keep the basic pattern here (does that mean keep same function?),
might need to set up a diff function for what you edit...
editing as in editing a keyword? 
try just printing results and not results.data
-----------------------------------------------------------------

ideas for PUT
-----------------------------------------------------------------
1. add a conditional for the type of axios call
2. add a second conditional for the type of add
	->2 options: add a keyword, or add a new obj
3. outside function to handle formatting for adding a keyword
4. outside function to handle formatting for adding an item
	->item to be added is likely to be a link to elsewhere, to GIS
-----------------------------------------------------------------
current goal: 
	->begin/attempt completion of ideas 1-3

	if ('get'){
		keep what is here
	}
	if('put'){
		if(adds is a keyword){
				data->tags->tag->"Display Maps"
		}
		
		if (is a new obj){

		}	
	}

perhaps need an outside function to handle what adds is....determineAdd.
could even be a promise
is adds a new object? or is adds a keyword to add to an object?
new object likely to be a link to elsewhere -- GIS or something

*/
//global key
const key = '4XchKcJeLMhVHlRj2J80nzAm' ;

//global parameters set up(what happens when you want to change the parameters?)
var params = {
			//also had problems with limit, which is why we are working with 25 in the onload
			format: 'json',
			include: 'data',
			v: '3',
			start: '0',
			q: 'TESTING',
			qmode: '',
			'api_key': key
		}

//main
window.onload=(()=>{
	//console.log('window loaded');
	
	var getSample = basicCall('get', params, 25, null);

	var getReturns = basicReturns(getSample);
	
	getReturns.then(console.log);
	//getSample.then(console.log);



	//console.log('first call',results)
	//data->config->params will let you know if you are accessing things correctly


});


/* write as many functions down here as desired, to simplify your code and avoid repetition */

//so: overall structure is to have a function that allows you to do everything at once
//type: 'get','put','post'
//params: the object of parameters you defined globally
//limit: the # of items returned 
//	NOTE-> meg also had issues with limit not working for anything other than 25?
//		-> should look into bc wth


//adds: either a keyword or a new object?
const basicCall=((type,params,limit,adds)=>{

	//make sure to not manipulate by reference,
	//keep track of your data types!
	//resetting what was already define above

			var format = params.format, 
			include = params.include,
			v = params.v,
			start = params.start,
			q = params.q
			//qmode: '',

			//cannot rest key because it has been defined globally
			//key = params.key;
	
	//grabbing the top level items
	var sample = `http://api.zotero.org/groups/2144277/items/top`;

	//now putting all those parameters you defined earlier into an object, so that you can actually
	//access them as parameters of an obj
	var paraObj = {
		//es6 notation, just didnt want to use api_Key as a var name
		params: {format, v, include, start, q,'api_key':key}
	}
	
	//hold inital value from call
	var initial;

	//hold results from axios calls
	var total;

	//stick empty promises in here
	var series =[];

	//work with items returned
	var iterator = limit;

	//notation -> axios is accessing a function at the location, is still a 'GET'
	//dont need dot notation
	//this in itself is a promise
	//what we said was: 
	//axios['get'](`http://api.zotero.org/groups/2144277/items/top`,params: {format, v, include, start, 'api_key':key}})
	// ->THEN 
	var basic = Axios[type](sample, paraObj)
		.then(result=>{

			//stuffing total results value into total
			total = result.headers['total-results'];

			//stuffing initial results value into initial
			initial = result.data;

			//global i variable, so that 
			var i=1;
			
			console.log('second call: ', total, initial, params, paraObj);
			
			//if your new start is larger than total, what do you do?
			//currently start is at 0
			//+total = parseInt on total
			while(start < +total){
				//1*25 = start
				//start = 25

				start = i*iterator;
				
				//remember: series is the empty array meant to hold promises
				//so push the "axios['get'](`http://api.zotero.org/groups/2144277/items/top`,params: {format, v, include, start, 'api_key':key}})"
				//            ^GET call inside the empty array, for every 25 results (every [limit] results)
				//reference issues: use a simple string/int var to hold parameter... if using objects this will be re-assigned
				series.push(Axios[type](sample, {params: {format, v, include, start, q,'api_key':key} }));
 
				i++;
			}
			 
			return {
				//return this so that basic = these obj changes

				//initial is the json
				//just make sure that it is being returned with proper edits, reset the variable
				initial: initial,

				//series is holding the promises
				//reset the variable
				series: series

				//consolelog getSample in window.onload to see
			}

		})
		.catch(console.log);
		
		//now we have an obj that holds the changes initial and series
		//so return it!
		return basic;

});

//a function to deal with the returns after we use basic calls
//so we are dealing ith an object that has the initial array of 25 results
//and then the series, which is a series of promises to deal with the rest of the results
//each promise represents 25 results
const basicReturns = (promObj=>{
	
	//compound all diff jsons getting back
	var data = [];
	
	//mirror the way you structured the inital calls, handle the array first then crack open the promises
	//getSeries is a promise....and promObj must be handled with basicCall before it is fullfilled
	//
	var getSeries = promObj.then(resObj=>{
		//set empty data array to be inital array with first 25 results
		data = resObj.initial;

		//get series = series (now you can do a promise.all on getSeries)
		//necessary to crack open in order to access the secondary layer of promises
		return resObj.series;
	})
	.catch(console.log);
	
	//now can work with the array of arrays, and promise.all
	//so once getSeries is fullfilled, which will happen when basicCall is fullfilled,
	//allData will be fulfilled
	var allData = Promise.all(getSeries).then(resSeries=>{
		
		//take every entry, i.e. every array of 25 results, & grab data
		var res = resSeries.map(res=>res.data);

		//add to OG data (25+849 objs)
		data = data.concat(...res);

		//one more to grab data from inital entries as well
		data = data.map(res=>res.data);


		return data;
		
	})
	.catch(console.log);
	

	return allData; //promise with master array of data
	
})


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
