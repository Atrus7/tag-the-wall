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

function setRed(){
	chrome.tabs.executeScript({
		code: 'color = RED;'
	});
}

function setGreen(){
	chrome.tabs.executeScript({
		code: 'color = GREEN;'
	});
}

function setBlue(){
	chrome.tabs.executeScript({
		code: 'color = BLUE;'
	});
}



document.getElementById('load').addEventListener('click',loadPrivateCall);
document.getElementById('save').addEventListener('click', dothatuploadthing);
document.getElementById('toggle').addEventListener('click', toggleMode);
document.getElementById('graffiti').addEventListener('click', toggleGraffiti);
document.getElementById('red').addEventListener('click', setRed);
document.getElementById('green').addEventListener('click', setGreen);
document.getElementById('blue').addEventListener('click', setBlue);
