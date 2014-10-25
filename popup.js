function dothatuploadthing(){
	chrome.tabs.executeScript({
		code: 'upload();'
	});
}

function toggleMode(){
	$('#toggle').html("Yo this worked");
}

document.getElementById('save').addEventListener('click', dothatuploadthing);
document.getElementById('toggle').addEventListener('click', toggleMode);