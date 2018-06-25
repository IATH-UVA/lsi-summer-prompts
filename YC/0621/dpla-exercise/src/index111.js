import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
const kDP = 'P9NiFoyLeZu2bZNvvuQPDWsd';

window.onload=(()=>{

};


function callFunction(queryComposition, objectComposition, paramComposition, actionPart){
	//Call the following four functions, assign each one a Promise

	var paramComposition = (params) =>{
		//Update the params, get the updated params
		var url = `https://api.zotero.org/groups/2144277/items/top`
		var paraObj = {
		params: {
			format: 'json',
			include: 'bib,citation,data',
			v: '3',
			limit: '100',
			sort: 'date',
			api_key: kDP,
		}

	};


	
	var queryComposition = (queryItem) =>{
		//GET json and header, POST new object, PUT update object
		
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



	var objectCoposition = (objInput) =>{
		//Get input from client and write the object

	};



	var actionPart = () =>{
		//Hold the actions

	};


};
