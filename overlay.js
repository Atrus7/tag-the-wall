var css = jQuery('<link href="overlay.css" rel="stylesheet" type="text/css">');
var jquery = jQuery('<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>');
var overlay = jQuery('<div id="graffiti-overlay"> </div>');
css.appendTo(document.body);
jquery.appendTo(document.body);
overlay.appendTo(document.body);
var pic_x, pic_y;
pic_x = 108;
pic_y = 18;
pic_name = "pnggrad8rgb.png";
pic_data="";
var one_picture = {x: pic_x, y:pic_y, name: pic_name, data:pic_data};
var all_pictures = [];
//CODE TO loop inserting all of the pictures
all_pictures.push(one_picture);

if(pic_data =="")
{
var pic=jQuery('<img class="graffiti" style = "left:'+ all_pictures[0]["x"] +
    'px; top: ' + all_pictures[0]["y"] + 'px;" src ="' + all_pictures[0]["name"] + '"> </img>');
}

else
{
var pic=jQuery('<img class="graffiti" style = "x:'+ all_pictures[0]["x"] +
    'px; y: ' + all_pictures[0]["y"] + 'px;" src ="' + all_pictures[0]["data"] + '"> </img>');
}
setOverlaySize();

pic.appendTo(document.body);

 function setOverlaySize(){
    $("#graffiti-overlay").css("height", document.body.clientHeight + "px");
    $("#graffiti-overlay").css("width", document.body.clientWidth + "px");

        }
