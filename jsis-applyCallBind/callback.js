// Define an object with some properties and a method. We will later pass the
// method as a callback function to another method

var clientData = {
  id:58008,
  fullName: 'Not Set',
  setUserName: function(firstName, lastName) {
    // 'this' refers to the fullName property in this object
    this.fullName = firstName + ' ' + lastName;
  }
};

function getUserInput (firstName, lastName, callback, callbackObj) {
  // The use of the Apply method will set the 'this' value to callbackObj
  callback.apply(callbackObj, [firstName, lastName]);
}

// The clientData object will be used by the Apply method to set 'this'
getUserInput('Barack', 'Obama', clientData.setUserName, clientData);
console.log(clientData.fullName); // Barack Obama