var passed_id = "";
var viewPrivate = false;
var url = "";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "url")
      sendResponse({farewell: url});
  	if (request.greeting == "passed_id")
      sendResponse({farewell: passed_id});
  	if (request.greeting == "viewPrivate")
      sendResponse({farewell: viewPrivate});
  	if (request.greeting == "reseturl")
      url = "";
  	if (request.greeting == "resetpassed_id")
      passed_id = "";
  	if (request.greeting == "resetviewPrivate")
      viewPrivate = false;
});