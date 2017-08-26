$(document).ready(function() {
	// This file just does a GET request to figure out which user is logged in
	// and updates the HTML on the page
	$.get("/api/user_data").then(function(data) {
		$(".member-name").text(data.email);
	});

	// console.log("Here");
	
	var weatherKey = "&APPID=bc51d7ca05eabc94d8f660b95cd19470";

	var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

	// console.log("Here");

	//userCity is currently dummy data. Need to feed user input here.
	$(".location-btn").click(function() {
        event.preventDefault();

		// console.log("inside the button click");

		var userCity = $("#user-location").val().trim().replace(" ","%20");
		console.log("user city is: " +userCity);	

		var userSearchURL = weatherURL + userCity + weatherKey;
		console.log("search ajax is: " +userSearchURL);

		$.ajax({
			dataType: "json",
			url: userSearchURL,
			method: "GET"
			
		}).done(function(response){

			// console.log("ajax response error: "+error);
			console.log("ajax response: "+response);

			var temp = response.main.temp * 9 / 5 - 459.67;
			temp = Math.round(temp);
			console.log("temp is: "+temp);



		});		



	});
	


});

// Testing and verifying the code worked; the below does return a JSON. 
// https://api.openweathermap.org/data/2.5/weather?q=sanfrancisco&APPID=bc51d7ca05eabc94d8f660b95cd19470


			// success: function(data) {
			// 	var temp = data.main.temp,

			// 	var degrees = temp * 9 / 5 - 459.67,
			// },

