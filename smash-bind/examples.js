// CLICK HANDLER

var logger = {
  x: 0,
  updateCount: function() {
    this.x++;
    console.log(this.x);
  }
};

// Could be done this way, but uses an unnecessary anonymous function.
document.querySelector('button').addEventListener('click', function(){
  logger.updateCount();
});

// Better shortened thusly.
document.querySelector('button')
    .addEventListener('click', logger.updateCount.bind(logger));



// SETTIMEOUT

var myView = {
  template: '/* a template string containing our <select /> */',
  $el: $('#content'),
  afterRender: function() {
    // Use of this jquery plugin potentially causes a race condition.
    this.$el.find('select').myPlugin();
  },
  render: function() {
    this.$el.html(this.template());
    // Using `this.afterRender();` starts the race condition. 
    // We can remedy this with a setTimeout (slight) hack
    setTimeout(this.afterRender.bind(this), 0);
  }
};

myView.render();