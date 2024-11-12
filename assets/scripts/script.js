document.addEventListener("DOMContentLoaded", function () {
  const apiURL = `https://opentdb.com/api.php?amount=10&category=9&type=boolean`;

  // Add Event Listeners to buttons
  // 5 buttons
  // - Start Game and Play Again will have the same function
  // - Next Question button displays the next question
  // - True or False buttons are answer buttons

  let buttons = document.getElementsByTagName("button");
for (let button of buttons) {
  button.addEventListener("click", function () {

    if (this.getAttribute("data-type") === "start-btn" || this.getAttribute("data-type") === "play-again-btn") {

    // This will generate the object with quiz questions - play again gives a new random set
    fetch(apiURL) 
    .then(function (response) {
      return response.json(); 
    }) .then(function (object) {
      console.log(object);
    });
    } 
    else if (this.getAttribute("data-type") === "true-btn" || this.getAttribute("data-type") === "false-btn") {
    //   function that checks the answer
    // function
    }
  });
}

});

// Api already gives random questions
// Need a function which applies one question and then the next one after the next button is pressed
// Need a function to increment score
// Need a function to countdown questions left


