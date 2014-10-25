function dothatuploadthing(){
	chrome.tabs.executeScript({
		code: 'upload();'
	});
}

function toggleMode(){
	chrome.tabs.executeScript({
		code: 'toggleMode();'
	});
}

document.getElementById('save').addEventListener('click', dothatuploadthing);
document.getElementById('toggle').addEventListener('click', toggleMode);