$.validator.setDefaults({
  submitHandler: function() {
    alert('submitted');
  }
})

(function(){

$('#signup').validate({
  rules: {
    email: {
      required: true,
      email: true
    },
    email_conf: {
      required: true,
      equalTo: '#email'
    },
    country: 'required',
    zip: 'required',
    password: {
      required: true,
      minlength: 6
    },
    password_conf: {
      required: true,
      equalTo: '#password'
    }
  },
  messages: {
    email: 'Please enter an email (e.g., name@example.com)',
    email_conf: 'Must match email',
    country: 'Must include your country',
    zip: 'Must include your zip',
    password: {
      required: 'Must include a password',
      minlength: 'Must be at least 6 characters'
    },
    password_conf: 'Must match password'
  }
});

// end of iife
})();