
// define operations of the calculator
var calcOp = {
  "add":      function(x,y) { return x + y; },
  "subtract": function(x,y) { return x - y; },
  "multiply": function(x,y) { return x * y; },
  "divide":   function(x,y) { return x / y; },

  "clearState": function(clearDisplay) {
    console.log('Clearing');
    calcState.buffer = '';
    calcState.operation = null;
    calcState.firstValue = null;

    // We want to clear state, but retain display if called as part of #equal
    if (clearDisplay) {
      calcOp.display(calcState.buffer);
    };
  },
  "display": function(number) {
    $('input').val(number);
  }
};

var calcState = {
  "buffer": '',
  "operation": null,
  "firstValue": null
};

$('td').click(function(){

  var dataFunction = $(this).attr('data-function');

  switch (dataFunction) {
    case 'clear':
      calcOp.clearState(true);
      break;

    case 'number':
      calcState.buffer += $(this).text();
      calcOp.display(calcState.buffer);
      break;

    case 'operation':
      calcState.firstValue = Number(calcState.buffer);
      calcState.buffer = '';
      calcState.operation = $(this).attr('data-operation');
      break;

    case 'equal':
      var secondValue = Number(calcState.buffer);
      var answer = calcOp[calcState.operation] (calcState.firstValue,
                                                        secondValue);
      calcOp.display(answer);

      calcOp.clearState(false);
      break;

  }

});