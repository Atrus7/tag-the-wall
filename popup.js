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
document.getElementById('load').addEventListener('click',loadPrivateCall);
document.getElementById('save').addEventListener('click', dothatuploadthing);
document.getElementById('toggle').addEventListener('click', toggleMode);
document.getElementById('graffiti').addEventListener('click', toggleGraffiti);
