var axios = require('axios');

console.log('hello there, welcome to axios testing... note we can work direct from node when desired');

//working with node, axios, and the biodiversity heritage library api

//see https://www.biodiversitylibrary.org/api2/docs/docs.html

//see https://www.npmjs.com/package/axios and https://github.com/axios/axios

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

//1) work from this starting axios setup
var query = axios.get(subj)
  .then(function (response) {
  	//examine the response object in general
  	console.log(response.data.Result);

    //2) clean and extract what you want from response
    var official = response.data.Result.filter(item =>{
      return item.SubjectText === 'Tiger moths'
    })[0]['SubjectText'];

    console.log('choosen subject: ', official);


    //3) add a call to get one of the items in the results list using the 'official' variable above
  	//hint: use axios.get again ( consider using return here; why?)
    var fullSubjSearch = `https://www.biodiversitylibrary.org/api2/httpquery.ashx`
    //op=GetSubjectTitles&subject=${official}&apikey=${kBH}&format=json`
    var paraObj =  {
        params: {
        op: 'GetSubjectTitles',
        subject: official,
        apikey: kBH,
        format: 'json'
      }

      }

    return axios.get(fullSubjSearch, paraObj)


    .then(function(res){
      console.log('result from second query: ', res.data.Result);

      var title = res.data.Result[0]['TitleID'];


      var titlemeta = `https://www.biodiversitylibrary.org/api2/httpquery.ashx`
      //op=GetTitleMetadata&titleid=${title}&items=t&apikey=${kBH}&format=json`

      var paraObj = {
        params: {
        op: 'GetTitleMetadata',
        titleid: title,
        items: 't',
        apikey: kBH,
        format: 'json'
      }

      }

      return axios.get(titlemeta, paraObj);

    })

        		//4) add a call to get the full range of metadata on that title
            //hint: use axios.get again ( consider using return here; why?)
  })
  .catch(function (error) {
    console.log(error);
  });


query.then(res=>{
  console.log('lets hope this works: ', res);
      //5) if you have returned your other 'get' calls, then you should be able to grab the result of query at a later date in your code...

      //6) create an array of thumbnails given the entry's page items-


    })
  .catch(function (error) {
      console.log(error);
    });
