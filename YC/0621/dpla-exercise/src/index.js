import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
const kDP = 'P9NiFoyLeZu2bZNvvuQPDWsd';

window.onload=(()=>{
	
  var qur = queryComposition();
  var obj = objectComposition();
  var par = paramComposition();
  var act = actionPart();

  //console.log('part01');

  callFunction(qur, obj, par, act);
  //console.log('part02');

};


function callFunction(queryComposition, objectComposition, paramComposition, actionPart){
	//Call the following four functions, assign each one a Promise


};

function paramComposition = (paraObj) =>{
	//Update the params, get the updated params
    var url = `https://api.zotero.org/groups/2144277/items/top`
	  var paraObj[0] = {
		    params: {
			    format: 'json',
			    include: 'bib,citation,data',
			    v: '3',
			    limit: '30',
			    sort: 'date',
			    api_key: kDP,
		    }
	  }
/*
    for//each time the query done, then:
    var paraObj[i] = {
        params: {
          format: 'json',
          include: 'bib,citation,data',
          v: '3',
          limit: '30*(i)-30*(i+1)',
          sort: 'date',
          api_key: kDP,
      }
    }
*/
    return Axios.get(url, paraObj);
};

function queryComposition = (queryItem) =>{
		//GET json and header, POST new object, PUT update object

    const inputField = document.querySelector('#subject');
    const submit = document.querySelector('#submit');
    const responseField = document.querySelector('.col-10');
		
		const getJSON = function(url) {
            const promise = new Promise(function(resolve, reject){
               const handler = function() {
               if (this.readyState !== 4) {
                 return;
               }
               if (this.status === 200) {
                 resolve(this.response);
               } else {
                 reject(new Error(this.statusText));
               }
            };
            const client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();

            });
            return promise;
        };

        getJSON("/posts.json").then(function(json) {
            console.log('Contents: ' + json);
        }, function(error) {
            console.error('Something Wrong', error);
        });

	};
	
	
function objectComposition = (objInput) =>{
    //Get input from client and write the object

};


	
function actionPart = () =>{
		//Hold the actions

	};


	

