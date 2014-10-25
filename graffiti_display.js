var css = jQuery('<link href="overlay.css" rel="stylesheet" type="text/css">');
var overlay = jQuery('<div id="graffiti-overlay"> </div>');

//css.appendTo(document.body);
//jquery.appendTo(document.body);
var pic_x, pic_y;
pic_x = 108;
pic_y = 18;
iconURL = chrome.extension.getURL("rainbow.png");
pic_name = iconURL;
pic_data="";
var one_picture = {x: pic_x, y:pic_y, name: pic_name, data:pic_data};
var all_pictures = [];
//CODE TO loop inserting all of the pictures
all_pictures.push(one_picture);

if(pic_data =="")
{
var pic=jQuery('<img class="graffiti" style = "left:'+ all_pictures[0]["x"] +
    'px; top: ' + all_pictures[0]["y"] + 'px; z-index: 23881273489127348971234897128935709813475094235788;" src ="' + all_pictures[0]["name"] + '"> </img>');
}

else
{
var pic=jQuery('<img class="graffiti" style = "x:'+ all_pictures[0]["x"] +
    'px; y: ' + all_pictures[0]["y"] + 'px;" src ="' + all_pictures[0]["data"] + '"> </img>');
}

pic.appendTo(document.body);
setOverlaySize();

 function setOverlaySize(){
    $(".graffiti").css("z-index", 19238478239742349870000);
        }
