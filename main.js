var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var color;
var stroke;
var index;
var RED = "#ff0000";
var BLUE = "#0000ff";
var GREEN = "#00ff00";
var YELLOW = "#ffff00";
var editing = false;
var name;
var passed_id;
var thaturl;
var viewPrivate = false;
var turl;
var sprivate = false;

var path = location.hostname;
if (window.location.pathname.length > 1) path = path + window.location.pathname;
if (path.slice(-1) === "/") path = path.substring(0, path.length - 1);

// // Create a Website object, which is a subclass of Parse.Object
// var Website = Parse.Object.extend("Website");
// // Create a new instance of Website
// var website = new Website();

// website.set("url", path);

// website.save(null, {
//     success: function(website) {
//         //alert('New object created with objectId: ' + website.id);
//         $(".success").show();
//     },
//     error: function(website, error) {
//         //alert('Failed with error code: ' + error.message);
//     }
// });

function fileUpload(data) {

	var fileUploadControl = $("#profilePhotoFileUpload")[0];

	//var name = "mario.png";
	//alert("This function is running");
	var pngFile = new Parse.File("theimage.png", {
		base64: data
	});
	//console.log('File: ', pngFile);
	pngFile.save().then(function() {
		// The file has been saved to Parse.
		//console.log('1: ', pngFile);
	}, function(error) {
		// The file either could not be read, or could not be saved to Parse.
		alert('2: ' + error.message);
	});
	pngFile.save();

	var graffiti = new Parse.Object("Graffiti");
	// var graffiti = new Graffiti();

	var Website = Parse.Object.extend("Website");

	var currentURL = new Website();
	currentURL.set("url", path);
	currentURL.save(null, {
		success: function(currentURL) {
			//alert('New object created with objectId: ' + website.id);
			//$(".success").show();
			graffiti.set("png", pngFile);
			graffiti.set("title", name);
			graffiti.set("url", currentURL);
			graffiti.set("urlString", path);
			graffiti.set("left", 0);
			graffiti.set("top", 0);
			graffiti.set("isPrivate", sprivate);
			console.log('saving pngFile');
			graffiti.save().then(function(obj) {
				// the object was saved successfully.
				prompt('Your graffiti "' + name + '" is successfully published. \n Copy to clipboard and share with your friend: ', obj.id);
			}, function(error) {
				// the save failed.
			});
		},
		error: function(currentURL, error) {
			//alert('Failed with error code: ' + error.message);
		}
	});
	//}
}

init();

function toggleMode() {
	editing = !editing;
	$("#theWall").toggle();
}

function toggleGraffiti() {
	$(".graffiti").toggle();
	//toggleMode();
}

function init() {
	//console.log(chrome.extension.getBackgroundPage().url);
	var overlay = jQuery('<center><canvas id="theWall"></canvas></center>');
	overlay.appendTo(document.body);

	if (window.top != window) {
		document.getElementById("header").style.display = "none";
	}
	canvas = document.getElementById("theWall");

	index = 0;

	//check to see if we are running in a browser with touch support
	stage = new createjs.Stage(canvas);
	stage.autoClear = false;
	stage.enableDOMEvents(true);

	createjs.Touch.enable(stage);
	createjs.Ticker.setFPS(30);

	drawingCanvas = new createjs.Shape();

	stage.addEventListener("stagemousedown", handleMouseDown);
	stage.addEventListener("stagemouseup", handleMouseUp);

	stage.addChild(drawingCanvas);
	stage.update();

	canvas.height = $(document).height();
	canvas.width = $(document).width();

	color = RED;
	stroke = 10;
	$("#theWall").toggle();

	chrome.runtime.sendMessage({greeting: "url"}, function(response) {
	  turl = response.farewell;
	  chrome.runtime.sendMessage({greeting: "reseturl"}, function(response){});
		chrome.runtime.sendMessage({greeting: "passed_id"}, function(response) {
			passed_id = response.farewell;
			chrome.runtime.sendMessage({greeting: "resetpassed_id"}, function(response){});
		});
		chrome.runtime.sendMessage({greeting: "viewPrivate"}, function(response) {
			viewPrivate = response.farewell;
			chrome.runtime.sendMessage({greeting: "resetviewPrivate"}, function(response){});
			if (viewPrivate == true){
				loadPrivate();
			}else loadPublic();
		});
	});

}

function handleMouseDown(event) {
	oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
	oldMidPt = oldPt;
	stage.addEventListener("stagemousemove", handleMouseMove);
}

function handleMouseMove(event) {
	var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

	drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

	oldPt.x = stage.mouseX;
	oldPt.y = stage.mouseY;

	oldMidPt.x = midPt.x;
	oldMidPt.y = midPt.y;

	stage.update();
}

function handleMouseUp(event) {
	stage.removeEventListener("stagemousemove", handleMouseMove);
}

function upload() {
	fileUpload(canvas.toDataURL("image/png"));
}