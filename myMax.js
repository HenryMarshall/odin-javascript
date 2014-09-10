function myMax (numbers) {
  var greatestNumber;
  if (typeof numbers === 'object' && numbers.length) {
    greatestNumber = numbers[0];
    numbers.forEach(function(number){
      if (number > greatestNumber) {
        greatestNumber = number;
      };
    });
  };
  return(greatestNumber);
}

console.log(myMax([3,8,4]));