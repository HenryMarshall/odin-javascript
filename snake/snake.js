$(document).ready(function() {


function buildArray (x, y) {
  var grid = [];
  for (var i = y - 1; i >= 0; i--) {
    var row = [];
    for (var j = x - 1; j >= 0; j--) {
      row.push(' ');
    };
    grid.push(row);
  };
  return grid;
}

function buildHtml (gameboard) {
  var gridHtml = '';
  gameboard.forEach(function(row) {
    var rowHtml = '<div class="row">';
    row.forEach(function() {
      rowHtml += '<span class="cell"></span>';
    });
    rowHtml += '</div>';
    gridHtml += rowHtml;
  });
  return gridHtml;
}


var gameboard = buildArray(50, 30);
var gridHtml = buildHtml(gameboard);
$('#gameboard').append($(gridHtml));


// end doc ready
});