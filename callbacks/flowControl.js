// This uses the async.js library



// ----  ----

function finder(records, callback) {
  setTimeout(function() {
    records.push(3,4);
    // The first arg is the error if one occurs (null if no error).
    callback(null, records);
  }, 1000);
}

function processor(records, callback) {
  setTimeout(function() {
    records.push(5,6);
    callback(null, records);
  }, 1000);
}

// ???
async.watterfall([
  function(callback) {
    finder([1,2], callback);
  },
  // Just passing 'processor' is possible becasue "we are using the Node
  // continuation style"
  processor,
  function(records, callback) {
    alert(records);
  }
]);

// Or slightly more convoluted (lol), but processing from top to bottom
async.waterfall([
  function(callback) {
    finder([1,2], function(records) {
      callback(null, records);
    });
  },

  function(records, callback) {
    processor(records, function(records) {
      callback(null, records);
    });
  },
  function(records, callback) {
    alert(records);
  }
]); 