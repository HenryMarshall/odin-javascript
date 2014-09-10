function reverse (string) {
  var reversedCharacters = [];
  var characters = string.split('');
  for (var i = characters.length - 1; i >= 0; i--) {
    reversedCharacters.push(characters[i]);
  };
  return reversedCharacters.join('');
}

console.log(reverse("the quick brown fox"));