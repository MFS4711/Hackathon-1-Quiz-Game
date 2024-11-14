document.addEventListener("DOMContentLoaded", function () {
  // First page should be visible whilst the other should not

  const openingPage = document.getElementById("homepage");
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
  
  // API URL
  const apiURL = `https://opentdb.com/api.php?amount=10&category=9&type=boolean`;

  // Button Event Listeners
  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (
        this.getAttribute("data-type") === "start-btn" ||
        this.getAttribute("data-type") === "play-again-btn"
      ) {
        fetch(apiURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (object) {
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
        // function that checks the answer
        checkAnswer(this, gameState);
      } else if (this.getAttribute("data-type") === "next-question-btn") {
        // function which gets next question
        nextQuestion(gameState);
      }
    });
  }
});

/**
 * This Function should remove the divs containing the first page and end page, only displaying the ques
 */
function runGame(gameState) {

  // Perhaps page logic can be changed to a seperate function
  const openingPage = document.getElementById("homepage");
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

  if (endPage.style.display === "flex") {
    endPage.style.removeProperty("display");
    endPage.style.display = "none";
  }

  // display score is 0
  const currentScore = document.getElementById("current-score");
  currentScore.innerText = gameState.score;

  // display question number is 1
  const questionNumberElement = document.getElementById("question_number");
  questionNumberElement.innerText = gameState.questionNumber;

  // display questions remaining is 10
  const questionsRemainingElement = document.getElementById("questions-left");
  questionsRemainingElement.innerText = gameState.questionsRemaining;

  // Ensure final Q and A section string is reset
  const finalPageQandA = document.getElementById("quiz-end-questions");
  finalPageQandA.innerHTML = "";

  displayQuestion(gameState);
}

/**
 * This function should hide the next question button and display the question.
 */
function displayQuestion(gameState) {

  // Hide the next question button
  const nextButton = document.getElementById("btn_nextquestion");
  nextButton.style.display = "none";

  // display the question number
  const questionNumberElement = document.getElementById("question_number");
  questionNumberElement.innerText = gameState.questionNumber;

  // display questions remaining
  const questionsRemainingElement = document.getElementById("questions-left");
  questionsRemainingElement.innerText = gameState.questionsRemaining;

  // display the question
  const currentQuestion =
    gameState.questionSet[gameState.questionIndex].question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  console.log("question:", currentQuestion);

  const questionElement = document.getElementById("question");
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

    // Feedback message using innertext or innerHTML
    feedbackMessage.innerText = "Well Done!!! That was the correct answer";
  } else {
    feedbackMessage.innerText = `That was incorrect. The correct answer was ${correctAnswer}`;
  }

  // Disable Answer Buttons to ensure they can't be clicked whilst answer is being checked
  disableAnswerButtons();

  // Display Next Quesion Button - On last question say end quiz
  const nextButton = document.getElementById("btn_nextquestion");
  nextButton.style.display = "inline-block";

  if (gameState.questionIndex === gameState.questionSet.length - 1) {
    nextButton.innerText = "End Quiz";
  }

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
function disableAnswerButtons() {
  const answerButtons = document.querySelectorAll(
    "button[data-type='true-btn'], button[data-type='false-btn']"
  );
  // for each allows each array element to be acted on
  answerButtons.forEach((button) => (button.disabled = true));
}

/**
 * This function should enable the answer buttons - true and false in preparation for the next question
 */
function enableAnswerButtons() {
  const answerButtons = document.querySelectorAll(
    "button[data-type='true-btn'], button[data-type='false-btn']"
  );
  answerButtons.forEach((button) => (button.disabled = false));
}

function endGame(gameState) {
  // Final page should now be visible and all other pages removed
  const quizPage = document.getElementById("game-area");
  const endPage = document.getElementById("quiz-end-page");

  if (quizPage.style.display === "block") {
    quizPage.style.removeProperty("display");
    quizPage.style.display = "none";
  }
  if (endPage.style.display === "none") {
    endPage.style.removeProperty("display");
    endPage.style.display = "flex";
  }

  // Display final Score
  const finalScore = document.getElementById("final-score");
  finalScore.innerText = ` ${gameState.score} / ${gameState.questionSet.length}`;

  // Display a different message depending on the score
  const finalMessage = document.getElementById("final-message");
  if (gameState.score / gameState.questionSet.length === 1) {
    finalMessage.innerText = `You did it! A perfect score of ${gameState.score}/${gameState.questionSet.length}. Truly outstanding work!`;
  } else if (gameState.score / gameState.questionSet.length >= 0.8) {
    finalMessage.innerText = `Awesome! You scored ${gameState.score}/${gameState.questionSet.length} you're in the top tier of quiz masters! Keep it up!`;
  } else if (gameState.score / gameState.questionSet.length >= 0.6) {
    finalMessage.innerText = `You're doing great! With ${gameState.score}/${gameState.questionSet.length}, you're almost there. Just a bit more and you'll hit the top!`;
  } else if (gameState.score / gameState.questionSet.length >= 0.4) {
    finalMessage.innerText = `Not bad! You scored ${gameState.score}/${gameState.questionSet.length}. You're getting there—keep practicing, and you'll improve!`;
  } else if (gameState.score / gameState.questionSet.length >= 0.2) {
    finalMessage.innerText = `It's a start! You scored ${gameState.score}/${gameState.questionSet.length}, but don't worry, every quiz is a chance to learn and improve!`;
  } else if (gameState.score / gameState.questionSet.length >= 0) {
    finalMessage.innerText = `You got some right! ${gameState.score}/${gameState.questionSet.length} means you're on the board. Great start—keep going`;
  } else {
    finalMessage.innerText = `Don't worry, everyone starts somewhere! You scored ${gameState.score}/${gameState.questionSet.length}, but you've got this—try again and see how much you can improve!`;
  }

  // Display questions and answers
  const finalPageQandA = document.getElementById("quiz-end-questions");

  for (let i = 0; i < gameState.questionSet.length; i++) {
    const question = gameState.questionSet[i].question;
    const answer = gameState.questionSet[i].correct_answer;
    const questionNum = i + 1;

    let htmlString = `
    <p> <strong> Question ${questionNum}:</strong> ${question} <br>
     <strong> Answer:</strong> ${answer} </p>
    `;

    finalPageQandA.innerHTML += htmlString;
  }

  // Reset gameState object
  gameState.questionNumber = 1;
  gameState.questionIndex = 0;
  gameState.score = 0;

  // Reset Next Question text
  const nextButton = document.getElementById("btn_nextquestion");
  nextButton.innerText = "Next Question";

  // enable answer buttons
  enableAnswerButtons();
}
