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
//console.log(path);

Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
        "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

// Create a Website object, which is a subclass of Parse.Object
var Website = Parse.Object.extend("Website");
// Create a new instance of Website
var website = new Website();

website.set("url", "Hello World!");

website.save(null, {
    success: function(website) {
        //alert('New object created with objectId: ' + website.id);
        $(".success").show();
    },
    error: function(website, error) {
        //alert('Failed with error code: ' + error.message);
    }
});

function loadPublic() {
    viewPrivate = false;

    Parse.$ = jQuery;

    // Initialize Parse with your Parse application javascript keys
    Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
        "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

    var Graffiti = Parse.Object.extend("Graffiti");
    var query = new Parse.Query(Graffiti);

    var path = location.hostname;
    if (window.location.pathname.length > 1) path = path + window.location.pathname;
    if (path.slice(-1) === "/") path = path.substring(0, path.length - 1);

    // setting the query criteria
    query.equalTo("urlString", path);
    query.descending("upVotes");
    query.descending("updatedAt");
    query.limit(3);

    var css = jQuery('<link href="overlay.css" rel="stylesheet" type="text/css">');

    var all_pictures = [];
    query.find({
        success: function(results) {
            //console.log("download is successfully");
            //alert("Successfully retrieved " + results.length + " graffitis.");
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
                var one_picture = {
                    x: left,
                    y: top,
                    name: title,
                    vote: votes,
                    data: pngUrl
                };
                if (graffiti.get('isPrivate') !== true) all_pictures.push(one_picture);
            }
            draw();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    function draw() {
        for (var i = 0; i < all_pictures.length; i++) {
            var pic = jQuery('<img class="graffiti" style = "left:' + all_pictures[i]["x"] +
                'px; top: ' + all_pictures[i]["y"] + 'px; z-index: 23881273489127348971234897128935709813475094235788;" src ="' + all_pictures[i]["data"] + '"> </img>');
            pic.appendTo(document.body);
        }
    }
    setOverlaySize();

    function setOverlaySize() {
        $(".graffiti").css("z-index", 19238478239742349870000);        
    }

    function getURL() {
        var x = location.hostname;
        return x;
    }

}

function loadPrivate() {

    viewPrivate = true;
    if (passed_id == "") {
        console.log("Can't lookup blank field");
    } else {
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
                //console.log("download is successfull");
                // Do something with the returned Parse.Object values
                var graffiti = result;
                var title = graffiti.get('title');
                var imagePath = chrome.extension.getURL(title);
                var pngUrl = graffiti.get('png').url();
                var left = graffiti.get('left');
                var top = graffiti.get('top');
                var votes = graffiti.get('upVotes') - graffiti.get('downVotes');
                var one_picture = {
                    x: left,
                    y: top,
                    name: title,
                    vote: votes,
                    data: pngUrl
                };
                var pic = jQuery('<img class="graffiti" style = "left:' + one_picture["x"] +
                    'px; top: ' + one_picture["y"] + 'px; z-index: 23881273489127348971234897128935709813475094235788;" src ="' + one_picture["data"] + '"> </img>');
                pic.appendTo(document.body);
                console.log(pngUrl);

            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
}

function fileUpload(data) {

    var fileUploadControl = $("#profilePhotoFileUpload")[0];

    //var name = "mario.png";
    //alert("This function is running");
    var pngFile = new Parse.File("theimage.png", {
        base64: data
    });
    console.log('File: ', pngFile);
    pngFile.save().then(function() {
        // The file has been saved to Parse.
        console.log('1: ', pngFile);
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

function stop() {}

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
    //alert("yo");
    fileUpload(canvas.toDataURL("image/png"));
    //console.log(name);
    //console.log(canvas.toDataURL("image/png"));
}

// window.onresize = function setCanvasSize(){
//     canvas.height = document.body.clientHeight;
//     canvas.width = document.body.clientWidth;
// }