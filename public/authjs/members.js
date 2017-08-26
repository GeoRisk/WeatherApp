// var moment = require("moment");

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

	// userCity is currently dummy data. Need to feed user input here.
	$(".location-btn").click(function() {
        
        event.preventDefault();

		// console.log("inside the button click");

		var userCity = $("#user-location").val().trim().replace(" ","%20");
		console.log("user city is: " +userCity);

		$(".location-btn").val("");
		$("#user-location").val("");

		//This is supposed to add the city value to the MySQL database. DOES NOT WORK.
		//==============
		
		$.post("api/favorites", function(userCity) {
			city: userCity
		});

		//==============

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
			$("#nowTemp").html(temp);

			var description = response.weather[0].main;
			console.log("How's the weather? " + description);
			$("#nowWeather").html(description);

			// Code for whether rain/sun/etc... JSON changes depending. 

			var wind = response.wind.speed;
			console.log("wind speed: "+wind);
			$("#nowWind").html(wind);

			var cityName = response.name;
			console.log("JSON city name: "+cityName);
			$("#nowCity").html(cityName);

<<<<<<< HEAD
		});
        //access the API with geolocation
        // var api='https://api.openweathermap.org/data/2.5/weather?q='+'&APPID=bc51d7ca05eabc94d8f660b95cd19470';
        $.getJSON(weatherURL + userCity +weatherKey, function(data){
            var weatherType = data.weather[0].description;
            var cel = ((data.main.temp)-273.15).toFixed(0);
            var minTemp = (data.main.temp_min)-273.15;
            var maxTemp = (data.main.temp_max)-273.15;
            var windSpeed = data.wind.speed;
            var sunUp = data.sys.sunrise;
            var sunSet = data.sys.sunset;
            var myDate = new Date(1000*sunUp);
            var hoursSunUp = "0"+myDate.getHours();
            var minutesSunUp = myDate.getMinutes();
            if (minutesSunUp.toString().length < 2){
                minutesSunUp = "0"+minutesSunUp;
            }
            var sunUpConverted = hoursSunUp+":"+minutesSunUp;
            var myDate2 = new Date(1000*sunSet);
            var hoursSunSet = myDate2.getHours();
            var minutesSunSet = myDate2.getMinutes();
            if (minutesSunSet.toString().length < 2){
                minutesSunSet = "0"+minutesSunSet;
            }
            var sunSetConverted = hoursSunSet+":"+minutesSunSet;
            $("#city").html("Your Location: "+data.name);
            $("#weatherType").html(weatherType);
            $("#temperature").html("Current Temperature: " + cel+" &#8451;");
            $("#temp_min").html("Min. Temperature: " + minTemp+" &#8451;");
            $("#temp_max").html("Max. Temperature: " + maxTemp+" &#8451;");
            $("#windSpeed").html("Wind: " + windSpeed + " mtrs. sec.");
            $("#sunRise").html("Sunrise: " + sunUpConverted +" Hours");
            $("#sunSet").html("Sunset: " + sunSetConverted +" Hours");
        });

})
=======
			// var todayDate = response.dt;
			// var momentDate = moment();
			// console.log("moment date: "+momentDate);

			// momentDate = moment(momentDate).format(LL);
			// console.log("moment date2: "+momentDate);

			var todayDate = new Date();
				var dd = todayDate.getDate();
				var mm = todayDate.getMonth()+1; //January is 0!
				var yyyy = todayDate.getFullYear();

				if(dd<10) {
				    dd = '0'+dd
				} 
				if(mm<10) {
				    mm = '0'+mm
				} 
				todayDate = mm + '/' + dd + '/' + yyyy;

			// todayDate = moment(todayDate).format(LL);
			console.log("todays date is now: "+todayDate);
			$("#todaysDate").html(todayDate);

		});		
>>>>>>> 546971f8622dcf4559e63e5ae36e3211a0fa3b61

	});
	
});

// Testing and verifying the code worked; the below does return a JSON. 
// https://api.openweathermap.org/data/2.5/weather?q=sanfrancisco&APPID=bc51d7ca05eabc94d8f660b95cd19470


			// success: function(data) {
			// 	var temp = data.main.temp,

			// 	var degrees = temp * 9 / 5 - 459.67,
			// },





//Don't delete this part of code? I'm working on it.

// $(function() {
//
//     const _appId = "bc51d7ca05eabc94d8f660b95cd19470";
//
//     setupForecastClick();
//     getWeather();
//
//     ////////////////////////////////////////////////////////////
//
//     function setupForecastClick() {
//         $(".forecast-button").click(function() {
//
//             if(this.dataset.modal === "ON"){
//                 this.dataset.modal = "OFF";
//                 $(this).html("Forecast");
//                 $(this).prev().slideUp();
//             }
//             else {
//                 this.dataset.modal = "ON";
//                 $(this).html("Close Forecast");
//
//                 if (this.dataset.forecast === "NO"){
//                     this.dataset.forecast = "YES"; //prevent unnecessary api calls if clicked more than once
//                     getForecast(this.dataset.cityId, this.dataset.cityName, this);
//                 }
//                 else
//                     $(this).prev().slideDown();
//             }
//         });
//     }
//
//     //get the current weather for my 5 cities
//     function getWeather() {
//
//         $.ajax({
//             method: "GET",
//             url: "http://api.openweathermap.org/data/2.5/group?id=2650225,6544881,3027301,3108877,2950159&units=metric&appid=" + _appId,
//         })
//             .done(function( data ) {
//                 $(".loader").slideUp().fadeOut();
//
//                 console.log("Successfully retrieved city data.");
//
//                 buildCityCards(data);
//             });
//
//     }
//
//     //get the forecast for the clicked city. It appears that the API returns a list of 3 hour blocks
//     //of weather forecasts so I'm just going to read the first one.
//     function getForecast(cityId, cityClass, thisRef) {
//
//         $.ajax({
//             method: "GET",
//             url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + _appId,
//         })
//             .done(function( msg ) {
//                 $(cityClass + " .forecast-text").text(msg.list[0].weather[0].main);
//                 $(cityClass + " .forecast-icon").html("<img src='http://openweathermap.org/img/w/" + msg.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
//                 $(thisRef).prev().slideDown();
//             });
//
//     }
//
//     //build our cards. If I was allowed to use ES6 (Angular2/Aurelia) I would've made this a simple
//     //repeater and it would've been much more lean, both in the JS and HTML
//     function buildCityCards(data) {
//
//         setWind(data.list);
//         setTemps(data.list);
//         setIcons(data.list);
//
//         $(".recentbg").animate({ opacity: 1 }, { queue: false, duration: 'slow' });
//     }
//
//     function setWind(data) {
//
//         $("#newYork.wind").html("Current wind: " + data[0].wind.speed + " m/s");
//         $("#losAngeles.wind").html("Current wind: " + data[1].wind.speed + " m/s");
//         $("#paRis.wind").html("Current wind: " + data[2].wind.speed + " m/s");
//         $("#maNille.wind").html("Current wind: " + data[3].wind.speed + " m/s");
// //        $(".berlin .wind").html("Current wind: " + data[4].wind.speed + " m/s");
//     }
//
//     function setTemps(data) {
//
//         $("#newYork.temp").html(Math.round(data[0].main.temp) + "° C");
//         $("#losAngeles.temp").html(Math.round(data[1].main.temp) + "° C");
//         $("#paRis.temp").html(Math.round(data[2].main.temp) + "° C");
//         $("#maNille.temp").html(Math.round(data[3].main.temp) + "° C");
// //        $(".berlin .temp").html(Math.round(data[4].main.temp) + "° C");
//     }
//
//     function setIcons(data) {
//
//         $("#newYork.icon").html("<img src='http://openweathermap.org/img/w/" + data[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
//         $("#losAngeles.icon").html("<img src='http://openweathermap.org/img/w/" + data[1].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
//         $("#paRis.icon").html("<img src='http://openweathermap.org/img/w/" + data[2].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
//         $("#maNille.icon").html("<img src='http://openweathermap.org/img/w/" + data[3].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
// //        $(".berlin .icon").html("<img src='http://openweathermap.org/img/w/" + data[4].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
//     }
//
// });