function dothatuploadthing(){
	//console.log("Hello");
	chrome.tabs.executeScript({
		code: 'name = ' + $("#name").val() + ';'
	});
	chrome.tabs.executeScript({
		code: 'upload();'
	});
}

function loadPrivateCall(){
	chrome.tabs.executeScript({
		code: 'passed_id = "' + $("#private_id").val() + '";'
	});
	chrome.tabs.executeScript({
		code: 'loadPrivate();'
	});
}
function toggleMode(){
	chrome.tabs.executeScript({
		code: 'toggleMode();'
	});
}
function toggleGraffiti(){
	chrome.tabs.executeScript({
		code: 'toggleGraffiti();'
	});
}
function superCoderMasterFunction()
{
	console.log("Starting super function");
	var right_url = getRightUrl();
	var passed_id = String($("#private_id").val());
        var url;
        if(passed_id=="")
        {
            console.log("Can't lookup blank field");
        }
        else
        {
            console.log(passed_id);

              Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
             Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
    "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

            var Graffiti = Parse.Object.extend("Graffiti");
            var query = new Parse.Query(Graffiti);

          // setting the query criteria
          query.get(passed_id, {
          success: function(result) {
            console.log("download is successfull");
            // Do something with the returned Parse.Object values
            var graffiti = result;          
            url = graffiti.get('urlString');
            chrome.tabs.executeScript({
				code: 'window.open("http://'+url+'", "_self");'
				//code: 'window.location.href="'+url+'";'
			});
        
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
        }
// 	chrome.tabs.getCurrent(function (tab) {
//   chrome.tabs.update(tab.id, {url: right_url});
// });
	// chrome.tabs.executeScript({
	// 	code: 'thaturl = "' + right_url + '";'
	// });
	
	console.log(url);

	//loadPrivateCall();
}

document.getElementById('load').addEventListener('click',superCoderMasterFunction);
document.getElementById('save').addEventListener('click', dothatuploadthing);
document.getElementById('toggle').addEventListener('click', toggleMode);
document.getElementById('graffiti').addEventListener('click', toggleGraffiti);





function getRightUrl()
    {
    	var passed_id = String($("#private_id").val());
        var url="";
        if(passed_id=="")
        {
            console.log("Can't lookup blank field");
        }
        else
        {
            console.log(passed_id);

              Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
             Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
    "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

            var Graffiti = Parse.Object.extend("Graffiti");
            var query = new Parse.Query(Graffiti);

          // setting the query criteria
          query.get(passed_id, {
          success: function(result) {
            console.log("download is successfull");
            // Do something with the returned Parse.Object values
            var graffiti = result;          
            url = graffiti.get('urlString');
              console.log(url);
        
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
        }
        return url;
    }


