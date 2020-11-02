/* jshint esversion:6 */

var quizQuestions = [
  {question: "How many declensions does Latin have?",
   answer_a: " 1",
   answer_b: " 3",
   answer_c: " 5",
   answer_d: " 7",
   correct:  "option-c"},
  {question: "How many verb conjugations does Latin have?",
   answer_a: " 2",
   answer_b: " 4",
   answer_c: " 5",
   answer_d: " 6",
   correct:  "option-b"},
  {question: "How many verbs are in the phrase: Veni, vidi, vici?",
   answer_a: " 0",
   answer_b: " 1",
   answer_c: " 2",
   answer_d: " 3",
   correct:  "option-d"},
  {question: "What is the infinitive form of 'to be'?",
   answer_a: " sum",
   answer_b: " esse",
   answer_c: " est",
   answer_d: " sunt",
   correct:  "option-b"},
  {question: "How much is 'viginti'?",
   answer_a: " 20",
   answer_b: " 25",
   answer_c: " 5",
   answer_d: " 50",
   correct:  "option-a"}
];

let QUIZ = {
  quizstarted: false,
  quizIndex: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// generate start screen HTML string
/*  <div class="welcome">
      <p>Welcome to the Latin Quiz!</p>
    </div>
    <form>
      <button class="js-startButton">Start Quiz</button>
    </form> */
function generateStartString() {
  console.log("Generating start screen");

  let startString = '<div class="welcome"><p>Welcome to the Latin Quiz!</p></div><form><button class="js-startButton">Start Quiz</button></form>';

  return startString;
}

/*  <div class="welcome">
      <p>Good Job!</p>
    </div>
    <form>
      <button class="js-restartButton">Restart Quiz</button>
      <label class = "score">---SCORE---</label>
    </form> */
function generateEndString() {
  console.log("Generating End String");
  let scoreString = generateScoreString();
  
  let endString = '<div class="welcome"><p>Good Job!</p></div><form><button class="js-restartButton">Restart Quiz</button><label class = "score">' + scoreString + '</label></form>';
  return endString;
}
function generateScoreString() {
  let scoreString = 'Score: ' + QUIZ.score + '/' + quizQuestions.length + ' Correct';
  return '<label class = "js-score">' + scoreString + '</label>';
}
// convert questions array to HTML string
/*  <div class="question">
      <p>Question 1: What is 1+1?</p>
    </div>
    <form>
      <fieldset>
        <legend>Answers:</legend>
        <div class="answers">
          <div class="option-a">
          <input id="option-a" name="answer" type="radio" value="option-a">
          <label for="option-a">A. 0</label></div><br>

          <div class="option-b">
          <input id="option-b" name="answer" type="radio" value="option-b">
          <label for="option-b">B. 1</label></div><br>

          <div class="option-c">
          <input id="option-c" name="answer" type="radio" value="option-c">
          <label for="option-c">C. 2</label></div><br>

          <div class="option-d">
          <input id="option-d" name="answer" type="radio" value="option-d">
          <label for="option-d">D. 3</label></div><br>
          </div>
          <button class="js-submit-question">Submit</button>
          <label class="score">---SCORE STRING---</label>
      </fieldset>
    </form> */
function generateQuestionString(quiz, questionObject) {
  console.log("Generating question string");
  let scoreString = generateScoreString();
  return `<div class="question">
        <p> ${quiz.quizIndex+1}. ${questionObject.question}</p>
        </div>
        <form>
          <fieldset>
            <legend>Answers:</legend>
            <div class="answers">
              <div class="option-a">
                <input id="option-a" name="answer" type="radio" value="option-a">
                <label for="option-a"> ${questionObject.answer_a} </label>
              </div>
              <br>
              <div class="option-b">
                <input id="option-b" name="answer" type="radio" value="option-b">
                <label for="option-b"> ${questionObject.answer_b} </label>
              </div>
              <br>
              <div class="option-c">
                <input id="option-c" name="answer" type="radio" value="option-c">
                <label for="option-c"> ${questionObject.answer_c} </label>
              </div>
              <br>
              <div class="option-d">
                <input id="option-d" name="answer" type="radio" value="option-d">
                <label for="option-d"> ${questionObject.answer_d} </label>
              </div>
              <br>
            </div>
            <button class="js-submit-question">Submit</button> ${scoreString} </fieldset></form>`;
}

function generateQuestionScreen(questionsIndex) {
  console.log("Generating specific Question " + questionsIndex);
  let questionScreen = generateQuestionString(QUIZ, quizQuestions[questionsIndex]);

  return questionScreen;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

//render screen strings
function renderScreen(screenString) {
  console.log("Rendering screen");
  $("main").html(screenString);
}

function render() {

  if(QUIZ.quizstarted === false) {
    renderScreen(generateStartString() );
  }
  else if(QUIZ.quizIndex < quizQuestions.length) {
    renderScreen( generateQuestionScreen(QUIZ.quizIndex) );
  }
  else {
    renderScreen( generateEndString() );
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
// handle start button
function handleStartButton() {
  $('body').on('click', '.js-startButton', event => {

    QUIZ.quizstarted = true;
    QUIZ.score = 0;
    QUIZ.quizIndex = 0; // make sure to start on question 1

    renderScreen( generateQuestionScreen(QUIZ.quizIndex) );
  } );
}

// handle start button
function handleRestartButton() {
  $('body').on('click', '.js-restartButton', event => {

    renderScreen( generateStartString() ); // go back to start screen
  } );
}

//handle next-question-button
// <button class="js-submit-question">Submit</button>
function handleNextQuestion() {
  $('body').on('click', '.js-next-question', event => {
    QUIZ.quizIndex++;

    render(); 
  });
}

// handle answers
function handleAnswers(buttonValue) {

  //replace the submit button with "Next" button
  let newButtonString = '<button class="js-next-question">Next</button>';
  $(".js-submit-question").replaceWith(newButtonString);

  let correctAnswer = quizQuestions[QUIZ.quizIndex].correct;

  if(buttonValue === correctAnswer) { // correct answer
    QUIZ.score++;
    let newScore = generateScoreString();
    $(".js-score").replaceWith(newScore);
  }
  
  // add correct class to correct answer
  let correctAnswerDiv = "div ." + correctAnswer;
  $('main').find(correctAnswerDiv).toggleClass("js-correct");
}

// handle submit button
function handleSubmitButton() {
  $('body').on('click', '.js-submit-question', event => {

    // check answer
    let userAnswer = $('input[name="answer"]:checked').val();
    handleAnswers(userAnswer); // returns True or False
  } );
}

// callback function to handle all screens / quiz
$(function() {
  render();
  handleNextQuestion();
  handleRestartButton();
  handleStartButton();
  handleSubmitButton();

});