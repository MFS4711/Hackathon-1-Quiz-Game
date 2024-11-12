document.addEventListener("DOMContentLoaded", function () {
  // First page should be visible whilst the other should not

  const openingPage = document.getElementById("first-page");
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");

  openingPage.style.display = "block";
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
            runGame(object);
          });
      } else if (
        this.getAttribute("data-type") === "true-btn" ||
        this.getAttribute("data-type") === "false-btn"
      ) {
        //   function that checks the answer
        checkAnswer(this);
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
function runGame(object) {
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

  // Store starting point of game variables in an object.
  const gameState = {
    questionIndex: 0,
    questionNumber: 1,
    questionSet: object.results,
  };

  // let questionIndex = 0;
  // const questionSet = object.results;

  displayQuestion(gameState);
}

/**
 * This function should hide the next question button and display the question.
 */
function displayQuestion(gameState) {
  console.log("index:", gameState.questionIndex);
  console.log("Number:", gameState.questionNumber);
  console.log("Api object:",gameState.questionSet);

  // Hide the next question button
  const nextButton = document.getElementById("btn_nextquestion");
  nextButton.style.display = "none";

  // display the question
  const questionELement = document.getElementById("question");

  const currentQuestion = gameState.questionSet[gameState.questionIndex.question];
  // console.log("question:", gameState.questionSet[gameState.questionIndex].question);

  //   if (questionIndex < questionSet.length - 1) {
  //     const displayQuestion = document.getElementById("question");
  //     displayQuestion.innerText = object.results[questionIndex].question;
  //   }

  //   nextQuestion();
}

/**
 * This function should check which answer was clicked and indicate if the answer was correct
 */
function checkAnswer(button) {}

function nextQuestion() {}
