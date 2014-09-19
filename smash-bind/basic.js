var myObj = {
  specialFunction: function() {},
  anotherSpecialFunction: function() {},
  getAsyncData: function(callback) {
    callback();
  },

  renderWithThat: function() {
    var that = this;
    this.getAsyncData(function() {
      that.specialFunction();
      that.anotherSpecialFunction();
    });
  },

  renderWithBind: function() {
    this.getAsyncData(function() {
      this.specialFunction();
      this.anotherSpecialFunction();
    }.bind(this));
  }

}