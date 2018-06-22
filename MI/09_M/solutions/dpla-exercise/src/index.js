import Axios from 'axios';
import Promise from 'bluebird';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


window.onload=(()=>{
	console.log('window loaded');

	var query = grabFormat('json');


	query.then(result=>{
		//console.log(result.data);
		//console.log(result[0].data);
		//console.log(result.key);
		//console.log(result.data.key);
		console.log(result.data);
		var r = result.data;
		//console.log(result.data[0].library);
	

		addCards(r);

		//console.log(result.data);

		//document.querySelector('#footer').append('footer');

		//console.log(crtr);
	})
	.catch(console.log);
});

//------------------------
//---Integrating Zotero---
//Try: using the Zotero API instead of the DPLA API
//Try: returning search results from zotero



/*//POST and GET requests for me (mi5ey)
function getUserAccount() {
  return Axios.get('/user/mi5ey');
}
 
function getUserPermissions() {
  return Axios.get('/user/mi5ey/permissions');
}
 
Axios.all([getUserAccount(), getUserPermissions()])
  .then(Axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
*/

const grabFormat = ((format)=>{
	//base Zotero API URL; Version 3; ....
	var sample = `https://api.zotero.org/groups/2144277/items`;

	var paraObj = {
		params: {
			format: 'json',
			include: 'bib, citation, data', 
			v: '3',
			sort: date
		}
	}
	return Axios.get(sample);
});

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

		var card =
		`<div class="card" style="width: 17rem; margin-right: 1rem;margin-top: 2rem;">

	    <div class="card-header">
	    	${entry.data.title}
	    </div>
	      <ul class="list-group list-group-flush">
	      	<li class="list-group-item">Item Type: ${entry.data.itemType}</li>
	      	<li class="list-group-item">Abstract: ${entry.data.abstractNote}</li>
	      	<li class="list-group-item">Date: ${entry.data.date}</li>
	      	<li class="list-group-item">Key: ${entry.key}</li>
	      	<li class="list-group-item">Access Date: ${entry.data.accessDate}</li>
	      </ul>

	      <div class = "card-footer text-muted">
	     	<a href=${entry.links.alternate.href} target = "_blank"><h8 class="card-title">see on zotero</h8></em></a>
  		  </div>
  		</div>`

		cards.innerHTML += card ;
	})
	document.querySelector('.col-10').append(cards);
}