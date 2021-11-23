// Define global variables
var timerEl = document.querySelector("#timer");
var mainPageEl = document.querySelector("#start-quiz");
var questionPageEl = document.querySelector("#question-page");
var gameOverEl = document.querySelector("#game-over");
var btnBeginQuiz = mainPageEl.querySelector("#begin");
var questionHeading = questionPageEl.querySelector("#question");
var answerChoiceList = questionPageEl.querySelector("#answer-choices");
var qIndex = 0;

// Questions array
var questions = [
    {
        question: "question 1",
        answerChoices: ["I'm", "on a", "highway", "to hell"],
        answerCorrect: "to hell"
    },
    {
        question: "question 2",
        answerChoices: ["for those", "about to", "rock", "we salute you"],
        answerOne: "for those",
        answerTwo: "about to",
        answerThree: "rock",
        answerCorrect: "we salute you"
    },
    {
        question: "question 3",
        answerChoices: ["you", "shook me", "all night", "long"],
        answerCorrect: "long"
    },
    {
        question: "question 4",
        answerChoices: ["TNT I'm dynamyte", "TNT and I'll win the fight", "TNT I'm a powerload", "TNT watch me explode"],
        answerCorrect: "TNT watch me explode"
    },
    {
        question: "question 5",
        answerChoices: ["let there be lignt", "sound", "drums, guitar", "let there be rock"],
        answerCorrect: "let there be rock"
    },
    {
        question: "question 6",
        answerChoices: ["dirty deeds", "done", "dirt", "cheap"],
        answerCorrect: "cheap"
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

// Add questions 
// var askQuestions = function () {
//     var i = 0;

//     for (var i = 0; i < 6; i++) {
//         var currentQuestion = questions[i];
//         questionHeading.textContent = currentQuestion.question;
//         console.log("this is " + currentQuestion.question);
//         for (var questionIndex = 0; questionIndex < currentQuestion.answerChoices.length; questionIndex++) {
//             var choices = currentQuestion.answerChoices[questionIndex];
//             var choiceEl = document.createElement("li");
//             choiceEl.innerText = choices;
//             console.log(choices);
//             answerChoiceList.appendChild(choiceEl);
//         }
//         answerChoiceList.addEventListener("click", checkAnswer);
//     }
// };

var showQuestion = function () {
    questionHeading.textContent = questions[qIndex].question;
    answerChoiceList.addEventListener("click", checkAnswer);
    qIndex++
}

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