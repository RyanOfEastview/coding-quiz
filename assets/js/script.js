const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

//countdown variables
var seconds = 60;
var timer;

//countdown function has been commented out as it was affecting overall performance of application
// function countdown () {
//     // could not figure out this function
//     if(seconds = <= 60) {
//         document.getElementById("countdown").innerHTML = seconds;
//     }
//         if (seconds >0) {
//             seconds--;
//         } else {
//             clearInterval(countdown);
//    //TUTOR!! //goes to high-scores page when timer ends        
//         }
// }

//     //TUTOR!! click event to start countdown
// document.getElementById("countdown").onclick = function() {
//     if(!countdown) {
//         timer = window.setInterval(function(){
//             countdown();
//         }, 1000);
//     }
// }

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Question array
let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Tag Markup Language",
        choice2: "Hyper Text Markup Language",
        choice3: "Hyperlinks Text Mark Language",
        choice4: "Hyperlinking Text Marking Language?",
        answer: 2
    },
    {
        question: "Choose the correct HTML tag for the largest heading",
        choice1: "<heading>",
        choice2: "<h6>",
        choice3: "<head>",
        choice4: "<h1>",
        answer: 4
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alert('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alertBox('Hello World');",
        answer: 2
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choice1: "if(i===5)",
        choice2: "if i = 5",
        choice3: "if i = 5 then",
        choice4: "if i == 5 then",
        answer: 1
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onchange",
        choice2: "onmouseover",
        choice3: "onmouseclick",
        choice4: "onclick",
        answer: 4
    }
];
  
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    //function to start timer goes here

    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
//TUTOR!!        //highscores page not displaying
        return window.location.assign("high-scores.html");
    }
    questionCounter++;

    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
   
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"]; 
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if(classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
        

        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();