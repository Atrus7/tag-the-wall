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

    function fileUpload(data){

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
            currentURL.set("url",  location.hostname);
            currentURL.save(null, {
                success: function(currentURL) {
                //alert('New object created with objectId: ' + website.id);
                //$(".success").show();
                    graffiti.set("png", pngFile);
                    graffiti.set("title", "Mario");
                    graffiti.set("url", currentURL);
                    graffiti.set("urlString",  location.hostname);
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
}

function stop() {}

function handleMouseDown(event) {
    if (color === RED) color = GREEN;
    else color = RED;
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

function upload(){
    //alert("yo");
    fileUpload(canvas.toDataURL("image/png"));
    //console.log(canvas.toDataURL("image/png"));
}

// window.onresize = function setCanvasSize(){
//     canvas.height = document.body.clientHeight;
//     canvas.width = document.body.clientWidth;
// }
