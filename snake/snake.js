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
  direction: 'e'
};


grid.initialize();



// end doc ready
});