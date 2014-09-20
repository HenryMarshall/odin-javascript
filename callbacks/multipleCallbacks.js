function successCallback() {};
function completeCallback() {};
function errorCallback() {};

$.ajax({
  url:'/some/address/path',
  success: successCallback,
  complete: completeCallback,
  error: errorCallback
});