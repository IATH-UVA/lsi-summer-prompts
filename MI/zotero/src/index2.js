import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

//------------------------zotero parameters---------------------------
const zKey = '4XchKcJeLMhVHlRj2J80nzAm' ;

var zParams = {
	//also had problems with limit, which is why we are working with 25 in the onload
	format: 'json',
	include: 'data',
	v: '3',
	start: '0',
	q: 'TESTING',
	//qmode: '', 
	'api_key': zKey
}

//-----------------------nypl parameters------------------------------
const nyKey = '50yle0sba1t2yh2j';

var nyParams = {
	//format is json by default, no need to specify
	q: 'cats',
	publicDomainOnly: true,
	per_page: '500' //max 500
	//'token': nyKey

}

//-------------------------bhl parameters-----------------------------
const bhlKey = 'd50b0733-e2b2-4e43-a521-0b976dcb13ae';

var bhlParams = {
	format: 'json',
	op: 'SubjectSearch',
	//searchTerm: 'fish',
	subject: 'fish',
	//lname: 'White',
	'apikey': bhlKey
	//pages: 't',
	//ocr: 't'
}

//main
window.onload=(()=>{
	
	//var getSample = basicCall('zotero', 'get', zParams, 25, null);
	//var getSample = basicCall('nypl','get', nyParams, 25, null);
	var getSample = basicCall('bhl', 'get', bhlParams, 25, null);
	//getSample.then('BHL getSample',console.log);
	//var getSample = basicCall('put', zParams, 25, 'testing tag');
	
	var getReturns = basicReturns(getSample);
	getReturns.then(console.log);

	//display info in cards
	// getReturns.then(items =>{
	// 	var disAll= [];
	//     var disAll = items.map(item=>item);
	//     console.log('here', disAll);
	//     addCards(disAll);
	// });
    
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

//edit to grab more than one page

const basicCall=((source,type,params,limit,adds)=>{

	//--------------------------------zotero------------------------------------ 
	
	var zFormat= zParams.format, 
	zInclude= zParams.include,
	zV= zParams.v,
	zStart = zParams.start,
	zQ= zParams.q
	//qmode: '',

	var zSample = `http://api.zotero.org/groups/2144277/items/top`;

	var zParaObj = {
		params: {zFormat, zV, zInclude, zStart, zQ, 'api_key':zKey}
	}

	//--------------------------------nypl--------------------------------------

	var nyQ = nyParams.q,
	nyPDO = nyParams.publicDomainOnly,
	nyPP = nyParams.per_page

	var nySample = `http://api.repo.nypl.org/api/v1/items/search`;

	var nyParaObj = {
		params: {nyQ, nyPDO, nyPP}
	}

	//-------------------------------bhl---------------------------------------- 

	var bhlFormat = bhlParams.format,
	bhlOP = bhlParams.op,
	bhlSubject = bhlParams.subject
	
	var bhlSample = `https://www.biodiversitylibrary.org/api2/httpquery.ashx/search`;

	var bhlParaObj = {
		params: {'op': bhlOP,'subject': bhlSubject, 'format': bhlFormat, 'apikey' :bhlKey}
	}

	//var sampleTags = `http://api.zotero.org/groups/2144277/items/<itemKey>/tags`;

	var initial;

	var total;

	var series =[];

	var iterator = limit;

	var func = source;

	switch(func){

		case 'zotero':
			var basic = Axios[type](zSample, zParaObj)
				.then(result=>{

					total = result.headers['total-results'];
					initial = result.data;
					var i=1;
					
					console.log('result.data: ', result.data);
					console.log('zotero get call: ', total, initial, params, zParaObj);
					
					while(zStart < +total){
						zStart = i*iterator;
						series.push(Axios[type](zSample, {params: {zFormat, zV, zInclude, zStart, zQ, 'api_key':zKey} }));
		 				i++;
					}

					console.log('initial: ', initial);
					console.log('series: ', series);
					 
					return {
						initial: initial,
						series: series
						//consolelog getSample in window.onload to see
					}
				})
				.catch(console.log);
			return basic;
			break;

		case 'nypl':

			var basic2 = Axios[type](nySample, nyParaObj)
				.then(result2=>{
					//dont need the total_results header
					//BUT we do need the authentication token header
					auth = 'Token token = '+nyKey;
					headers = {'Authorization': auth};
					total = 500;
					initial = result2.data;
					start = 0;
					var i =1;
					console.log('nypl get call: ', total, initial, nyParams, nyParaObj);
					while(start < +total){
						//make limit = 500
						//so if there are more than 500 results, it will iterate
						//every 500 results
						start = i*iterator;
						series.push(Axios[type](nySample, {params : {nyQ, nyPDO, nyPP}}));
						i++;
					}

					return{
						initial: initial,
						series: series
					}
				})
				.catch(console.log);
			return basic2;
			break;

		case 'bhl':
			var basic3 = Axios[type](bhlSample, bhlParaObj)
				.then(result3=>{
					total=500;//should probs change -- must look into more
					initial = result3.data;
					var bhlStart = 0;
					var i = 1;

					console.log('bhl get call: ', initial, 'here', bhlParams, bhlParaObj);
					console.log('result3.data: ', result3.data);

					while(bhlStart < +total){
						bhlStart = i*iterator;
						series.push(Axios[type](bhlSample, {params: {'op':bhlOP,'subject': bhlSubject,'format': bhlFormat, 'apikey':bhlKey}}));
						i++;
					}

					console.log('series: ', series);
					console.log('initial: ', initial);

					return{
						initial: initial,
						series: series
					}
				})
				.catch(console.log);
				console.log(basic3);

		return basic3;
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

		cards.innerHTML += card ;
	})

	document.querySelector('.col-10').append(cards);

}