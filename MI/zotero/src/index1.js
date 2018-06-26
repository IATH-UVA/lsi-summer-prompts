import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

//global key
const key = '4XchKcJeLMhVHlRj2J80nzAm' ;

//global parameters set up(what happens when you want to change the parameters?)
var zParams = {
			//also had problems with limit, which is why we are working with 25 in the onload
			format: 'json',
			include: 'data',
			v: '3',
			start: '0',
			q: 'TESTING',
			//qmode: '',
			'api_key': key
}


//
//main
window.onload=(()=>{
	//console.log('window loaded');
	var getSample = basicCall('zotero','get', zParams, 25, null);
	// var getReturns = basicReturns(getSample);

	// getReturns.then(console.log);

	//var getSample = basicCall('put', zParams, 25, 'testing tag');
	var getReturns = basicReturns(getSample);
	getReturns.then(console.log);

	//console.log('first call',results)
	//data->config->params will let you know if you are accessing things correctly

	//display info in cards
	getReturns.then(items =>{
		var disAll= [];
	    var disAll = items.map(item=>item);
	    console.log('here', disAll);
	    addCards(disAll);
	});
    
	//getSearchParams();


});

const getSearchParams = (() => {
	//get the params from searching area
	//pass the params to the 'q'

	//add the information type for searching(button to choose like 'title','tag'...)
	//link the button to the certain type of searching
		document.querySelector('#mainform').addEventListener('submit', (event)=>{
		event.preventDefault();
		var returns = [].slice.call(event.target);
		returns.pop();

		console.log('listener', returns);
		//could do a filter based on subject
		var values = returns.filter(item=>{
			return item.id === 'subject'
		})[0].value;
		console.log('subject value', value);
		})

	});


/* write as many functions down here as desired, to simplify your code and avoid repetition */

//overall structure is to have a function that allows you to do everything at once
//source: the api you want to use
//type: 'get','put','post'
//params: the object of parameters you defined globally
//limit: the # of items returned 
//adds: either a keyword or a new object

//TASK -> axios 'get' from multiple api's
//ideas: 
//1)edit basicCall so that you have another parameter, 'source', and can then specifiy which api 
//	want to search from
//2)edit basicCall so that there are multiple 'sample's that each reference a different api
//	can then do multiple calls, each to the diff samples, each with specific parameters
//	make different 'params' variable so that each one is specific to an api, can then pass in when
//	making a specific api call

//remake formats/parameters/and samples specific to each api
//then, make axios 'get' calls specific to each format/param/sample, and PAGE RESULTS

//edit to grab more than one page

const basicCall=((source,type,params,limit,adds)=>{

	//zotero format
	var zFormat= params.format, 
	include= params.include,
	v= params.v,
	start = params.start,
	q= params.q
	//qmode: '',

	var zSample = `http://api.zotero.org/groups/2144277/items/top`;
	var nySample = `http://api.repo.nypl.org/api/v1/items`;

	//var sampleTags = `http://api.zotero.org/groups/2144277/items/<itemKey>/tags`;

	var paraObj = {
		params: {format, v, include, start, q, 'api_key':key}
	}
	
	var initial;

	var total;

	var series =[];

	var iterator = limit;

	var func = type;

	switch(func){

		case 'get':
			var basic = Axios[type](zSample, paraObj)
				.then(result=>{

					total = result.headers['total-results'];
					initial = result.data;
					var i=1;
					
					console.log('get call: ', total, initial, params, paraObj);
					
					while(start < +total){
						start = i*iterator;
						series.push(Axios[type](zSample, {params: {format, v, include, start, q, 'api_key':key} }));
		 				i++;
					}
					 
					return {
						initial: initial,
						series: series
						//consolelog getSample in window.onload to see
					}

				})
				.catch(console.log);

			return basic;
			break;

		case 'put':
			//when 'putting', first you need access to what you need to put
			//stuff on..... i.e. you need to use 'get' in order
			//to 'get' the items you want to manipulate.
			var basic = Axios['get'](zsample, paraObj)
				.then(result=>{

					total = result.headers['total-results'];
					initial = result.data;
					var i=1;
					
					console.log('put call: ', total, initial, params, paraObj);
					
					while(start < +total){
						start = i*iterator;
						series.push(Axios['get'](zsample, {params: {format, v, include, start, q, 'api_key':key} }));
		 				i++;
					}

					let newObj = {
						initial: initial,
						series: series
					}

					//need to map through values of the data array, and access data twice, in order to get
					//to tags

					//b is the existing tags in all items
					//except where is test tag here?
					//what is b then?
					//----------------------------------
					//for put, we'll grab the whole 'data' object
					var updateObj = initial.map(res=>res.data);
					console.log('hmm', updateObj);

					//grab ib's to make put query address
					var objURL = updateObj.map(item=>'http://api.zotero.org/groups/2144277/items/'+item.key);

					//map thru objects and push(new tag) into tags
					var objAdj = updateObj.map(item=>{
						//console.log(item.tags);
						item.tags.push({tag:adds});
						return item;
					})

					console.log(objURL);

					var puts = objAdj.map((item, i)=>{

						//return Axios.put(objURL[i], item);
						return Axios({
							method: 'put',
							url: objURL[i],
							//headers:{'Zotero-API-Key': key},
							data: item
						});

					})

					Promise.all(puts).then(console.log);

					//do the put call in last step (bunch of puts)


					/*
					//g is the existing tags in the first resulting item
					var g = initial.map(res=>res.data.tags[0]);

					//g[0] is the "test tag here"
					//g[0] is the first tag in the first item
					var t = g[0];
					console.log('existing tag(s)', g);
					//console.log('existing tag', t);

					//access the array of tags
					var a = initial.map(res=>res.data.tags);
					//console.log('array of tags', a);
					
					//create the new tag with given keyword
					var newTag = {"tag" : adds};
					//console.log('tag to PUT',newTag);

					//if array is empty
					//then must fill array with tag objs

					//else if array is not empty,
					//must add tag obj to array

					//g.push(newTag);
					console.log('addition of newTag', '_');
					*/

					return newObj;

				}).catch(console.log);
			return basic;

			break;
		
		default:
			console.log('Adding items is not available yet.');
	}
});


const basicReturns = (promObj=>{
	
	var data = [];
	var getSeries = promObj.then(resObj=>{
	
		data = resObj.initial;
		return resObj.series;
	})
	.catch(console.log);
	
	var allData = Promise.all(getSeries).then(resSeries=>{
		var res = resSeries.map(res=>res.data);
		data = data.concat(...res);
		data = data.map(res=>res.data);
		return data;		
	})
	.catch(console.log);
	
	return allData; //promise with master array of data

	//addCards(data);
	
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

		link: itemObj.links.alternate.herf,
		place: (itemObj.data.place)? itemObj.data.place: null,
		title: (itemObj.data.title) ? arrStr(itemObj.data.title) : null,
		author:(itemObj.data.creators) ? arrStr(itemObj.data.creators) : null,
		//abstract: (itemObj.data.abstractNote) ? arrStr(itemObj.data.abstractNote) : null,
		date: itemObj.data.date

		// link: itemObj.isShownAt,
		// thumb: (itemObj.object)? itemObj.object: null,
		// title: (itemObj.sourceResource.title) ? arrStr(itemObj.sourceResource.title) : null,
		// creator:(itemObj.sourceResource.creator) ? arrStr(itemObj.sourceResource.creator) : null,
		// publisher: (itemObj.sourceResource.publisher) ? arrStr(itemObj.sourceResource.publisher) : null,
		// type: (itemObj.sourceResource.type) ? arrStr(itemObj.sourceResource.type) : null,
		// date: itemObj.sourceResource.date.begin,
		// source: itemObj.provider.name,
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


		var card = '';

		var card =` <div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">
		  <div class="card-header">
		    ItemType: ${entry.itemType}
		  </div>
	    <div class="card-body">
	    <a href=${entry.url} target="_blank"><h5 class="card-title">${entry.title}</h5></a>
	      <ul>
	      	<li>place:${entry.place}</li>
	      	<li>author:${entry.creators}</li>
	      	<li>date:${entry.date}</li>
	      	<li>tag:${entry.tags}</li>
	      </ul>
	    </div>
  		</div>`


		// var card =` <div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">
		//   <div class="card-header">
		//     date: ${entry.date}
		//   </div>
	 //    <img class="card-img-top align-self-center" src="${entry.thumb}" style="width: 10rem;" alt="Card image cap">
	 //    <div class="card-body">
	 //    <a href=${entry.link} target="_blank"><h5 class="card-title">${entry.title}</h5></a>
	 //      <ul>
	 //      	<li>creator:${entry.creator}</li>
	 //      	<li>publisher:${entry.publisher}</li>
	 //      	<li>type:${entry.type}</li>
	 //      	<li>source:${entry.source}</li>
	 //      </ul>
	 //    </div>
  // </div>`

		cards.innerHTML += card ;
	})

	document.querySelector('.col-10').append(cards);

}


//other ideas:

				//aggregate by decade then medium, decade year then author, decade then source
				//radio buttons to that effect
