// shut up my linter
var console,alert, $, document;

var foo = 1;
var bar = 2;
console.log( foo + bar ); // '12'
console.log( foo + Number(bar) ); // 3
// this uses the unary operator
// http://learn.jquery.com/javascript-101/operators/
console.log( foo + +bar ); // 3

// falsey values
var falsey = false;
var falsey = "";
var falsey = NaN;
var falsey = null;
var falsey = undefined;
var falsey = 0;

// truthy
var truthy = "0";
var truthy = [];
var truthy = {};

// switch statement
switch ( foo ) {
  case "bar":
    alert("bar");
    break;
  case "baz":
    alert("baz");
    break;
  default:
    alert("default");
    break;
}

// alternative to switch statements are single purpose objects
var switchAlternative = {
  "bar": function() {
    alert("bar");
  },
  "baz": function() {
    alert("baz");
  },
  "default": function() {
    alert("default");
  }
};

if (switchAlternative[ foo ]) {
  // this won't run
  switchAlternative[ foo ]();
} else {
  // this will run
  switchAlternative[ "default" ]();
}

// concatenate arrays
var myArray = [1,2,3];
var myOtherArray = [4,5,6];
var masterArray = myArray.concat(myOtherArray);

// immediately invoked function expression (iife)
// useful to prevent polluting the global namespace
(function(){
  var foo = "Hello world";
})();

// anonymous functions as arguments
var myFn = function(fn) {
  var result = fn();
  console.log(result);
};

myFn(function(){
  return "hello world";
});

// named functions as arguments
// include myFn from above

var myOtherFn = function() {
  return "hello world";
};

myFn(myOtherFn);



// this -- a fn invoked using Function.call()
var myObject = {
  sayHello: function() {
    console.log("Hi! My name is " + this.myName);
  },
  myName: "Rebecca"
};

var secondObject = {
  myName: "Colin"
};

myObject.sayHello();                  // Hi! My name is Rebecca
myObject.sayHello.call(secondObject); // Hi! My name is Colin


// this -- a fn created using Function.bind()
var myName = "the global object";
var sayHello = function() {
  console.log("Hi! My name is " + this.myName);
};
var myObject = {
  myName: "Rebecca"
};
var myObjectHello = sayHello.bind(myObject);

sayHello();       // "Hi! My name is the global object"
myObjectHello();  // "Hi! My name is Rebecca"


// this -- a fn being attached to an object at runtime
// include myName, sayHello, myObject from above
var secondObject = {
  myName: "Colin"
};
myObject.sayHello = sayHello;
secondObject.sayHello = sayHello;

sayHello();               // "Hi! My name is the global object"
myObject.sayHello();      // "Hi! My name is Rebecca"
secondObject.sayHello();  // "Hi! My name is Colin"

// -----

// types
/* when you access a primative type you work directly on its value
 * e.g., string, number, boolean, null, undefined
 */
var foo = 1;
var bar = foo;
foo = 2;
bar;              // 1

// when you access a complex type you work on a reference to its value
// e.g., object, array, function
var foo = [1,2];
var bar = foo;
foo[0] = 2;
bar;              // [2,2]


// use "FIXME: blah" to annotate problems
// use "TODO: blah" to annotate solutions

/*when attaching data payloads to events pass a hash instead of raw values this
lets you add more events without having to find and edit existing instances*/

// --- CUSTOM EVENTS ---
// this moves the switching functionality to the lighbulb

$('.lightbulb').on('changeState', function(e) {
  var light = $(this);
  if (light.hasClass('on')) {
    light.trigger('turnOff');
  } else {
    light.trigger('turnOn');
  }
}).on('turnOn', function(e) {
  $(this).removeClass('off').addClass('on');
}).on('turnOff', function(e) {
  $(this).removeClass('on').addClass('off');
});

$('.switch, .clapper').click(function() {
  $(this).parent().find('.lightbulb').trigger('changeState');
});

$('#masterSwitch').click(function() {
  if ($('.lightbulb.on').length) {
    $('.lightbulb').trigger('turnOff');
  } else {
    $('.lightbulb').trigger('turnOn');
  }
});

// args for custom events

$(document).on('myCustomEvent', {
  foo: 'bar'
}, function(event, arg1, arg2) {
  console.log(event.data.foo);    // 'bar'
  console.log(arg1);              // 'bim'
  console.log(arg2);              // 'baz'
});

$(document).trigger('myCustomEvent', ["bim", "baz"]);


// -----

// Find if property exists on an object
var school = { schoolName: 'MIT' };
console.log("schoolName" in school);                // true
console.log(school.hasOwnProperty("schoolName"));   // true

// toString is inherited
console.log("toString" in school);                  // true
console.log(school.hasOwnProperty("toString"));     // false

console.log("foo" in school);                       // false
console.log(school.hasOwnProperty("foo"));          // false


// to enumerate over an object use for in
var school = { schoolName:'MIT', schoolLocation:"MA" };
for (var eachItem in school) {
  console.log(eachItem);
}