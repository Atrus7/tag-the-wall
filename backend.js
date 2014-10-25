$(function() {

	Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j", "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

	// Create a Website object, which is a subclass of Parse.Object
	var Website = Parse.Object.extend("Website");
	// Create a new instance of Website
	var website = new Website();

	website.set("url", "Hello World!");

	website.save(null, {
		success: function(website) {
			alert('New object created with objectId: ' + website.id);
			$(".success").show();
		},
		error: function(website, error) {
			alert('Failed with error code: ' + error.message);
		}
	});


	// Click button event response
	$('#fileToUpload').click(function(){
		alert('button is clicked');
		fileUpload();
	});

	function fileUpload(data){

		var fileUploadControl = $("#profilePhotoFileUpload")[0];
		

		if (fileUploadControl.files.length > 0) {
			//var file = fileUploadControl.files[0];
			var file = data;
			console.log('File: ',file);
			var name = "mario.png";
			alert("This function is running");
			var pngFile = new Parse.File(name, file);
			pngFile.save().then(function() {
			  // The file has been saved to Parse.
			  console.log('1: ',  pngFile);
			  }, function(error) {
			  // The file either could not be read, or could not be saved to Parse.
			  alert('2: ' +  error.message);
			});

			var graffiti = new Parse.Object("Graffiti");
		    // var graffiti = new Graffiti();
		
			var Website = Parse.Object.extend("Website");

			var currentURL = new Website();
			currentURL.set("url", document.URL);
			currentURL.save(null, {
				success: function(currentURL) {
				//alert('New object created with objectId: ' + website.id);
				//$(".success").show();
					graffiti.set("png", pngFile);
					graffiti.set("title", "Mario");
					graffiti.set("url", currentURL);
					graffiti.set("urlString", document.URL);
					console.log('saving pngFile');
					graffiti.save();
				},
				error: function(currentURL, error) {
				//alert('Failed with error code: ' + error.message);
				}	
			});
		}



	//var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
	//var pngFile = new Parse.File("Mario.png", fileData);

	// Create a Graffiti object from an uploaded png file



	// pngFile.save().then(function() {
	//   // The file has been saved to Parse.
	//   //alert('1: ' + pngFile.id);

	// }, function(error) {
	//   // The file either could not be read, or could not be saved to Parse.
	//   //alert('2: ' error.message);
	// });


	//graffiti.set("png", pngFile);
	//graffiti.save();
	}
});


//    Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j", "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");
    
/*    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        $(".success").show();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });*/