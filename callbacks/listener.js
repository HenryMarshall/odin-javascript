var finder = {
      run: function(records) {
        var self = this;
        setTimeout(function() {
          records.push(3,4);
          // common synonyms for trigger are 'fire' and 'publish'
          self.trigger('done', [records]);
        }, 1000);
      }
    },

    processor = {
      run: function(records) {
        var self = this;
        setTimeout(function() {
          records.push(5,6);
          self.trigger('done', [records]);
        }, 1000);
      }
    },

    // A mixin object with the listener behavior (uses jQuery)
    // Also consider using bean.js -- https://github.com/fat/bean
    eventable = {
      on: function(evt, callback) {
        // synonyms for 'on' are 'bind', 'listen', 'addEventListener', 'observe'
        $(this).on(evt, callback);
      },
      trigger: function(evt, args) {
        $(this).trigger(evt, args);
      }
    };

// Not quite sure how this bit works...
$.extend(finder, eventable);
$.extend(processor, eventable);

// Using our listeners
finder.on('done', function(evt, records) {
  processor.run(records);
});
processor
  .on('done', function(evt, records) {
    console.log(records);
  })
  .on('done', function(evt, records) {
    // do some other stuff
  });

finder.run([1,2]);