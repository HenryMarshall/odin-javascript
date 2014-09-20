$(document).ready(function() {

var grid = {
      xDimension: undefined,
      yDimension: undefined,

      initialize: function(x,y) {
        var gameboard = this.buildArray(x,y),
            gridHtml = this.buildHtml(gameboard);
        // FIXME: dimensions work iff backwards
        this.xDimension = y;
        this.yDimension = x;
        $('#gameboard').append($(gridHtml));
      },

      buildArray: function(x,y) {
        var grid = [];
        for (var i = y - 1; i >= 0; i--) {
          var row = [];
          for (var j = x - 1; j >= 0; j--) {
            row.push(' ');
          };
          grid.push(row);
        };
        return grid;
      },

      buildHtml: function(gameboard) {
        var gridHtml = '';
        gameboard.forEach(function(row, rowIdx) {
          var rowHtml = '<div class="row">';
          row.forEach(function(cell, cellIdx) {
            rowHtml += '<span class="cell" id="' + rowIdx + '-' + cellIdx +'"></span>';
          });
          rowHtml += '</div>';
          gridHtml += rowHtml;
        });
        return gridHtml;
      },
    },

    food = {
      position: undefined,

      initialize: function() {
        this.dropFood();
        this.render();
      },

      dropFood: function() {
        var foodX = Math.floor(Math.random() * grid.xDimension);
        var foodY = Math.floor(Math.random() * grid.yDimension);
        this.position = [foodX, foodY];
      },

      // FIXME: contains duplication of functionality in snake.render
      render: function() {
        $('.food').removeClass('food');
        var cellId = '#' + this.position[0] + '-' + this.position[1];
        $(cellId).addClass('food');

      }
    },

    snake = {
      initialPosition: [[10,10]],
      position: undefined,
      direction: 'paused',

      initialize: function() {
        this.direction = 'paused';
        // style guide's solution to duplicating arrays
        this.position = this.initialPosition.slice();
        this.render();
      },

      changeDirection: function(keydownEvent) {

        // only respond to arrow keys
        if ( 37 <= keydownEvent.keyCode && keydownEvent.keyCode <= 40) {

          var directions = ['w', 'n', 'e', 's'],
              newDirection = directions[keydownEvent.keyCode - 37],
              currentDirectionIndex = directions.indexOf(snake.direction),
              oppositeDirection = directions[(currentDirectionIndex + 2) % 4];

          if (newDirection !== snake.direction) {
            // You don't want a snake crashing into its own neck by trying to
            // switch to moving in the opposite direction if 2+ in length.
            if (newDirection !== oppositeDirection || snake.position.length === 1) {
              snake.direction = newDirection;
            };
          };
        };
      },

      render: function() {
        $('.snake').removeClass('snake');
        snake.position.forEach(function(segmentPosition) {
          var cellId = '#' + segmentPosition[0] + '-' + segmentPosition[1];
          $(cellId).addClass('snake');
        });
      },

      move: function() {
        var movementDirection = {
              w: [0,-1],
              n: [-1,0],
              e: [0,1],
              s: [1,0],
              paused: [0,0]
            },
            newHead = [
              this.position[0][0] + movementDirection[snake.direction][0],
              this.position[0][1] + movementDirection[snake.direction][1]
            ];

        if (this.isPositionFood(newHead)) {
          // dropFood() replaces existing food -- no need to destroy it
          food.dropFood();
          game.scorePoints();
          game.changeDifficulty(20);
        } else {
          this.position.pop();
        };
        // add the newHead to the front and remove the tail
        this.position.unshift(newHead);
      },

      isPositionFood: function(newHead) {
        return (food.position[0] === newHead[0] && 
                food.position[1] === newHead[1]);
      },

      didLose: function() {
        var headX = snake.position[0][0],
            headY = snake.position[0][1],
            touchEdge = (headX < 0 || headX > grid.xDimension -1 || 
                         headY < 0 || headY > grid.yDimension -1);

        return (touchEdge || this.touchSelf());
      },

      touchSelf: function() {
        var head = this.position[0],
            body = this.position.slice(1);
        for (var i = body.length - 1; i >= 0; i--) {
          if (head[0] === body[i][0] && head[1] === body[i][1]) {
            return true;
          };
        };
        return false;
      }
    },

    game = {
      heartbeatTimeout: 150,
      points: 0,

      initialize: function() {

        this.heartbeatTimeout = 150;
        this.points = 0;
        food.initialize();
        snake.initialize();

        $('body').keydown(function(evt) {
          snake.changeDirection(evt);
        });

        // intentionally a global variable
        this.gameInstance();

      },

      scorePoints: function() {
        this.points += 9 + snake.position.length;
        console.log("game.points: ",game.points);
        $('#points').text(this.points);
      },

      changeDifficulty: function(ms) {
        // 50ms per round is the highest difficulty
        if (this.heartbeatTimeout > 50 ) {
          this.heartbeatTimeout -= ms;
          clearInterval(gameInstance);

          this.gameInstance();
        }
      },

      runGame: function() {
        snake.move();
        if (snake.didLose()) {
          if (confirm('Play Again?')) {
            clearInterval(gameInstance);
            snake.direction = 'paused';
            game.initialize();
            this.gameInstance();
          } else {
            clearInterval(gameInstance);
          }
        } 
        else {

          food.render();
          snake.render();
        };
      },

      gameInstance: function() {
        // intentionally a global variable
        gameInstance = setInterval(game.runGame, game.heartbeatTimeout);
      }
    };

grid.initialize(50,30);
game.initialize();

// end of $(document).ready
});