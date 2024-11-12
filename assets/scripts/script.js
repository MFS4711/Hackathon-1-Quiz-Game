document.addEventListener("DOMContentLoaded", function () {
  const apiURL = `https://opentdb.com/api.php?amount=10&category=9&type=boolean`;

  // Add Event Listeners to buttons
  // 5 buttons
  // - Start Game and Play Again will have the same function
  // - Next Question button displays the next question
  // - True or False buttons are answer buttons

  fetch(apiURL) // retrieve all data from this url
    .then(function (response) {
      // this gets called when the fetch function returns its data
      return response.json(); // convert the relevant part of the page to a JS object
    })
    .then(function (object) {
      // this gets called when the conversion is complete
      console.log(object);
    });
});

// Api already gives random questions
// Need a function which applies one question and then the next one after the next button is pressed
// Need a function to increment score
// Need a function to countdown questions left

let buttons = document.getElementsByTagName("button");
for (let button of buttons) {
  button.addEventListener("click", function () {
    if (this.getAttribute("data-type") === "start-game" || this.getAttribute("data-type") === "play-again") {
    // function that starts the game
    // function that creates the question list
    // function which applies the first question
    } else if (this.getAttribute("data-type") === "true" || this.getAttribute("data-type") === "false") {
    //   function that checks the answer
    // function
    }
  });
}
