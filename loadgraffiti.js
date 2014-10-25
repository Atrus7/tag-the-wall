
$(function() {

	Parse.$ = jQuery;

 	// Initialize Parse with your Parse application javascript keys
  	Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
                   "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

	var Graffiti = Parse.Object.extend("Graffiti");
	var query = new Parse.Query(Graffiti);
	var path = location.hostname;
	if (window.location.pathname.length > 1) path = path + window.location.pathname;
    if (path.slice(-1) === "/") path = path.substring(0, str.length - 1);

	//query based on criteria
	//query.equalTo("urlStr",document.URL);
	query.equalTo("urlString",  path);

	query.find({
	  success: function(results) {
	  	console.log("download is successfully");
	    //alert("Successfully retrieved " + results.length + " graffitis.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) { 
	      var graffiti = results[i];

	      // getting the image url string
	      var pngUrl = graffiti.get('png').url();
	      var left = graffiti.get('left');
	      var top = graffiti.get('top');
	      var imgtag = '<img src="'+pngUrl+'"'+' style="left:'+left+'px;top:'+top+'px"'+'>';
	      console.log(imgtag);
	      $(document.body).append(imgtag);
	    }
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
	
});