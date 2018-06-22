import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

window.onload=(()=>{
	callFunction('summer', 'GET');
 	//axiosGetFunc('summer', 'sort:date');
});

//overall function to handle all possible calls
//-----------------------------------------------------------------------------
//eventually add other parameters: keyID & objectToWrite
//const callFunction(keyID,objectToWrite,queryString,axiosFunction) => {
const callFunction = (queryString, axiosFunction) => {

	//promises we tryna keep
	var prom;

	// if(keyID && typeorsomething == what theyre supposed to ){
		
	// 	prom = some edit;
	// 	return prom;
	// }

	// if(objectToWrite){
	// 	return prom
	// }

	// if(queryString(withParams?)){
	// 	return prom
	// }

	// Promise.all(prom).then(dealWithPromises => {
	// 	console.log(dealWithPromises);

		var aF = axiosFunction;
		switch(aF){
			case 'GET':
				prom = axiosGetFunc(queryString, {start:0, limit:100});
				break;
			case 'PUT':
				prom = axiosPutFunc();
				break;
			case 'POST':
				prom = axiosPostFunc(object);
				break;
			default:
				console.log('Please enter an action.');
		}

		prom.then(console.log).catch(console.log);
		//axiosGetFunc(queryString, params);
	// });
}
//-------------------------------------------------------------------

//-----------helper functions to handle individual tasks-------------
//viewing zotero items
//this is a promise
const axiosGetFunc = ((query, params)=>{
	var info = {};
	var allGets = [];

	var ret = Axios.get('https://api.zotero.org/groups/2144277/items/top', params)
	.then(function (response){
		//store data you are getting in an object
		info = {
		 data: response.data,
		 prom: allGets
		}

		// //hw do i get the headers?
		// var req = new XMLHttpRequest();
		// req.open('GET',document.location,false);
		// req.send(null);
		// var headers = req.getAllResponseHeaders().toLowerCase();
		// alert(headers);
		// console.log(headers);
		
		//console.log(response);

		var tR = response.headers['total-results'];

		//use the total_results header to 
		for(var i = 100; i<tR; i+=100){
			params['start'] = i;
			allGets.push(axiosGetFunc(query,params));
		}

		console.log(info);

		return info;
		//console.log(response);
	})
	.catch(function(error){
		console.log(error);
	});
	//console.log(ret);
	//getting from group id for LSI
	//that function is returning a response that we are 
	//storing the data in/to?
	//using the total result on the Total-Results header to create and push other promises (inside promise.all later)
	//---------------------------------------
	//we need so many gets to deal with the collections of objs that have more than 100 resources
	//need to be able to grab all items on the list
	//----from ZOTERO API documentation------
	//Total Results
	//Responses for multi-object read requests will include a custom HTTP header, Total-Results, 
	//that provides the total number of results matched by the request. The actual number of 
	//results provided in a given response will be no more than 100.
	//
	return ret;
	//do i use the actual axios function to then work with a promise? 
});

//----------------------------------------------------------------------------------
//this is a promise
const axiosPostFunc = (object) => {
/*	composeNewObject(object);
	add object;*/
}

//this is a promise
const axiosPutFunc = (keywords) => {
/*	put keywords on item?;
	composeNewObject();
	put (composeNewObject) in zotero;
*/
}

//this is a promise
const queryComposeFunc = () => {
	//create parameters out of input?
}

//this is a promise
const composeNewObjectFunction = () => {

}