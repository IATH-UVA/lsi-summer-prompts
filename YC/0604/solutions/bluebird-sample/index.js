var axios = require('axios');
var Promise = require('bluebird'); // adds utility functions to allow for a range of additional behavior (and multiple responses)

console.log('hello there, welcome to axios testing... note we can work direct from node when desired');

//see bluebird documentation here: http://bluebirdjs.com/docs/getting-started.html


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

//--------------------------initial call to get objects-------------------------------

var calls = axios.get(subj)
  .then(function (response) {
  	//examine the response object in general
  	//console.log(response);

  	var resultsArr = response.data.Result.map(item=>{return item.SubjectText.trim()});

    //make an array of get calls instead of calling for a single item
    //make sure to return this array of calls and use promise.all to extract the results
  	var allSubj = resultsArr.map(official=>{ //make an array of get calls!
      var fullSubject = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetSubjectTitles&subject=${official}&apikey=${kBH}&format=json`
      return axios.get(fullSubject);

    })

  	return allSubj;

  })
  .catch(function (error) {
    console.log(error);
  });


//--------------------------Promise.all here-------------------------------

var titleMetaItems = Promise.all(calls)
  .then(res=>{
  //remember the results are now an array of results, so treat the array to get the values you want
  var result=[];
  var resul = res.map(res=>res.data.Result).filter(res=>res.length>0).forEach(res=>result.push(...res));
  //console.log(result.length, res.length);

  //grab the initial titleid for each and create an array to do a third call to get pages
  //make sure to return this array of calls and use promise.all to extract the results
  var allTitles = result.map(item=>{ //make an array of get calls!
      titleId = item.TitleID;
      //console.log(titleId);
      titleMeta = `https://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetTitleMetadata&titleid=${titleId}&items=t&apikey=${kBH}&format=json`;

    return (axios.get(titleMeta));

    })

    return allTitles;


  }) //clean up for initial use
  .catch(function (error) {
      console.log(error);
  });


//--------------------------Promise.all here-------------------------------

var final = Promise.all(titleMetaItems)
  .then(res=>{
  //remember the results are now an array of results, so treat the array to get the values you want
  var itemArr = [];
  var result = res.map(res=>res.data.Result).map(res=>itemArr.push(...res.Items));
  console.log(itemArr.length);

  //grab the items for each title and make a nested array of their thumbnails... and so on.



  }) //clean up for initial use
  .catch(function (error) {
      console.log(error);
  });
