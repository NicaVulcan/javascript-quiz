// Define global variables
var timerEl = document.querySelector("#timer");
var mainPageEl = document.querySelector("#start-quiz");
var questionPageEl = document.querySelector("#question-page");
var gameOverEl = document.querySelector("#game-over");
var btnBeginQuiz = mainPageEl.querySelector("#begin");
var questionHeading = questionPageEl.querySelector("#question");
var answersEl = questionPageEl.querySelector("#answer-choices");
var formEl = gameOverEl.querySelector("form");
var btnTryAgain = gameOverEl.querySelector("#try-again");
var timeLeft = 60;
var qIndex = 0;
var score = 0;
var savedScoresArr = [];

// Questions array
var questions = [
    {
        question: "What is the correct JavaScript syntax to write 'Hello World'?",
        answerChoices: ["console.log('Hello World')", "alert('Hello World')", "document.write('Hello World')", "response.write('Hello World')"],
        answerCorrect: "document.write('Hello World')"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answerChoices: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answerCorrect: "<script>"
    },
    {
        question: "Which of the following best describes JavaScript?",
        answerChoices: ["an object-oriented scripting language.", "a low-level programming language.", "a scripting language precompiled in the browser.", "a compiled scripting language."],
        answerCorrect: "an object-oriented scripting language."
    },
    {
        question: "Using _____ statements is how you test for specific conditions.",
        answerChoices: ["Select", "If", "Switch", "For"],
        answerCorrect: "If"
    },
    {
        question: "What is meant by 'this' keyword in javascript?",
        answerChoices: ["It referes previous object", "It is variable which contains value", "It refers current object", "None of the above"],
        answerCorrect: "It refers current object"
    },
    {
        question: "What would appear on the console if you were to type the following: 2 + 5 + '8'",
        answerChoices: ["78", "278", "7 + '8'", "15"],
        answerCorrect: "78"
    },
]

// Only show main page 
questionPageEl.style.display = "none";
gameOverEl.style.display = "none";

// Start Quiz
var startQuiz = function () {

    mainPageEl.style.display = "none";
    questionPageEl.style.display = "block";

    countdown();
    showQuestion();
};


// Countdown
var countdown = function () {

    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft + "s";
        timeLeft--;

        if (timeLeft === 0 || qIndex === questions.length) {
            timerEl.textContent = "Time's Up"
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};

// Show each question with respective answer choices
var showQuestion = function () {

    // Add question and respective answer choices text
    questionHeading.textContent = questions[qIndex].question;

    // Create element for each answer choice and append to answersEl div
    for (var i = 0; i < 4; i++) {
        var answerChoice = document.createElement("p");
        answerChoice.textContent = questions[qIndex].answerChoices[i];
        answerChoice.className = "answerChoice" + i;
        answersEl.appendChild(answerChoice);
    }

    // Event listener for clicking on answer choices
    answersEl.addEventListener("click", checkAnswer);
};


// Check answer and switch to next question
var checkAnswer = function (event) {

    // Check for correct answer
    var chosenAnswer = event.target;
    if (chosenAnswer.textContent === questions[qIndex].answerCorrect) {
        score = score + 10;
    } else {
        timeLeft = timeLeft - 5;
    }

    // If questions remaining on index, remove answer choices and show next question and respective answer choices, otherwise end game
    if (qIndex <= questions.length) {
        while (answersEl.firstChild) {
            questionHeading.textContent = "";
            answersEl.removeChild(answersEl.firstChild);
        };
        qIndex++
        showQuestion();
    } else {
        gameOver();
        return;
    };
};

// Game over, save score
var gameOver = function () {
    questionPageEl.style.display = "none";
    gameOverEl.style.display = "block";
    score = score + timeLeft;
    console.log(score);
    return score;
};

// Save score
var submitScore = function (event) {
    event.preventDefault();
    var initialsSave = gameOverEl.querySelector("#initials").value;
    console.log(initialsSave);

    // Save initial and score pair as an object and push to savedScoresArr
    var scoreObj = {
        initial: initialsSave,
        score: score
    }
    savedScoresArr.push(scoreObj);

    // Stringify array for local storage
    localStorage.setItem("score", JSON.stringify(savedScoresArr));
};

// Retrieve score and display on scoreboard
var loadScore = function () {
    var scoreboard = localStorage.getItem("score");
    if (!savedScoresArr) {
        return false;
    }
    savedScoresArr = JSON.parse(scoreboard);
};

// Restart game by refreshing page
var restart = function () {
    document.location.reload(false);
};

loadScore();

// Click 'begin' button starts quiz
btnBeginQuiz.addEventListener("click", startQuiz);

// Submit score
formEl.addEventListener("submit", submitScore);

// Try quiz again
btnTryAgain.addEventListener("click", restart);