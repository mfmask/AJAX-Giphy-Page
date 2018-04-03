// Event listener for click events.
// $("button").on("click", function() {
// }

  //variable array of topics
  var topics = ["computers", "cellphones", "networks", "software", "coding"];

   // Function for displaying gif data.
   function renderButtons() {

    // Delete the content inside the gifs-appear-here div and added tech buttons, prior to adding new ones.
   
       $("#gifs-appear-here").empty();
       $("#tech-buttons").empty();

    // Loop through the array of gifs, then generate buttons for each gifs in the array.
    topics.forEach(function(topics) {
      $("#tech-buttons").append(
      `<button data-val=${topics}>${topics}</button>`    
      )
    });
  }
   // This function handles events where the add Add your own Tech gifs is clicked.
   $("#addTech").on("click", function(event) {

    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    var formValue = $("#tech-input").val().trim();
    $('#tech-input').val("");
    if (!(topics.indexOf(formValue) > -1)) {
      topics.push(formValue);
    }

    // Write code to grab the text the user types into the input field
    // Write code to add the new movie into the movies array

    // The renderButtons function is called, rendering the list of movie buttons
    renderButtons();
  });
   // Calling the renderButtons function to display the initial list of gif buttons.
   renderButtons();

   $("#tech-buttons > button").on("click", function(event) {

      var technology = $(this).attr("data-val");
      console.log("technology: " + technology);

      // query URL
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      technology + "&api_key=5IyDIqfXAmQwbS5lWAZHLbYZUzz05gr5&limit=10"; 

      // Solicits AJAX call for button being clicked.
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After data comes back from the request
      .then(function(response) {

        console.log(response);
        console.log(queryURL);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

       // Looping through each result item
       results.forEach(function(result) {
        var gifDiv = $('<div>');
        var p = $('<p>');
        p.text(result.rating);
        gifDiv.prepend(p);  

        var img = $('<img>');
            img.attr('src', result.images.fixed_height.url);

            gifDiv.append(img);

            $('#gifs-appear-here').append(gifDiv)
          })

        // //Creates a div to hold gif.
        // var gifDiv = $("<div class='gif'>");
        
        // //Stores rating info.
        // var rating = response.rating;

        

        // //Creates an element to have rating dispalyed.
        // var pRating = $("<p>").text("Rating: " + rating);

        // // Displays the rating.
        // gifDiv.append(pRating);

      });

    })

// Code for pausing gifs.

// $(document).on("click", ".animal-image", function() {
//   var state = $(this).attr("data-state");
//   if (state === "still") {
//     $(this).attr("src", $(this).attr("data-animate"));
//     $(this).attr("data-state", "animate");
//   }
//   else {
//     $(this).attr("src", $(this).attr("data-still"));
//     $(this).attr("data-state", "still");
//   }
// });