// --- ALTERING A PROTOTYPE --- //

function PrintStuff (myDocuments) {
  this.documents = myDocuments;
};

var newObj = new PrintStuff('foo bar baz');

PrintStuff.prototype.print = function() {
  console.log(this.documents);
};

newObj.print();



// --- INHERITANCE --- //

function Plant() {
  this.country = 'Mexico';
  this.isOrganic = true;
}

// Add showNameAndColor method to Plant prototype property
Plant.prototype.showNameAndColor = function() {
  console.log("I am a " + this.name + " and my color is " + this.color);
};

Plant.prototype.amIOrganic = function() {
  var response = (this.isOrganic) ? 'Yuppers!' : 'Nope!';
  console.log(response);
};

function Fruit(fruitName, fruitColor) {
  this.name = fruitName;
  this.color = fruitColor;
}

// Set the Fruit's prototype to Plant's constructor, thus inheriting all of
// Plant.prototype methods and properties
Fruit.prototype = new Plant();

var aBanana = new Fruit('Banana', 'Yellow');
console.log(aBanana.name);   // Banana
aBanana.showNameAndColor();  // I am a Banana and my color is yellow

var aCarrot = new Plant();
aCarrot.showNameAndColor();  // I am a undefined and my color is undefined



// --- PROTOTYPE CHAIN --- //
function People() {
  this.superstar = 'Michael Jackson';
}

// Define 'athlete' property on the People prototype so that 'athlete' is
// accessible by all objects that use the People() constructor
People.prototype.athlete = 'Tiger Woods';

var famousPerson = new People();
famousPerson.superstar = 'Steve Jobs';

// The search for superstar for looks for the property on the famousPerson
// object. Finding it there the search stops
console.log(famousPerson.superstar);      // Steve Jobs

// The search for 'athlete' fails to find the property on the famousPerson
// object. It then moves up to the famousPerson prototype (People.prototype).
console.log(famousPerson.athlete);        // Tiger Woods

// Failing to find the `toString()` method in either the object itself or its
// prototype it moves up the the Object.prototype from which People inherited
console.log(famousPerson.toString());     // [object Object]

// Note that in ECMAScript 5 you can make a property read-only preventing over-
// writing like in the superstar example



