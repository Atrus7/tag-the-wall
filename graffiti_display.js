function loadPublic() {
	viewPrivate = false;

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
			//alert("Error: " + error.code + " " + error.message);
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
	if (passed_id == "")  console.log("Can't lookup blank field");
	else {
		// console.log(passed_id);

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
				// console.log(pngUrl);

			},
			error: function(error) {
				//alert("Error: " + error.code + " " + error.message);
			}
		});
	}
}