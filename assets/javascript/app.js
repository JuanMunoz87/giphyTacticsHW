// Initial Values
var sports = ["Soccer", "Football", "Tennis", "Cycling", "Gold", "Fishing"];



function addButtons() {
	$("#list-button").empty();
	for (var i = 0; i < sports.length; i++) {
		var a = $("<button>");
		a.addClass("sport");
		a.attr("data-name", sports[i]);
		a.text(sports[i]);
		$("#list-button").append(a);
	}
}
var sport;


$("#addSport").on("click", function() {
  //event.preventDefualt();
  var newSport = $("#sport-input").val().trim();
  
  sports.push(newSport);
  addButtons();
  return false;
})
addButtons();


$("body").on("click", "button", function() {
  var topic = $(this).data("name");
 
$("#image-box").empty();

var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ sport+"ryan+gosling&api_key=1gmxb1ZL1MXvtT2KScYcwUP1yv8iHqd3&limit=20";
//queryURL.done(function(data) { console.log("success got data", data); });



//ajax call.
$.ajax( {
  url: queryURL,
  method: "GET",
})

.then(function(response) {
  var results = response.data;
  

	for (var i = 0; i < results.length; i++) {
		var rating = results[i].rating;
		

		var sportDiv = $("<div class='item'>");
    var p = $("<p>").text("Rating: " + rating);

		var still = results[i].images.fixed_height_still.url;
    var animate = results[i].images.fixed_height.url;
    var sportImage = $("<img>");

		sportImage.attr("src", still);
		sportImage.attr("data-still", still);
		sportImage.attr("data-animate", animate);
		sportImage.attr("data-state", "still");
		sportImage.addClass("gif");

	sportDiv.append(p);
	sportDiv.append(sportImage);

	    $("#image-box").append(sportDiv);
	}
  })
})
	$(document).on("click", ".gif", function() {
		var state = $(this).attr("data-state");
		if (state == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	})