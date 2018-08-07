// giphy app

  // initial array of movies
  var searchTerms = ["Shiba Inu", "Giraffe", "Wolf", "Wolverine", "Hamster", "Ferret", "Siberian Husky", "Armadillo", "Cat"];

  function renderButtons() {    // renders the search buttons
    $("#link-populate").empty();
    for (var i = 0; i < searchTerms.length; i++) {
      var a = $("<button>");
      a.addClass("search-button");
      a.attr("data-name", searchTerms[i]);
      a.text(searchTerms[i]);
      $("#link-populate").append(a);
    }
  }

  function gifSearcher(qTerm) {     // takes in a string to search on giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    qTerm + "&api_key=IBzBDUjDl422KkQXgG6xF0fY1oZqBZmJ&limit=10";
    console.log(queryURL);
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var searchImage = $("<img>");
                searchImage.addClass("gif");
                searchImage.attr("src", results[i].images.fixed_height_still.url);
                searchImage.attr("data-still", results[i].images.fixed_height_still.url);
                searchImage.attr("data-animate", results[i].images.fixed_height.url);
                searchImage.attr("data-state", "still");
                gifDiv.append(p);
                gifDiv.append(searchImage);
                $("#gif-populate").prepend(gifDiv);
            }
        }
    });
  }

$(document).ready(function(){

    renderButtons();

    $(".search-button").on("click", function() {    // listens for button click and takes in term to search for gifs
        var sTerm = $(this).attr("data-name");
        gifSearcher(sTerm);
    });

    $("#add-term").on("click", function(event) {    // gets new term from input form
        event.preventDefault();
        var bTerm = $("#search-input").val().trim();
        searchTerms.push(bTerm);
        console.log(bTerm);
        console.log(searchTerms);
        renderButtons();
    });

    $(".gif").on("click", function() {
        console.log("click click")
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });

});
