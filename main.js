var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var color;
var stroke;
var index;

init();
alert("Yo");

function init() {
    $("body").append('<canvas id="theWall"></canvas>');
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

    color = red;
    stroke = 10;
}

function stop() {}

function handleMouseDown(event) {
    if (color === red) color = green;
    else color = red;
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

// window.onresize = function setCanvasSize(){
//     canvas.height = document.body.clientHeight;
//     canvas.width = document.body.clientWidth;
// }