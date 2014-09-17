function User (theName, theEmail) {
  this.name = theName;
  this.email = theEmail;
  this.quizScores = [];
  this.currentScore = 0;
};

User.prototype = {
  constructor: User,
  saveScore: function (theScoreToAdd) {
    this.quizScores.push(theScoreToAdd);
  },
  showNameAndScores: function () {
    var scores = this.quizScores.length > 0
               ? this.quizScores.join(',')
               : "No scores yet";
    return this.name + " Scores: " + scores;
  },
  changeEmail: function (newEmail) {
    this.email = newEmail;
    return "New Email Saved: " + this.email;
  }
};

// A User
firstUser = new User('Richard', 'richard@example.com');
console.log(firstUser.changeEmail('richard_b@example.com'));
firstUser.saveScore(15);
firstUser.saveScore(10);
console.log(firstUser.showNameAndScores());

// Another User
secondUser = new User('Peter', 'peter@example.com');
secondUser.saveScore(18);
console.log(secondUser.showNameAndScores());


// --------- //

function inheritPrototype(childObject, parentObject) {
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
  childObject.prototype = copyOfParent;
}

function Question(theQuestion, theChoices, theCorrectAnswer) {
  this.question = theQuestion;
  this.choices = theChoices;
  this.theCorrectAnswer = theCorrectAnswer;
  this.userAnswer = '';

  // private properties: these cannot be changed by instances
  var newDate = new Date(),
      QUIZ_CREATED_DATE = newDate;

  // This is the only way to access QUIZ_CREATED_DATE.
  // This is an example of a privilege method: it can access private properties,
  // and itself be called publically.
  this.getQuizDate = function() {
    return QUIZ_CREATED_DATE.toLocaleDateString();
  };

  // Confirm the quiz was created.
  console.log('Quiz created on: ' + this.getQuizDate());

  // Define the prototype methods that will be inherited.
  Question.prototype.getCorrectAnswer = function() {
    return this.correctAnswer;
  };

  Question.prototype.getUserAnswer = function() {
    return this.userAnswer;
  };

  Question.prototype.displayQuestion = function() {
    var questionToDisplay = '<div class="question">' + this.question
                          + '</div><ul>',
        choiceCounter = 0;

    this.choices.forEach(function(eachChoice) {
      questionToDisplay += '<li><input type="radio" name="choice" value="'
                        +  choiceCounter + '">' + eachChoice + '</li>';
      choiceCounter ++;
    });
    questionToDisplay += '</ul>';
    console.log(questionToDisplay);

  };

};

function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer) {
  Question.call(this, theQuestion, theChoices, theCorrectAnswer);

  // inherit the methos and properties from question
};

inheritPrototype(MultipleChoiceQuestion, Question);

function DragDropQuestion(theQuestion, theChoices, theCorrectAnswer) {
  Question.call(this, theQuestion, theChoices, theCorrectAnswer);
};

inheritPrototype(DragDropQuestion, Question);
// override the displayQuestion method it inherited
DragDropQuestion.prototype.displayQuestion = function() {
  // just return the question; implementation is beyond the scope of this app
  console.log(this.question);
};


// Test our inheritances
var allQuestions = [
  new MultipleChoiceQuestion("Who is the PM of England?",
                            ["Obama", "Blair", "Brown", "Cameron"], 3),
  
  new MultipleChoiceQuestion("What is the capital of Brazil?",
                            ["Sao Paulo", "Rio de Janiero", 'Brasilia'], 2),

  new DragDropQuestion('Drag the correct city to the world map.',
                      ['Washington DC', 'Rio de Janiero', 'Stockholm'], 0)
];

// Display all the questions
allQuestions.forEach(function(eachQuestion) {
  eachQuestion.displayQuestion();
});