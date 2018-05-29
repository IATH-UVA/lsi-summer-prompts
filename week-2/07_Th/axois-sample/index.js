var axios = require('axios');

console.log('hello there, welcome to axios testing... note we can work direct from node when desired');


var kBH = "afa44242-67ed-4929-a43b-59ed5c174019";

/*
SubjectSearch

Return a list of subjects that match (fully or partially) the specified search string.
subject - the full or partial subject for which to search

*/
var subject = 'moths';

var subj = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=SubjectSearch&subject=${subject}&apikey=${kBH}&format=json`;

/*
GetSubjectTitles

Return a list of titles associated with a subject.
subject - the full subject string for which to search
*/
var official='';

var fullSubject = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetSubjectTitles&subject=${official}&apikey=${kBH}&format=json`

/*
GetTitleMetadata

Return metadata about a title. You may choose to include a list of the items (books) associated	with the title.
titleid - the identifier of an individual title
items - "t" or "true" to return the title's items

*/

var title = '';

var titlemeta = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetTitleMetadata&titleid=${title}&items=t&apikey=${kBH}&format=json`


axios.get(subj)
  .then(function (response) {
  	//examine the response object in general
  	console.log(response);

  	// var resultsArr = response.data.Result.map(item=>{return {official:item.SubjectText.trim()}});
  	// official = resultsArr[3].official;
  	// console.log(official);

  	// axios.get(fullSubject)
  	// .then(res=>{
  	// 	console.log(res.data.Result.length);

  		//add a call to get one of the items in the results list using the variables above
  	})


  })
  .catch(function (error) {
    console.log(error);
  });
