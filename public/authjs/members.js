$(document).ready(function() {
	  // This file just does a GET request to figure out which user is logged in
	  // and updates the HTML on the page
	  $.get("/api/user_data").then(function(data) {
	  	$(".member-name").text(data.email);
	  });

	 console.log("Here");
	var weatherKey = "&APPID=bc51d7ca05eabc94d8f660b95cd19470";

	var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

	var userCity = [];
	//userCity is currently dummy data. Need to feed user input here.
	$(".location-btn").on("click", function() {
		var city = $("#user-location").val().trim();
		console.log(city);
		userCity.push(city);
		console.log(userCity);
	

		var userSearchURL = weatherURL + userCity + weatherKey;
		console.log(userSearchURL);

		$.ajax({
			url: userSearchURL,
			number: 1,
			method: "GET"
		}).done(function(response){
			console.log(response);
		});
	});
	

});
