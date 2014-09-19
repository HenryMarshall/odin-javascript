// this is the jquery module pattern

(function($) {
  $.jPanelMenu = function(options) {
    var jpm = {
          // This pattern merges the passed options and defaults
          options: $.extend({
            'animated': true,
            'duration': 500,
            'direction': 'left'
          }, options),
          openMenu: function() {
            // do stuff
            this.setMenuStyle();
          },
          closeMenu: function() {
            // do other stuff
            this.setMenuStyle();
          },
          setMenuStyle: function() {
            // yet more stuff
          }
    };

    // Expose an API
    return {
      open: jpm.openMenu,
      close: jpm.closeMenu,
      someComplexMethod: function() {}
    };
  };
})(jQuery);

// Set options when initializing
var jpm = $.jPanelMenu({
  duration: 1000
});

// Exploit the api
jpm.open();