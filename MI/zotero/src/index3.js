import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

var imageThumbURL = [];
//array of item URL strings -> for bibliographic results
var itemURL = [];

//array of item bibliographic information -> for all results? start with bibliographic ones
var bibInfo = [];

const key = '4XchKcJeLMhVHlRj2J80nzAm' ;

var params = {
			format: 'json',
			include: 'data',
			v: '3',
			start: '0',
			q: '',
			qmode:'',
			sort: 'title', 
			//tag: '',
			//itemType: 'book',
			'api_key': key
		}

window.onload=(()=>{
	console.log('window loaded');


    //getSearchParams();

	var getSample = basicCall('get', params, 80, null);
	//console.log(getSample);

	var getReturns = basicReturns(getSample);
	//console.log(getReturns);

	getReturns.then(items =>{
	    var disAll = items.map(item=>item);
	    //console.log('here', disAll);
	    addCards(disAll);
	    //addThumbnails(disAll);
	    getMoreData(disAll);
	});

	//getBib(bibInfo);
    
    //console.log('here1', disAll);
	//getSearchParams();

	//getMoreData(disAll);

/*
	// var getArr= getReturns.then(result =>{
	// 	return result.data;
	// });
	// console.log('Display1: ',getArr);
	var disAll= [];
	var disAll = getReturns.map(item=>item.data);
	console.log('Display: ',disAll);
	//addCards(getReturns.then());
*/

/*	console.log("what", imageThumbURL.length);
	for(var m = 0; m<imageThumbURL.length;m++){
		console.log('URL #', m, imageThumbURL[m]);
	}

	var footerElem = document.getElementById("footer");

	//addCards(imageThumbURL);

	//footerElem.innerHTML + "i am the footer";
	//console.log('footer: ',footerElem.innerHTML);
	var sorse = [];
	var source = 'https://www.biodiversitylibrary.org/pagethumb/';

	for(var m = 0; m <imageThumbURL.length; m++){
		sorse.push(source + imageThumbURL[m]);
		
	}
	console.log(sorse);*/

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

		console.log('listener', returns);

		var value = returns.filter(item=>{
			return item.id === 'subject'

		})[0].value;
		console.log('subject value', value);
		params.q = value;
	}

	)});

/*

Accessing Zotero:
------------------------------------------------
First we must make a call to the items stored in zotero. For that we developed a function 'basicCall' to handle 
several types of calls, different parameters(stored in its own object), a limit of results to get back, and to handle any items to add.
This function makes a call to the Zotero API, and stores the results displayed on 'cards' on the webpage.
In order to handle the results from this call, a function 'basicReturns' was developed, that handles the specificity of
the Zotero API and creates a result of data that can be further worked with to display on a webpage. 

const basicCall=((type,params,limit,adds)=>{
			var format= params.format, 
			include= params.include,
			v= params.v,
			start = params.start,
			q= params.q;
		
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
				
			while(start < +total){
				start = i*iterator; //put into a series of array
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
});


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


Sorting Zotero Entries based on their source:
------------------------------------------------
There are over 800 Zotero Entries that we can now work with, however they are not all from the same source.
Each is from a different online digital library, with its own individually structured data. So we divide and conquer: a method 
is developed to organize the results into their own category, based on their source. Now we can begin to tackle 
each individual source and their accompanying API.


Individual Methods for Individual APIs:
------------------------------------------------
Due to the process of access an API being so varied for each one, we divided up the API acccessing
into individual methods.

*/


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
	
		
	//only looking at items in BHL folder //collections/KXUA5LUF/
	var sample = `http://api.zotero.org/groups/2144277/collections/KXUA5LUF/items/top`
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
				//console.log(i);
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
		//addThumbnails(basic);

});




//what is the basic return
const basicReturns = (promObj=>{
	
	var data = [];
	
	var getSeries = promObj.then(resObj=>{
		data = resObj.initial; //data series from the library, reassigned it to data
		return resObj.series; //all those other promise calls,if there's something,do this, if not, do something else
	})
	.catch(console.log);

	//console.log('here');

	var allData = Promise.all(getSeries).then(resSeries=>{
		
		var res = resSeries.map(res=>res.data);
		data = data.concat(...res);
		data = data.map(res=>res.data);
		//console.log('second return: ', data);
		return data;
		addCards(data);
		//addThumbnails(data);
		
	})
	.catch(console.log);
	//console.log('third return: ', allData);
	return allData; //promise with master array of data

	addCards(allData);
	//console.log(addCards);
	//addThumbnails(allData);


	
})


//.......................................................
/*
//get urls from the results
    ..new array(1) to hold the url data
//read the urls and recognize the right methods to get api
    ..map the array(1) and collect the url from the same web-api to a new array(2)
//direct the url to specific get api function
//get access to that api
    ..read the url in the array(2)
    ..grab data through api
    ..get results and display
*/

const getMoreData = (resultArr) =>{
	//array(1)
	var urlArr=resultArr.map(item=>item.url);
	//urlArr.push(resultArr.map(item=>item.url));
	//console.log('array here', urlArr);

    //array(2)s
	var BHLArr=[], HathiArr=[], LOCArr=[], NYPLArr=[], ArchiveArr=[];

  for(var i=0;i<urlArr.length;i++){
	if(urlArr[i].includes('www.biodiversitylibrary.org')){
		BHLArr.push(urlArr[i]);
		//console.log('see BHL here', BHLArr);
		//getDataFromBHL();

	} else if(urlArr[i].includes('catalog.hathitrust.org')){
		HathiArr.push(urlArr[i]);
		//console.log('see Hathi here', HathiArr);
		//getDataFromHathitrust();

	} else if(urlArr[i].includes('loc.gov')){
		LOCArr.push(urlArr[i]);
		//console.log('see LOC here', LOCArr);
		//getDataFromLOC();

	} else if(urlArr[i].includes('digitalcollections.nypl.org')){
		NYPLArr.push(urlArr[i]);
		//console.log('see NYPL here', NYPLArr);
		//getDataFromNYPL();

	} else if(urlArr[i].includes('archive.org')){
		ArchiveArr.push(urlArr[i]);
		//console.log('see Archive here', ArchiveArr);
		//getDataFromArchive();

	} else {
		console.log('Cannot dig deeper ');//doing nothing
	};
  };

  console.log('see LOC here', LOCArr);

  getDataFromBHL(BHLArr);
  getDataFromHathitrust(HathiArr);
  getDataFromLOC(LOCArr);
  getDataFromNYPL(NYPLArr);
  getDataFromArchive(ArchiveArr);

}



const getDataFromBHL=(arrBHL)=>{
	//API information page --- https://biodivlib.wikispaces.com/Developer+Tools+and+API
	//console.log('BHL', arrBHL);

	for(var i = 0; i < arrBHL.length; i++){
		var j = arrBHL[i];

		var itemKey, bibKey;

		var k = j.lastIndexOf('/');
		var key = j.substring(k+1, (j.length));

		const bhlKey = 'd50b0733-e2b2-4e43-a521-0b976dcb13ae';

		var bhlSample = `https://www.biodiversitylibrary.org/api2/httpquery.ashx/search`;

		if(j.includes('item')){
			//itemKey = '1';
			// console.log(i,j, itemKey);
			// console.log('item key: ', key);

			var bhlParams1 = {
				params: {
					format: 'json',
					'apikey': bhlKey,
					op: 'GetItemMetadata',
					itemid: key,
					parts: 't',
					pages: 't',
					ocr: 't'
				}
			}
			Axios.get(bhlSample, bhlParams1).then(res=>{
				//console.log('testinn', res.data);
				//console.log('get call for item: ', res.data.Result.ThumbnailPageID);
				imageThumbURL.push(res.data.Result.ItemThumbUrl);
				//itemURL.push(res.data.Result.ItemURL);
				//console.log('ULRS ', imageThumbURL);
				//format(res.data.Result);
				console.log('res.data: ', res.data);
				addThumbnails(imageThumbURL);
				//addThumbnails(res.data.Result);

				//console.log("itemURL array:", itemURL);

			}).catch(console.log);
		}

		else if(j.includes('bibliography')){
			bibKey = '0';

			var bhlParams2 = {
				params: {
					format: 'json',
					'apikey': bhlKey,
					op: 'GetTitleMetadata',
					titleid: key,
					items: 't',
					ocr: 't',
				}
			}
			Axios.get(bhlSample, bhlParams2).then(res1=>{

				var t = res1.data.Result.Items.length;

				for(var a = 0; a < t; a++){
					imageThumbURL.push(res1.data.Result.Items[a].ItemThumbUrl);
					//itemURL.push(res1.data.Result.Items[a].ItemURL);
					//format(res1.data.Result.Items[a]);
					//console.log("itemURL array:", itemURL);
					addThumbnails(res1.data.Result.Items[a]);
					console.log(res1.data, "res1 DATA");
				}
				
			}).catch(console.log); 

			var bhlParams3 = {
				params: {
					format: 'json',
					'apikey': bhlKey,
					op: 'GetTitleBibTex',
					titleid: key,
					items: 't',
					ocr: 't',
				}
			}

			Axios.get(bhlSample, bhlParams3).then(res2=> {
				
				bibInfo.push(res2.data.Result);
				//console.log("bibInfo: ", bibInfo);
				//the resulting information can be downloaded and opened as a new item in zotero
				//this has a correct -- 'item' url
				//getBib(bibInfo);

			}).catch(console.log);
		}

		else{
			console.log("BHL call not working");
		}

	}

	return getDataFromBHL;
}

const getDataFromHathitrust=(arrHathi)=>{
	//API information page --- https://libraryofcongress.github.io/data-exploration/#requests
	console.log('Hathitrust');

	
}


const getDataFromLOC=(arrLOC)=>{
	console.log('LOC');

}


const getDataFromNYPL=(arrNYPL)=>{
	console.log('NYPL');
	
}


const getDataFromArchive=(arrArchive)=>{
	console.log('online Archive');
	
}


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
		author:(itemObj.data.creators[0].lastName) ? arrStr(itemObj.data.creators[0].lastName) : null,
		//abstract: (itemObj.data.abstractNote) ? arrStr(itemObj.data.abstractNote) : null,
		date: itemObj.data.date,
	}
}

const addCards = (arr) => {
	console.log("addCards input here: ", arr);

	if (!document.querySelector('#cards')) {
			var cards = document.createElement('div');
			cards.id = "cards";
			cards.style.display = 'flex';
			cards.style.flexWrap = 'wrap';
			cards.style.height = '60vh';
			cards.style.overflow ='auto';
	}

	arr.forEach(entry=>{

		var card = '';

		var card =` <div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">
		  <div class="card-header">
		    ${entry.title}
		  </div>
		    <div class="card-body">
		      <ul>
		      	<li>place: ${entry.place}</li>
		      	<li>author: ${entry.creators[0].lastName}, ${entry.creators[0].firstName}</li>
		      	<li>date: ${entry.date}</li>
		      	<li>tag: ${entry.tags}</li>
		      	<li> <a href= ${entry.url} target="_blank">see on BHL</a></li>

		      </ul>
		    </div>
  		</div>`
		cards.innerHTML += card;
	})

	document.querySelector('.col-10').append(cards);

}

const format = (itemObj)=>{

	//console.log("formating", itemObj); 

	return {
		id: itemObj.ItemID,
		pages: (itemObj.Pages)? itemObj.Pages.length: null,
		tID: itemObj.ThumbnailPageID,
		src: itemObj.Source,
		//abstract: (itemObj.data.abstractNote) ? arrStr(itemObj.data.abstractNote) : null,
		ano: itemObj.Year,
		link: itemObj.ItemURL,
		image: itemObj.ItemThumbURL,
	}
}

const getBib = (arr) =>{
	for (var i = 0; i < arr.length; i++){
		return arr[i];
	}
}

const addThumbnails = (arr) => {
	console.log("addThumbnails input here", arr);

	var thumbID;
	
	if(!document.querySelector('#footer')) {
		var nails = document.createElement('div');
		nails.id = "footer";
		nails.style.display = 'flex';
		nails.style.flexWrap = 'wrap';
		nails.style.height = '20vh';
		nails.style.overflow = 'auto';
	}

	arr.forEach(entry=>{
		var thumb = '';
		var k = entry.lastIndexOf('/');
		thumbID = entry.substring(k+1,(entry.length));

		var thumb  = `
		<div class = "col" >
			<div class="thumbnail">  
				<div class = "caption">
					<div class="dropdown">
					    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">${thumbID}
					    <span class="caret"></span></button>
					    <ul class="dropdown-menu">
					      <li class = "active"><a href="${entry}">Full Size</a></li>
					      <li class = "disabled"><a href="#">Item</a></li>
					      <li class="divider"></li>
					      <li class = "disabled"><a href="#" download>Download</a></li>
					    </ul>
				  	</div>
				</div>
				<img src="${entry}" class="img-thumbnail" width = "50" alt="result thumbnail here"> 
			</div>
		</div>`

		nails.innerHTML += thumb;
	})
	document.querySelector('.row-med').append(nails);

}