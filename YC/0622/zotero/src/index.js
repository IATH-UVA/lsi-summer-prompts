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
			q: 'muskau',
			qmode:'',
			//tag: '',
			//itemType: 'book',
			'api_key': key
		}

window.onload=(()=>{
	console.log('window loaded');

/*
	document.querySelector('#mainform').addEventListener('submit', (event)=>{
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
	}

	);
*/

	var getSample = basicCall('get', params, 80, null);
	//console.log(getSample);

	var getReturns = basicReturns(getSample);
	//console.log(getReturns);

	getReturns.then(items =>{
		var disAll= [];
	    var disAll = items.map(item=>item);
	    console.log('here', disAll);
	    addCards(disAll);
	});
    
	getSearchParams();

	// var getArr= getReturns.then(result =>{
	// 	return result.data;
	// });
	// console.log('Display1: ',getArr);
/*
	var disAll= [];
	var disAll = getReturns.map(item=>item.data);

	console.log('Display: ',disAll);
*/
	

	//addCards(getReturns.then());

});


/* write as many functions down here as desired, to simplify your code and avoid repetition */

//redo the first call with all other promises-------
//title testing/searching



const getSearchParams = (() =>{
	//get the params from searching area
	//pass the params to the 'q'

	//add the information type for searching(button to choose like 'title','tag'...)
	//link the button to the certain type of searching
		document.querySelector('#mainform').addEventListener('submit', (event)=>{
		event.preventDefault();
		var returns = [].slice.call(event.target);
		returns.pop();

		console.log('i am here');

		var values = returns.map(item=>{
			return {
				id: item.key,
				checked: (item.className.includes('check'))? item.checked : null,
				value: item.value
				}

		});
		console.log('wa');
	}

	)});



const basicCall=((type,params,limit,adds)=>{
			var format= params.format, 
			include= params.include,
			v= params.v,
			start = params.start,
			q= params.q;
			//itemType= params.itemType;
			//qmode= params.qmode;
			//tag = params.tag;
			//key = params.key;
	
	
	
	
	var sample = `http://api.zotero.org/groups/2144277/items/top`
	var paraObj = {
		params: {format, include, v, limit, start, q, 'api_key':key}
	}
	
	var initial; //hold data from initial call
	var total;
	var series =[]; //call and promises
	var iterator = limit;

	var basic = Axios[type](sample, paraObj) //get access to that location
		.then(result=>{
			total = result.headers['total-results'];
			initial = result.data;
			var i=1;
			
			console.log('first call: ', result);
			//console.log('second call: ', total, initial, params, paraObj);
			
			while(start < +total){
				start = i*iterator; //put into a series of array
				console.log(i);
				//reference issues: use a simple string/int var to hold parameter... if using objects this will be re-assigned
				series.push(Axios[type](sample, {params: {format, include, v, iterator, start, q, 'api_key':key} }));
				i++;
			}
			 
			return {
				initial: initial,
				series: series
			}

		})
		.catch(console.log);
		
		return basic;

		addCards(basic);

});




//what is the basic return
const basicReturns = (promObj=>{
	
	var data = [];
	
	var getSeries = promObj.then(resObj=>{
		data = resObj.initial; //data series from the library, reassigned it to data
		return resObj.series; //all those other promise calls,if there's something,do this, if not, do something else
	})
	.catch(console.log);

	console.log('here');

	
	var allData = Promise.all(getSeries).then(resSeries=>{
		
		var res = resSeries.map(res=>res.data);
		data = data.concat(...res);
		data = data.map(res=>res.data);
		console.log('second return: ', data);
		return data;
		addCards(data);
		
	})
	.catch(console.log);
	console.log('third return: ', allData);
	return allData; //promise with master array of data

	addCards(data);
	//console.log(addCards);
	
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
/*
var card =` <div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">
		  <div class="card-header">
		    ItemType: ${entry.data.data.itemType}
		  </div>
	    <div class="card-body">
	    <a href=${entry.data.data.url} target="_blank"><h5 class="card-title">${entry.data.title}</h5></a>
	      <ul>
	      	<li>place:${entry.data.data.place}</li>
	      	<li>author:${entry.data.data.creators}</li>
	      	<li>date:${entry.data.data.date}</li>
	      </ul>
	    </div>
  </div>`
*/

		cards.innerHTML += card ;
	})

	document.querySelector('.col-10').append(cards);

}


//other ideas:

				//aggregate by decade then medium, decade year then author, decade then source
				//radio buttons to that effect
