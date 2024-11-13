document.addEventListener("DOMContentLoaded", function () {
  // First page should be visible whilst the other should not

  const openingPage = document.getElementById("first-page");
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");

  openingPage.style.display = "block";
  quizPage.style.display = "none";
  endPage.style.display = "none";

  // Store starting point of game variables in an object.
  const gameState = {
    questionIndex: 0,
    questionNumber: 1,
    score: 0,
  };

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
            // console.log(object);
            // Add questions to gameSet object
            gameState.questionSet = object.results;
            gameState.questionsRemaining = gameState.questionSet.length;
            console.log("gameState:", gameState);
            // function to run the game should be below
            runGame(gameState);
          });
      } else if (
        this.getAttribute("data-type") === "true-btn" ||
        this.getAttribute("data-type") === "false-btn"
      ) {
        //   function that checks the answer
        checkAnswer(this, gameState);

        // function that displays feedback
      } else if (this.getAttribute("data-type") === "next-question-btn") {
        // function which gets next question
        console.log("gameState:", gameState);
        nextQuestion(gameState);
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
function runGame(gameState) {
  // Hide the start game and play again page
  // Make the question area page visible

  // SOMETHING TO THINK ABOUT - separate function can be used for the page logic - can use switch case?
  const openingPage = document.getElementById("first-page");
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");

  if (openingPage.style.display === "block") {
    openingPage.style.removeProperty("display");
    openingPage.style.display = "none";
  }

  if (quizPage.style.display === "none") {
    quizPage.style.removeProperty("display");
    quizPage.style.display = "block";
  }

  if (endPage.style.display === "block") {
    endPage.style.removeProperty("display");
    endPage.style.display = "none";
  }

  // SOMETHING TO THINK ABOUT - maybe reset the below score and number when play again?
  // display score is 0
  const currentScore = document.getElementById("current-score");
  currentScore.innerText = gameState.score;

  // display question number is 1
  const questionNumberElement = document.getElementById("question_number");
  questionNumberElement.innerText = gameState.questionNumber;

  // display questions remaining is 10
  const questionsRemainingElement = document.getElementById("questions-left");
  questionsRemainingElement.innerText = gameState.questionsRemaining;

  displayQuestion(gameState);
}

/**
 * This function should hide the next question button and display the question.
 */
function displayQuestion(gameState) {
  // console.log("index:", gameState.questionIndex);
  // console.log("Number:", gameState.questionNumber);
  // console.log("Api object:", gameState.questionSet);

  // Hide the next question button
  const nextButton = document.getElementById("btn_nextquestion");
  nextButton.style.display = "none";

  // display the question number
  const questionNumberElement = document.getElementById("question_number");
  questionNumberElement.innerText = gameState.questionNumber;

  // display the question
  const questionElement = document.getElementById("question");

  // display questions remaining
  const questionsRemainingElement = document.getElementById("questions-left");
  questionsRemainingElement.innerText = gameState.questionsRemaining;

  const currentQuestion =
    gameState.questionSet[gameState.questionIndex].question;
  // console.log("question:", gameState.questionSet[gameState.questionIndex].question);

  questionElement.innerText = currentQuestion;
}

/**
 * This function should check which answer was clicked and indicate if the answer was correct
 */
function checkAnswer(button, gameState) {
  const currentQuestion =
    gameState.questionSet[gameState.questionIndex].question;
  const selectedAnswer = button.innerText;
  const correctAnswer =
    gameState.questionSet[gameState.questionIndex].correct_answer;

  const feedbackMessage = document.getElementById("feedback");
  const currentScore = document.getElementById("current-score");

  if (selectedAnswer === correctAnswer) {
    // increment score
    gameState.score++;
    currentScore.innerText = gameState.score;
    // decrease questions remaining - TO BE ADDED

    // Feedback message using innertext or innerHTML
    feedbackMessage.innerText = "Well Done!!! That was the correct answer";
  } else {
    feedbackMessage.innerText = `That was incorrect. The correct answer was ${correctAnswer}`;
  }

  // Disable Answer Buttons to ensure they can't be clicked whilst answer is being checked
  disableAnswerButtons();

  // Display Next Quesion Button - SOMETHING TO THINK ABOUT - Make button say end quiz or some message

  const nextButton = document.getElementById("btn_nextquestion");
  nextButton.style.display = "inline-block";

  if (gameState.questionIndex === gameState.questionSet.length - 1) {
    nextButton.innerText = "End Quiz";
  }

  // const nextButton = document.getElementById("btn_nextquestion");
  // nextButton.style.display = "inline-block";
}

function nextQuestion(gameState) {
  // remove feedback message
  const feedbackMessage = document.getElementById("feedback");
  feedbackMessage.innerText = "";

  // increment index and question number
  gameState.questionIndex++;
  gameState.questionNumber++;
  // decrease questions remaining
  gameState.questionsRemaining--;

  if (gameState.questionIndex < gameState.questionSet.length) {
    // display next question
    displayQuestion(gameState);
    // enable buttons for next q
    enableAnswerButtons();
  } else {
    endGame(gameState);
  }
}

/**
 * This function should disable the answer buttons - true and false to prevent multiple clicks in a round
 */
function disableAnswerButtons() {}

/**
 * This function should enable the answer buttons - true and false in preparation for the next question
 */
function enableAnswerButtons() {}

function endGame(gameState) {
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");

  // Final page should now be visible and all other pages removed
  if (quizPage.style.display === "block") {
    quizPage.style.removeProperty("display");
    quizPage.style.display = "none";
  }

  if (endPage.style.display === "none") {
    endPage.style.removeProperty("display");
    endPage.style.display = "block";
  }
}
