function genericPoemMaker(name, gender) {
  console.log(name + ' is finer than fine wine.');
  console.log('Altruistic noble for the modern time.');
  console.log('Always admirably adorned with the latest style.');
  console.log('A ' + gender + 'of unfortunate tragedies who still manages a perpetual smile');
}

function greeting(name, gender) {
  var title = (gender === 'man') ? 'Mr. ' : 'Ms. ';
  console.log('Hello, ' + title + name);
}

function getUserInput(firstName, lastName, gender, callback) {
  var fullName = firstName + ' ' + lastName;

  // Verify the callback is a function
  if (typeof callback === 'function') {
    callback(fullName, gender);
  }
}

getUserInput('Joe', 'Blo', 'man', genericPoemMaker);
getUserInput('Frank', 'Fuller', 'man', greeting);