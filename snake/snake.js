$(document).ready(function() {

var grid = {
  xDimension: undefined,
  yDimension: undefined,

  initialize: function(x,y) {
    var gameboard = this.buildArray(x,y),
        gridHtml = this.buildHtml(gameboard);
    this.xDimension = x;
    this.yDimension = y;
    $('#gameboard').append($(gridHtml));
  },

  buildArray: function(x, y) {
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
  }
};

var snake = {
  initialPosition: [[10,10]],
  position: undefined,
  direction: 'paused',

  initialize: function() {
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
        // You don't want a snake crashing into its own neck by trying to switch
        // to moving in the direct opposite direction if it is 2+ length.
        if (newDirection !== oppositeDirection || snake.position.length === 1) {
          snake.direction = newDirection;
          console.log(snake.direction);
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

    // add the newHead to the front and remove the tail
    this.position.unshift(newHead);
    this.position.pop();
  },

  didLose: function(grid) {
    var headX = snake.position[0][0],
        headY = snake.position[0][1];

    console.log(headX, headY, grid.xDimension, grid.yDimension);

    return (headX < 0 || headX > grid.xDimension || 
            headY < 0 || headY > grid.yDimension);
  }
};


grid.initialize(50,30);
snake.initialize();

$('body').keydown(function(evt) {
  snake.changeDirection(evt);
});

var heartbeat = setInterval(function(){
  snake.move();
  if (snake.didLose(grid)) {
    alert('you lost');
    clearInterval(heartbeat);
  } else {
    snake.render();
  };
}, 200);

// end doc ready
});