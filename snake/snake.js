$(document).ready(function() {

var grid = {
  initialize: function() {
    var gameboard = this.buildArray(50, 30);
    var gridHtml = this.buildHtml(gameboard);
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
  position: [[20,20]],
  direction: 'e',

  changeDirection: function(keydownEvent) {
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
  }
};


grid.initialize();

$('body').keydown(function(evt) {
  snake.changeDirection(evt);
});

// end doc ready
});