
$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
    "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

  var Graffiti = Parse.Object.extend("Graffiti");
  var query = new Parse.Query(Graffiti);

  // setting the query criteria
  query.equalTo("urlString", getURL());
  query.descending("upVotes");
  query.descending("updatedAt");
  query.limit(3);

  var css = jQuery('<link href="overlay.css" rel="stylesheet" type="text/css">');

  var all_pictures = [];
  query.find({
    success: function(results) {
      console.log("download is successfully");
      alert("Successfully retrieved " + results.length + " graffitis.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        //CODE TO loop inserting all of the pictures
        var graffiti = results[i];
        var title = graffiti.get('title');
        var imagePath = chrome.extension.getURL(title);
        var pngUrl = graffiti.get('png').url();
        var left = graffiti.get('left');
        var top = graffiti.get('top');
        var votes = graffiti.get('upVotes') - graffiti.get('downVotes');
        var one_picture = {x: left, y:top, name: title, vote: votes, data:pngUrl};
        all_pictures.push(one_picture);
      }
      draw();
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  function draw()
  {
    for(var i=0; i<all_pictures.length; i++){
      alert(all_pictures[i]["data"]);
        var pic=jQuery('<img class="graffiti" style = "left:'+ all_pictures[i]["x"] +
            'px; top: ' + all_pictures[i]["y"] + 'px; z-index: 23881273489127348971234897128935709813475094235788;" src ="' + all_pictures[i]["data"] + '"> </img>');
        //iconURL = chrome.extension.getURL("rainbow.png");
        //iconURL = chrome.extension.getURL("rainbow.png");
        //pic_name = iconURL;
        //pic_name = iconURL;

      pic.appendTo(document.body);
    }
  }
  setOverlaySize();

  function setOverlaySize(){
    $(".graffiti").css("z-index", 19238478239742349870000);
            }
  function getURL() {
    var x = location.hostname;
    return x;
  }

  //query based on criteria
  //query.equalTo("urlStr",document.URL);

  //iconURL = chrome.extension.getURL("rainbow.png");
  //pic_name = iconURL;

});
