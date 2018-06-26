import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const key = '4XchKcJeLMhVHlRj2J80nzAm' ;

var params = {
			format: 'json',
			include: 'data',
			v: '3',
			start: '0',
			q: '',
			qmode: '',
			'api_key': key
		}

window.onload=(()=>{

	console.log('window loaded');
	
	var getSample = basicCall('get', params, 25, null);
	console.log(getSample);
	
	var getReturns = basicReturns(getSample);
	
	getReturns.then(console.log);
	
	testApi();


});

const testApi = ()=>{
	
	var res = Axios.get('http://api.zotero.org/groups/2144277/items/FCB5J7RN?key=' + key).then(console.log);
	
	
}


/* write as many functions down here as desired, to simplify your code and avoid repetition */

const basicCall=((type,params,limit,adds)=>{

			var format= params.format, 
			include = params.include,
			v= params.v,
			start = params.start;
			//q: '',
			//qmode: '',
			//key = params.key;
	
	
	
	
	var sample = `http://api.zotero.org/groups/2144277/items/top`;
	var paraObj = {
		params: {format, v, include, start, 'api_key':key}
	}
	
	var initial;
	var total;
	var series =[];
	var iterator = limit;

	var basic = Axios[type](sample, paraObj)
		.then(result=>{
			total = result.headers['total-results'];
			initial = result.data;
			var i=1;
			
			console.log('first call: ', result);
			
			while(start < +total){
				start = i*iterator;
				
				//reference issues: use a simple string/int var to hold parameter... if using objects this will be re-assigned
				series.push(Axios[type](sample, {params: {format, v, include, start, 'api_key':key} }));
				i++;
			}
			
			
			console.log({
				initial: initial,
				series: series
			});
			 
			return {
				initial: initial,
				series: series
			}

		})
		.catch(console.log);
		
		return basic;

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
