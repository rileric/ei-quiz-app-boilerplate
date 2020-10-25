/* jshint esversion:6 */

let quizQuestions = [
  {question: "How many declensions does Latin have?",
   answer_a: " 1",
   answer_b: " 3",
   answer_c: " 5",
   answer_d: " 7",
   correct:  "option_c"},
  {question: "How many verb conjugations does Latin have?",
   answer_a: " 2",
   answer_b: " 4",
   answer_c: " 5",
   answer_d: " 6",
   correct:  "option_b"},
  {question: "How many verbs are in the phrase: Veni, vidi, vici?",
   answer_a: " 0",
   answer_b: " 1",
   answer_c: " 2",
   answer_d: " 3",
   correct:  "option_d"},
  {question: "What is the infinitive form of 'to be'?",
   answer_a: " sum",
   answer_b: " esse",
   answer_c: " est",
   answer_d: " sunt",
   correct:  "option_b"},
  {question: "How much is 'viginti'?",
   answer_a: " 20",
   answer_b: " 25",
   answer_c: " 5",
   answer_d: " 50",
   correct:  "option_a"}
];

const QUIZ = {
  questions: quizQuestions, // point to array above
  quizstarted: false,
  quizIndex:0,
  totalQuestions: quizQuestions.length, // dynamic!
  score: 0

   // matches the radio button values
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
      <button type="submit" class="js-startButton">Start Quiz</button>
    </form> */
function generateStartString() {
  console.log("Generating start screen");

  let startString = '<div class="welcome"><p>Welcome to the Latin Quiz!</p></div><form><button type="submit" class="js-startButton">Start Quiz</button></form>';

  return startString;
}

/*  <div class="welcome">
      <p>Good Job!</p>
    </div>
    <form>
      <button type="submit" class="js-restartButton">Restart Quiz</button>
      <label class = "score">---SCORE---</label>
    </form> */
function generateEndString() {
  console.log("Generating End String");
  let scoreString = generateScoreString(QUIZ);
  
  let endString = '<div class="welcome"><p>Good Job!</p></div><form><button type="submit" class="js-restartButton">Restart Quiz</button><label class = "score">' + scoreString + '</label></form>';
  return endString;
}
function generateScoreString(quiz) {
  return 'Score: ' + quiz.score + '/' + quiz.totalQuestions + 'Correct';
}
// convert questions array to HTML string
/*  <div class="question">
      <p>Question 1: What is 1+1?</p>
    </div>
    <form>
      <fieldset>
        <legend>Answers:</legend>
        <div class="answers">
          <input id="option-a" name="answer" type="radio" value="option-a">
          <label for="option-a">A. 0</label><br>

          <input id="option-b" name="answer" type="radio" value="option-b">
          <label for="option-b">B. 1</label><br>

          <input id="option-c" name="answer" type="radio" value="option-c">
          <label for="option-c">C. 2</label><br>

          <input id="option-d" name="answer" type="radio" value="option-d">
          <label for="option-d">D. 3</label><br>
          </div>
          <button type="submit" class="js-submit-question">Submit</button>
          <label class="score">---SCORE STRING---</label>
      </fieldset>
    </form> */
function generateQuestionString(quiz, questionObject) {
  console.log("Generating question string");
  let scoreString = generateScoreString(quiz);
  return ('<div class="question"><p>${questionObject.question}</p></div><form><fieldset><legend>Answers:</legend><div class="answers"><input id="option-a" name="answer" type="radio" value="option-a"><label for="option-a">${questionObject.answer_a}</label><br><input id="option-b" name="answer" type="radio" value="option-b"><label for="option-b">${questionObject.answer_b}</label><br><input id="option-c" name="answer" type="radio" value="option-c"><label for="option-c">${questionObject.answer_c}</label><br><input id="option-d" name="answer" type="radio" value="option-d"><label for="option-d">${questionObject.answer_d}</label><br></div><button type="submit" class="js-submit-question">Submit</button><label class = "score">' + scoreString + '</label></fieldset></form>');
}

function generateQuestionScreen(questionsIndex) {
  console.log("Generating specific Question " + questionsIndex);
  let questionScreen = generateQuestionString(QUIZ, QUIZ.questions[questionsIndex]);

  return questionScreen;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

//render screen strings
function renderScreen(screenString) {
  console.log("Rendering screen");
  $("main").html(screenString);
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
// handle start button
function handleStartButton() {
  $("main").on('click', '.js-startButton', event => {

    console.log("Start Button clicked");
    event.preventDefault();

    QUIZ.quizstarted = true;
    QUIZ.quizIndex = 0; // make sure to start on question 1

    renderScreen( generateQuestionScreen(QUIZ, QUIZ.quizQuestions[QUIZ.quizIndex]) );
  } );
}

// handle start button
function handleRestartButton() {
  $("main").on('click', '.js-restartButton', event => {

    console.log("Restart Button clicked");
    event.preventDefault();

    renderScreen( generateStartString() ); // go back to start screen
  } );
}

//handle next-question-button
// <button type="submit" class="js-submit-question">Submit</button>
function handleNextQuestion(quiz) {
  $("main").on('submit', '.js-next-question', event => {
    QUIZ.quizIndex++;

    if(QUIZ.quizIndex < QUIZ.totalQuestions) { // if there are still questions
      renderScreen(generateQuestionScreen(QUIZ.quizIndex) );
    } else {
      renderScreen(generateEndString() );
    }
    
  });
}

// handle answers
function handleAnswers(quiz, buttonValue) {

  //replace the submit button with "Next" button
  let newButtonString = '<button type="submit" class="js-next-question">Next</button>'
  $("button .js-submit-question").replaceWith(newButtonString);


  if(buttonValue === QUIZ.quizQuestions[quiz.quizIndex].correct) { // correct answer
    quiz.score++;
  }

  // add correct class to correct answer
  let correctAnswerId = '#' + QUIZ.quizQuestions[quiz.quizIndex].correct;
  $('main').find(correctAnswerId).toggleClass("js-correct");
}

// handle submit button
function handleSubmitButton() {
  $("main").on('submit', '.js-submit-question', event => {

    console.log("Submit Button clicked");
    event.preventDefault();

    // check answer
    let userAnswer = $('input[name="answer"]:checked').val();
    handleAnswers(QUIZ, userAnswer); // returns True or False
  } );
}

// callback function to handle all screens / quiz
$(function() {
  renderScreen(generateStartString() );
});