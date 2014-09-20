// To preserve the 'this' context we must modify the callback. Failing to do so
// causes 'this' to piont to the global window object if passed a global
// function or the object containging method

var ClientData = {
      id: 58008,
      fullName: 'Not set',
      setUsername: function(firstName, lastName) {
        // this refers to the fullName property in this object
        this.fullName = firstName + ' ' + lastName;
      }
};

function getUserInput(firstName, lastName, callback) {
  // do stuff to validate first/last names

  // Save the names
  callback(firstName, lastName);
}

// This is the unintended behavior. It misbehaves because ClientData is part of
// the global object.
getUserInput('Henry', 'Baughman', ClientData.setUsername);
console.log(ClientData.fullName);   // Not set
console.log(window.fullName);       // Henry Baughman


// Reset window.fullName
fullName = undefined;

function getUserInputApply(firstName, lastName, callback, callbackObj) {
  // do stuff to validate

  // Save the names
  callback.apply(callbackObj, [firstName, lastName]);
}

getUserInputApply('Joe', 'Blo', ClientData.setUsername, ClientData);
console.log(ClientData.fullName);   // Joe Blo
console.log(window.fullName);       // undefined
