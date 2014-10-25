function dothatuploadthing(){
	chrome.tabs.executeScript({
		code: 'upload();'
	});
}

function loadPrivateCall(){
	chrome.tabs.executeScript({
		code: 'loadPrivate();'
	});
}
function toggleMode(){
	chrome.tabs.executeScript({
		code: 'toggleMode();'
	});
}

document.getElementById('load').addEventListener('click',loadPrivateCall);
document.getElementById('save').addEventListener('click', dothatuploadthing);
document.getElementById('toggle').addEventListener('click', toggleMode);
