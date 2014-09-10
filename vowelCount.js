function vowelCount(string){
  var counter = 0;
  for (var i = string.length - 1; i >= 0; i--) {
    if (isVowel(string[i].toLowerCase())) {
      counter++;
    };
  };
  return counter;
};

function isVowel(character){
  var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  for (var j = vowels.length - 1; j >= 0; j--) {
    if (vowels[j] === character) {
      return vowels[j];
    };
  };
  return false;
};

console.log(vowelCount("the quick brown fox jumped over the lazy dog"));
console.log(vowelCount("CAPITaLS"));