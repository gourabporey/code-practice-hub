function skipSpaces(sentence) {
  let index = 0;

  while(sentence[index] === " ") {
    index++;
  }

  const remaining = sentence.substring(index);
  return extractWords(remaining);
}

function extractWords(sentence) {
  if(sentence.length === 0)
    return [];

  let index = 0;
  let word = "";

  while(sentence[index] !== " " && index < sentence.length) {
    word = word + sentence[index];
    index++;
  }

  const words = word === "" ? [] : [word];

  return words.concat(skipSpaces(sentence.substring(index)));
}
