var axios = require('axios');
var Promise = require('bluebird');

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

var titleId = '';

var titleMeta = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetTitleMetadata&titleid=${titleId}&items=t&apikey=${kBH}&format=json`



var calls = axios.get(subj)
  .then(function (response) {
  	//examine the response object in general
  	//console.log(response);

  	var resultsArr = response.data.Result.map(item=>{return {official:item.SubjectText.trim()}});
  	official = resultsArr[3].official;
  	//console.log(official);

  	return axios.get(fullSubject) //comment on inclusion of return before paying through full axios/bluebird structure in two ways...
  	.then(res=>{
  		var titleArr = res.data.Result;
      //console.log(titleArr);

    var titleSearches=titleArr.map(title=>{
        titleId = title.TitleID;
        var titleMeta = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetTitleMetadata&titleid=${titleId}&items=t&apikey=${kBH}&format=json`;

        return (axios.get(titleMeta));
      });

    return Promise.all(titleSearches)
    .then(resArr=>{
      var res=resArr.map(resArr=>resArr.data.Result.Items) // get close to thumbnails

      return res;
    })


  	})


  })
  .catch(function (error) {
    console.log(error);
  });


calls.then(res=>console.log(res)); //clean up for initial use
