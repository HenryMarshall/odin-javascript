// this doesn't work in node; it must be run in the browser; visit ./apply.html

// global var for demonstration
var avgScore = 'global avgScore';

// global function
function avg (scores) {
  var sumOfScores = scores.reduce(function(prev, curr, idx, arr) {
    return prev + curr;
  });

  // 'this' will be bound to the global obj unless we set it with call or apply
  this.avgScore = sumOfScores / scores.length;
}

var gameController = {
  scores: [20, 34, 55, 46, 77],
  avgScore: null
};

// If we execute the avg function thus, 'this' inside the function is bound to
// the global window object
avg (gameController.scores);
// Proof
console.log("avgScore: ",avgScore);
console.log("gameController.avgScore: ",gameController.avgScore);

// reset global avgScore
avgScore = 'global avgScore';

// to set 'this' explicitly so that it is bound to gameController we use call()
avg.call (gameController, gameController.scores);

console.log("avgScore: ",avgScore);
console.log("gameController.avgScore: ",gameController.avgScore);