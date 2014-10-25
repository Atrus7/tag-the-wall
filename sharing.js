//GET PARSE DATA FOR SPECIFIC THING.
//
function shared_url (passed) {

var shared_id = passed;
Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
    "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

  var share_graffiti = Parse.Object.extend("Graffiti");
  var query = new Parse.Query(share_graffiti);

  // setting the query criteria
  query.equalTo("id", shared_id);
}