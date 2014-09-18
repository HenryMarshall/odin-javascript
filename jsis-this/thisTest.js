var user = {
  tournament: 'The Masters',
  data: [
    { name:'T. Woods', age:37 },
    { name: 'P. Mickelson', age:43 }
  ],
  clickHandler: function() {

    console.log('Outside the forEach function "this" is: ' + this);
      // [object Object]

    // the use of this.data here is fine because 'this' refers to the user
    // object, and data is a property on the user object
    this.data.forEach(function(person) {
      // but here inside the anonymous function (that we pass to the forEach
      // method), 'this' no longer refers to the user object. This inner
      // function cannot access the outer function's this
      console.log('Inside the forEach function "this" is: ' + this);
        // [object global]

      console.log(person.name + ' is playing at ' + this.tournament);
        // T. Woods is playing at undefined
        // P.Micelson is playing at undefined
    });
  }
};

user.clickHandler();