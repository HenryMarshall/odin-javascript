function greet(gender, age, name) {
  var salutation = gender === 'male' ? 'Mr. ' : 'Ms. ';
  return (age > 25)
         ? 'Hello, ' + salutation + name
         : 'Hey, ' + name;
}

console.log(greet('female', 20, 'Mary'));

// Currying is where you use a function that returns another function with some
// vars already set.

// Note the order of args. The first arg of the bind function sets the this
// value. When you call this function the arg you pass will go to the end of the
// function curried.
var greetAnAdultMale = greet.bind(null, 'male', 45);
console.log(greetAnAdultMale("John Hartlove"));

var greetAYoungster = greet.bind(null, '', 16);
console.log(greetAYoungster('Emma Waterloo'));