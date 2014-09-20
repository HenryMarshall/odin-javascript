function finder(records, callback) {
  setTimeout(function() {
    records.push(3,4);
    callback(records);
  }, 1000);
}
function processor(records, callback) {
  setTimeout(function() {
    records.push(5,6);
    callback(records);
  }, 1000);
}

// Use these functions in a nested callback
finder([1,2], function(records) {
  processor(records, function(records) {
    console.log(records);
  });
});

// Alternatively, pass references instead of anonymous inner functions
function onProcessorDone(records) {
  console.log(records);
}

function onFinderDone(records) {
  processor(records, onProcessorDone);
}

finder([1,2], onFinderDone);
