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
			qmode:'',
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
	    console.log('here', disAll);
	    addCards(disAll);
	    getMoreData(disAll);
	});
    
    //relatedItemsLOC(resultFirst);

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

		//addCards(basic);

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
		//addCards(data);
		
	})
	.catch(console.log);
	//console.log('third return: ', allData);
	return allData; //promise with master array of data

	//addCards(data);
	//console.log(addCards);
	
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

	} else if(urlArr[i].includes('www.loc.gov')){
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

  console.log('see Hathi here', HathiArr);
  console.log('see LOC here', LOCArr);
  console.log('see Archive here', ArchiveArr);

  getDataFromBHL(BHLArr);
  getDataFromHathitrust(HathiArr);
  getDataFromLOC(LOCArr);
  getDataFromNYPL(NYPLArr);
  getDataFromArchive(ArchiveArr);

}



const getDataFromBHL=(arrBHL)=>{
	//API information page --- https://biodivlib.wikispaces.com/Developer+Tools+and+API
	//console.log('BHL');

	//extract data using HTTP GET request, append the argument &apikey=<key+value> to the method call
	//map through all the urls, extract key information for each item
	//call the function and pass the key information

}


const getDataFromHathitrust=(arrHathi)=>{
	//API information page --- 
	//console.log('Hathitrust');
    //access key = 3195a13ad6;
    //secret key = b98e006776869701ec946a444c2d;

    var hathiID = [];
    for(var i=0; i<arrHathi.length; i++){
	hathiID.push(arrHathi[i].substr(arrHathi[i].lastIndexOf('/')+1));
    }
    console.log('HHHH', hathiID);

///*
    //code for getting metadata

	for(var i=0; i<arrHathi.length; i++){
    //console.log('address ', i, arrArchive[i]);

    const grabFormat = ((subject, format)=>{
	var sample = 'https://babel.hathitrust.org/cgi/htd/volume/meta/:' + hathiID[i] + '?format=json&v=2';
	//var sample = 'https://archive.org/services/img/' + archiveID[i]; //automatically determine the appropriate image to represent an item
	//var sample = 'https://archive.org/download/' + archiveID[i] + '/page/cover_t.jpg'; //coverpage

	console.log('fromHathi', sample);
	return Axios.get(sample);
	});


    var query = grabFormat(null, 'json');
    query.then(result=>{

				console.log('hathi', result.data);
				//console.log(result);
				var resultFirst=result.data;
				
	}).catch((error) =>{console.log('error')});

    };

    //*/
	
}


const getDataFromLOC=(arrLOC)=>{
	console.log('LOC');

	//request a specific item ---- /item/{identifier}/? 
	//for example --- https://www.loc.gov/item/ggb2006012811/?fo=json

	//check the format of the existing urls
	//get item id from the existing array of url
	//map through the id information and grab data from api request
/*

//0:"https://www.loc.gov/item/gm71002199/"
//1:"https://www.loc.gov/item/74692191/"
    var LocID = [];
    for(var i=0; i<arrLOC.length; i++){
	LocID.push(arrLOC[i].substr(25,arrLOC[i].indexOf('/', 26)));
	//another ways: str.slice(beginIndex[, endIndex]), str.split([separator[, limit]])
    }
    console.log(LocID);

*/
    for(var i=0; i<arrLOC.length; i++){
    console.log('address ', i, arrLOC[i]);

    const grabFormat = ((subject, format)=>{
	var sample = arrLOC[i];
	var paraObj = {
		params: {
			fo:'json',
			//c:'50',
			//at:item,resources,reproductions
            //?? --- at!=more_like_this
            //sb:date_desc
            //sb:shelf_id
			//api_key: kDP,
		}
	}
	return Axios.get(sample,paraObj);
	});


    var query = grabFormat(null, 'json');
    query.then(result=>{

				console.log('rrrr', result.data);
				//console.log(result);
				var resultFirst=result.data;
				//relatedItemsLOC(resultFirst);
				//displayLOC(resultFirst);

	}).catch((error) =>{console.log('error')});


    };

    
	
}




const getDataFromNYPL=(arrNYPL)=>{
	//console.log('NYPL');
	
}


const getDataFromArchive=(arrArchive)=>{
	console.log('online Archive');

	var archiveID = [];
    for(var i=0; i<arrArchive.length; i++){
	archiveID.push(arrArchive[i].substr(arrArchive[i].lastIndexOf('/')+1));
    }
    console.log('AAAA', archiveID);

///*
    //code for getting metadata

	for(var i=0; i<arrArchive.length; i++){
    //console.log('address ', i, arrArchive[i]);

    const grabFormat = ((subject, format)=>{
	var sample = 'https://archive.org/metadata/' + archiveID[i];
	//var sample = 'https://archive.org/services/img/' + archiveID[i]; //automatically determine the appropriate image to represent an item
	//var sample = 'https://archive.org/download/' + archiveID[i] + '/page/cover_t.jpg'; //coverpage

	console.log('whatIsThis', sample);
	return Axios.get(sample);
	});


    var query = grabFormat(null, 'json');
    query.then(result=>{

				console.log('archive', result.data);
				//console.log(result);
				var resultFirst=result.data;
				
	}).catch((error) =>{console.log('error')});

    };
//*/


/*  
    //code for retrieving snapshots 

	for(var i=0; i<arrArchive.length; i++){
    //console.log('address ', i, arrArchive[i]);

    const grabFormat = ((subject, format)=>{
	var sample = 'https://archive.org/wayback/available?url=' + arrArchive[i];

	console.log('whatIsThis', sample);
	return Axios.get(sample);
	});


    var query = grabFormat(null, 'json');
    query.then(result=>{

				console.log('archive', result.data);
				//console.log(result);
				var resultFirst=result.data;
				
	}).catch((error) =>{console.log('error')});

    };
*/

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
			cards.style.height = '50vh';
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


const displayLOC = (arrDis) =>{

}


const relatedItemsLOC = (arrRelatedItem) =>{
	var relatedItem = arrRelatedItem.related_items;
	console.log('related items ', relatedItem);

	var moreLikeThis = arrRelatedItem.more_like_this;
	console.log('more like this ', moreLikeThis);



	if (!document.querySelector('#cards')) {
			var cards = document.createElement('div');
			cards.id = "cards";
			cards.style.display = 'flex';
			cards.style.flexWrap = 'wrap';
			cards.style.height = '80vh';
			cards.style.overflow ='auto';
	}

	relatedItem.forEach(entry=>{

		var card = '';

		var card =` <div class="card" style="width: 7rem; margin-right: 1rem;margin-top: 2rem;">
		  <div class="card-header">
		    Item: ${entry.relatedItem.subject}
		  </div>
	    <div class="card-body">
	    <a href=${entry.relatedItem.id} target="_blank"><h5 class="card-title">${entry.relatedItem.title}</h5></a>
	      <ul>
	      	<li>place:${entry.relatedItem.location}</li>
	      	<li>description:${entry.relatedItem.description}</li>
	      	<li>date:${entry.relatedItem.date}</li>
	      	<li>language:${entry.relatedItem.language}</li>
	      </ul>
	    </div>
      </div>`

    cards.innerHTML += card ;
	})

	document.querySelector('.row minor').append(cards);

}






//other ideas:
				//aggregate by decade then medium, decade year then author, decade then source
				//radio buttons to that effect
