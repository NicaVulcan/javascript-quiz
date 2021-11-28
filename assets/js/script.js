// Define global variables
var timeInterval = "";
var timerEl = document.querySelector("#timer");
var mainPageEl = document.querySelector("#start-quiz");
var questionPageEl = document.querySelector("#question-page");
var gameOverEl = document.querySelector("#game-over");
var btnBeginQuiz = mainPageEl.querySelector("#begin");
var questionHeading = questionPageEl.querySelector("#question");
var answersEl = questionPageEl.querySelector("#answer-choices");
var formEl = gameOverEl.querySelector("form");
var scoreboardPageEl = document.querySelector("#scoreboard");
var btnTryAgain = scoreboardPageEl.querySelector("#try-again");
var timeLeft = 59;
var qIndex = 0;
var score = 0;
var savedScoresArr = [];
var scoreboard;

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
        answerChoices: ["An object-oriented scripting language.", "A low-level programming language.", "A scripting language precompiled in the browser.", "A compiled scripting language."],
        answerCorrect: "An object-oriented scripting language."
    },
    {
        question: "Using _____ statements is how you test for specific conditions.",
        answerChoices: ["Select", "If", "Switch", "For"],
        answerCorrect: "If"
    },
    {
        question: "What is meant by the keyword 'this' in javascript?",
        answerChoices: ["It refers to the previous object", "It is a variable which contains value", "It refers to the current object", "None of the above"],
        answerCorrect: "It refers to the current object"
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
scoreboardPageEl.style.display = "none";

// Start Quiz
var startQuiz = function () {

    mainPageEl.style.display = "none";
    questionPageEl.style.display = "block";

    countdown();
    showQuestion();
};


// Countdown
var countdown = function () {

    timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft + "s";
        timeLeft--;

        if (timeLeft === 0) {
            timerEl.textContent = "Time's Up";
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
        answerChoice.className = "answer-choice";
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

    qIndex++

    // If questions remaining on index, remove answer choices and show next question and respective answer choices, otherwise end game
    if (qIndex < questions.length) {
        while (answersEl.firstChild) {
            questionHeading.textContent = "";
            answersEl.removeChild(answersEl.firstChild);
        };

        showQuestion();
    } else {
        gameOver();
        return;
    };
};

// Game over, save score
var gameOver = function () {
    clearInterval(timeInterval);
    timerEl.textContent = "Good Job!";
    questionPageEl.style.display = "none";
    gameOverEl.style.display = "block";
    score = score + timeLeft;

    // Display current score
    var displayScoreEl = gameOverEl.querySelector("#your-score");
    displayScoreEl.textContent = "YOUR SCORE: " + score;

    return score;
};

// Save score
var submitScore = function (event) {
    event.preventDefault();

    var initialsSave = gameOverEl.querySelector("#initials").value;

    scoreboard = JSON.parse(localStorage.getItem("score")) || [];
    // savedScoresArr.push(scoreboard);
    // console.log(savedScoresArr);

    // Save initial and score pair as an object and push to savedScoresArr
    var scoreObj = {
        initial: initialsSave,
        score: score
    };
    console.log(scoreObj);
    scoreboard.push(scoreObj);

    // Stringify array for local storage
    localStorage.setItem("score", JSON.stringify(scoreboard));

    gameOverEl.style.display = "none";
    scoreboardPageEl.style.display = "block";

    loadScore();
};

// Retrieve score and display on scoreboard
var loadScore = function () {
    if (!savedScoresArr) {
        return false;
    }

    var scoreTableBody = scoreboardPageEl.querySelector("#score-table-body");
    scoreboard = JSON.parse(localStorage.getItem("score")) || [];

    //create table row per each saved score object
    for (var i = 0; i < scoreboard.length; i++) {
        var scoreTableRow = document.createElement("tr");
        scoreTableBody.appendChild(scoreTableRow);
        var tableDataInitials = document.createElement("td");
        var tableDataScore = document.createElement("td");
        tableDataInitials.textContent = scoreboard[i].initial;
        tableDataScore.textContent = scoreboard[i].score;
        scoreTableRow.appendChild(tableDataScore);
        scoreTableRow.appendChild(tableDataInitials);
    }
};


// Restart game by refreshing page
var restart = function () {
    document.location.reload(false);
};

// Click 'begin' button starts quiz
btnBeginQuiz.addEventListener("click", startQuiz);

// Submit score
formEl.addEventListener("submit", submitScore);

// Try quiz again
btnTryAgain.addEventListener("click", restart);