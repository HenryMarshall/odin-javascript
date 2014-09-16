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