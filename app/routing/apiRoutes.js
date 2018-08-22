// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");
var path = require('path');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    var input = req.body;

    var userResponses = input.scores;

    var matchName = '';
    var matchImage = '';
    var totalDifference = 10000;

    for(var i=0; i<friendsData.length; i++){
      var diff = 0;

      for(var x=0; x<userResponses.length; x++){
        diff+=Math.abs(friendsData[i].scores[x] - userResponses[x]);
      }

      if(diff<totalDifference){
        totalDifference = diff;
        matchName = friendsData[i].name;
        matchImage = friendsData[i].photo;
      }
      
      // console.log(matchImage);
      // console.log(matchName);
    }

    friendsData.push(req.body);
    // friendsData.push(userInput);
    res.json({status: 'OK', matchName : matchName, matchImage: matchImage});
    

    // res.json({status: 'OK', matchName: matchName, matchImage: matchImage})




    res.json(false);
  })


};