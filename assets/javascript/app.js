$(document).ready(function () {
    var apiKey = "BnfsRo680bLfU04NsZQU5KmbZRGSRjVC";

    var topics = ["Barrack Obama", "Bernie Sanders", "Paul Ryan", "Donald Trump", "Mitch McConnel", "Bill Clinton", "Howard Dean", "Sarah Palin"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayGifs() {
        var selectedGif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedGif + "&api_key=" + apiKey + "&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                var still = response.data[i].images.fixed_height_still.url;
                var animated = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;
                var imgDiv = `
                <div class = "img-container">
                    <p>Rating: ${rating.toUpperCase()}</p>
                    <img src="${still}" class="giphy-gifs" data-still="${still}" data-animate="${animated}" data-state="still"/>
                </div>`;
                console.log(still);
                $(".gifs-display").prepend(imgDiv)
            }
            message();
        });
    }

    // Function for displaying gif buttons
    function createButtons() {

        // Deleting the gifs prior to adding new ones
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("gif-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a movie button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        createButtons();
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".gif-btn", displayGifs);

    //Click event to toggle animation
    $(document).on("click", ".giphy-gifs", function (event) {
        event.preventDefault();
        var state = $(this).attr('data-state');
        console.log(state)

        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate')
        }

        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still')
        };
    });
    
    //Function checks which message to print
    function message() {
        if ($('.gifs-display').is(':empty')){ 
            $("#message").html("<p>Choose a category above or add your own!</p>")
        }
        else {
            $("#message").html("<p>Click on a GIF to animate!</p>")
        }
        };

    // Calling the renderButtons function to display the intial buttons
    createButtons();

    //Calls the message function
    message();

});