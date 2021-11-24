// Define global variables
var timerEl = document.querySelector("#timer");
var mainPageEl = document.querySelector("#start-quiz");
var questionPageEl = document.querySelector("#question-page");
var gameOverEl = document.querySelector("#game-over");
var btnBeginQuiz = mainPageEl.querySelector("#begin");
var questionHeading = questionPageEl.querySelector("#question");
var answerChoiceList = questionPageEl.querySelector("#answer-choices");
var choiceA = questionPageEl.querySelector("#choice-a")
var choiceB = questionPageEl.querySelector("#choice-b")
var choiceC = questionPageEl.querySelector("#choice-c")
var choiceD = questionPageEl.querySelector("#choice-d")
var qIndex = 0;

// Questions array
var questions = [
    {
        question: "What is the correct JavaScript syntax to write 'Hello World'?",
        answerChoices: ["System.out.println('Hello World')", "println ('Hello World')", "document.write('Hello World')", "response.write('Hello World')"],
        answerCorrect: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answerChoices: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answerCorrect: 3
    },
    {
        question: "Which of the following best describes JavaScript?",
        answerChoices: ["an object-oriented scripting language.", "a low-level programming language.", "a scripting language precompiled in the browser.", "a compiled scripting language."],
        answerCorrect: 0
    },
    {
        question: "Using _____ statements is how you test for specific conditions.",
        answerChoices: ["Select", "If", "Switch", "For"],
        answerCorrect: 1
    },
    {
        question: "What is meant by 'this' keyword in javascript?",
        answerChoices: ["It referes previous object", "It is variable which contains value", "It refers current object", "None of the above"],
        answerCorrect: 2
    },
    {
        question: "What would appear on the console if you were to type the following: 2 + 5 + '8'",
        answerChoices: ["78", "278", "7 + '8'", "15"],
        answerCorrect: 0
    },
]

// Only show main page 
questionPageEl.style.display = "none";
gameOverEl.style.display = "none";

// Countdown
var countdown = function () {
    var timeLeft = 10;

    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft + "s";
        timeLeft--;

        if (timeLeft == 0) {
            timerEl.textContent = "game over!"
            clearInterval(timeInterval);
            // } else if(gameOver == true) {
            //if all questions are answered, timer stops
        }
    }, 1000);
};

var showQuestion = function () {
    questionHeading.textContent = questions[qIndex].question;
    choiceA.textContent = questions[qIndex].answerChoices[0];
    choiceB.textContent = questions[qIndex].answerChoices[1];
    choiceC.textContent = questions[qIndex].answerChoices[2];
    choiceD.textContent = questions[qIndex].answerChoices[3];
    answerChoiceList.addEventListener("click", checkAnswer);

    qIndex++
};

var checkAnswer = function () {
    console.log("check");
    showQuestion();
};


// Start Quiz
var startQuiz = function () {
    mainPageEl.style.display = "none";
    questionPageEl.style.display = "block";

    countdown();
    showQuestion();
};

// Click 'begin' button starts quiz
btnBeginQuiz.addEventListener("click", startQuiz);