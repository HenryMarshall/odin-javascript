// We have two objects. One with a methods avg() that the first will borrow
var gameController = {
      scores:[20,34,55,46,77],
      avgScore:null,
      players:[
        { name:'Tommy', playerId:987, age:23 },
        { name:'Pau', playerId:87, age:33 }
      ]
    },

    appController = {
      scores:[900,845,809,950],
      avgScore:null,
      avg:function() {
        var sumOfScores = this.scores.reduce(function(prev, curr, idx, arr) {
          return prev + curr;
        });

        this.avgScore = sumOfScores / this.scores.length;
      }
    };

// Getting the this value to apply to the gameController with apply
appController.avg.apply(gameController, gameController.scores);
console.log("gameController.avgScore: ",gameController.avgScore);

// appController.avgScore has still not be defined
console.log("appController.avgScore: ",appController.avgScore);