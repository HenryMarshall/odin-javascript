// Uses the promise library when.js -- https://github.com/cujojs/when

// hello world script from the docs
  // this also reqires rest -- https://github.com/cujojs/rest
var rest = require('rest');

fetchRemoteGreeting()
  .then(addExclamation)
  .catch(handleError)
  .done(function(greeting) {
    console.log(greeting);
  });

function fetchRemoteGreeting() {
  // returns a when.js promise for 'hello world'
  return rest('http://example.com/greeting');
}

function addExclamation(greeting) {
  return greeting + '!!!!!!';
}

function handleError(e) {
  return 'drat!';
}


// ---- SECOND EXAMPLE ----


var when = require('when'),
    rest = require('rest');

when.reduce(when.map(getRemoteNumberList(), times10), sum)
    .done(function(result) {
      console.log(result);
    });

function getRemoteNumberList() {
  // Get a remote array [1,2,3,4,5]
  return rest('http://example.com/numbers').then(JSON.parse);
}

function sum(x,y) { return x + y; };
function times10(x) { return x * 10; };


// ---- FROM ARTICLE ----
function finder(records) {
  var deferred = when.defer();
  setTimeout(function() {
    records.push(3,4);
    deferred.resolve(records);
  }, 500);
  return deferred.promise;
}
function processor(records) {
  var deferred = when.defer();
  setTimeout(function() {
    records.push(5,6);
    deferred.resolve(records);
  }, 500);
  return deferred.promise;
}

finder([1,2])
  // we can simply call processor because it returns a promise itself
  .then(processor)
  .then(function(records) {
    console.log(records);
  });