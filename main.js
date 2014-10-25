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
var editing = false;
var name;
var passed_id;

var path = location.hostname;
    if (window.location.pathname.length > 0) path = path + window.location.pathname;
    console.log(path);

    Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j", "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

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
    function loadPrivate()
    {

        
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
            var title = graffiti.get('title');
            var imagePath = chrome.extension.getURL(title);
            var pngUrl = graffiti.get('png').url();
            var left = graffiti.get('left');
            var top = graffiti.get('top');
            var votes = graffiti.get('upVotes') - graffiti.get('downVotes');
            var one_picture = {x: left, y:top, name: title, vote: votes, data:pngUrl};
            var pic=jQuery('<img class="graffiti" style = "left:'+ one_picture["x"] +
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

    function fileUpload(name, data){

        var fileUploadControl = $("#profilePhotoFileUpload")[0];
        
            var name = "mario.png";
            alert("This function is running");
            var pngFile = new Parse.File("theimage.png", {base64: data});
            console.log('File: ',pngFile);
            pngFile.save().then(function() {
              // The file has been saved to Parse.
              console.log('1: ',  pngFile);
              }, function(error) {
              // The file either could not be read, or could not be saved to Parse.
              alert('2: ' +  error.message);
            });
            pngFile.save();

            var graffiti = new Parse.Object("Graffiti");
            // var graffiti = new Graffiti();
        
            var Website = Parse.Object.extend("Website");

            var currentURL = new Website();
            currentURL.set("url",  path);
            currentURL.save(null, {
                success: function(currentURL) {
                //alert('New object created with objectId: ' + website.id);
                //$(".success").show();
                    graffiti.set("png", pngFile);
                    graffiti.set("title", name);
                    graffiti.set("url", currentURL);
                    graffiti.set("urlString",  path);
                    graffiti.set("left", 0);
                    graffiti.set("top",0);
                    console.log('saving pngFile');
                    graffiti.save();
                },
                error: function(currentURL, error) {
                //alert('Failed with error code: ' + error.message);
                }   
            });
        //}
    }

init();

function toggleMode(){
    editing = !editing;
    $("#theWall").toggle();
}

function toggleGraffiti(){
    $(".graffiti").toggle();
    //toggleMode();
}

function init() {

    var overlay = jQuery('<canvas id="theWall"></canvas>');
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
    createjs.Ticker.setFPS(60);

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    stage.addChild(drawingCanvas);
    stage.update();

    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;

    color = RED;
    stroke = 10;
    $("#theWall").toggle();
}

function stop() {}

function handleMouseDown(event) {
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    stage.addEventListener("stagemousemove" , handleMouseMove);
}

function handleMouseMove(event) {
    var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

    drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function handleMouseUp(event) {
    stage.removeEventListener("stagemousemove" , handleMouseMove);
}

function upload(name){
    //alert("yo");
    fileUpload(name, canvas.toDataURL("image/png"));
    console.log(name);
    //console.log(canvas.toDataURL("image/png"));
}

// window.onresize = function setCanvasSize(){
//     canvas.height = document.body.clientHeight;
//     canvas.width = document.body.clientWidth;
// }
