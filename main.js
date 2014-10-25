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

init();

function init() {
<<<<<<< Updated upstream
    var overlay = jQuery('<canvas id="theWall"></canvas>');
    overlay.appendTo(document.body);
=======
    $("body").append('<canvas id="theWall" style="position: absolute;
overflow: hidden;
pointer-events: none;
opacity: 1;
    z-index: 2387465723465872364587623874568732645736457638475637465873465873645876473658736458736587638475638746587346578364587368756387645783654837638745687346587364587346512837594182374981723948712938471938471982734981723948719283471982374981273489127348971234897128935709813475094235788;"></canvas>');
>>>>>>> Stashed changes
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

// window.onresize = function setCanvasSize(){
//     canvas.height = document.body.clientHeight;
//     canvas.width = document.body.clientWidth;
// }
