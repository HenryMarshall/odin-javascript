console.log(Math.max(23, 11, 34, 56));        // 56

numbers = [23, 11, 34, 56];
console.log(Math.max(numbers));               // NaN

// first arg sets 'this', which in this case is unused
console.log(Math.max.apply(null, numbers));   // 56

// CUSTOM EXAMPLE

var students = ['Peter', 'Michael', 'Judy', 'Malcolm'];

// no number of args defined as ANY number are accepted
function welcomeStudents() {
  var args = Array.prototype.slice.call(arguments);

  var lastItem = args.pop();
  console.log('Welcome ' + args.join(', ') + ', and ' + lastItem + '.');
};

welcomeStudents.apply(null, students);
