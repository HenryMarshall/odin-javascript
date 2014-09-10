
// define operations of the calculator
var calcOperations = {
  "add":      function(x,y) { return x + y; },
  "subtract": function(x,y) { return x - y; },
  "multiply": function(x,y) { return x * y; },
  "divide":   function(x,y) { return x / y; }
};

var calcState = {
  "buffer": '',
  "operation": null,
  "firstValue": null,
  "secondValue": null
};

function buildBuffer (elem, buffer) {
  var number = $(elem).text();
  return buffer + number;
};

function display (number) {
  console.log(number);
  $('input').val(number);
};

$('td').click(function(){

  var dataFunction = $(this).attr('data-function');

  switch (dataFunction) {
    case 'clear':
      calcState.buffer = '';
      calcState.firstValue = null;
      calcState.operation = null;
      break;

    case 'number':
      calcState.buffer = buildBuffer(this, calcState.buffer);
      display(Number(calcState.buffer));
      break;

    case 'operation':
      calcState.firstValue = Number(calcState.buffer);
      calcState.buffer = '';
      calcState.operation = $(this).attr('data-operation');
      break;

    case 'equal':
      var secondValue = Number(calcState.buffer);
      calcState.buffer = '';
      var answer = calcOperations[calcState.operation] (calcState.firstValue,
                                                        secondValue);
      display(answer);

      // not DRY -- should call clear internally
      calcState.buffer = '';
      calcState.firstValue = null;
      calcState.operation = null;
      break;

  }

});