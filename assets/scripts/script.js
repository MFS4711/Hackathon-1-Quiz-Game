document.addEventListener("DOMContentLoaded", function () {

  // First page should be visible whilst the other should not

  const openingPage = document.getElementById("first-page");
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");

  openingPage.style.display = "flex";
  quizPage.style.display = "none";
  endPage.style.display = "none";

  const apiURL = `https://opentdb.com/api.php?amount=10&category=9&type=boolean`;

  // Add Event Listeners to buttons
  // 5 buttons
  // - Start Game and Play Again will have the same function
  // - Next Question button displays the next question
  // - True or False buttons are answer buttons

  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (
        this.getAttribute("data-type") === "start-btn" ||
        this.getAttribute("data-type") === "play-again-btn"
      ) {
        // This will generate the object with quiz questions - play again gives a new random set
        fetch(apiURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (object) {
            // CONFIRMED: object is different for each button - SUCCESS
            console.log(object);
            // function to run the game should be below
            runGame();
          });
      } else if (
        this.getAttribute("data-type") === "true-btn" ||
        this.getAttribute("data-type") === "false-btn"
      ) {
        //   function that checks the answer
        // function that displays feedback
      } else if (this.getAttribute("data-type") === "next-question-btn") {
        // function which gets next question
      }
    });
  }
});

// Api already gives random questions
// Need a function which applies one question and then the next one after the next button is pressed
// Need a function to increment score
// Need a function to countdown questions left


/**
 * This Function should remove the divs containing the first page and end page, only displaying the ques
 */
function runGame (object) {

  // Hide the start game and play again page
  // Make the question area page visible

  const openingPage = document.getElementById("first-page");
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");
  
  if (openingPage.style.display === "block") {
    openingPage.style.removeProperty("display");
    openingPage.style.display = "none";
  }

  if (quizPage.style.display === "none") {
    quizPage.style.removeProperty("display");
  }
  
  if (endPage.style.display === "block") {
    endPage.style.removeProperty("display");
    endPage.style.display = "none";
  }
  

}