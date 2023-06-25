// remove consecutive repeated characters with numbers

function countTillCharacter (string, character) {
  let count = 0;

  for (let i = 0; i < string.length; i++) {
    if (character === string[i]) {
      count++;
    } else {
      break;
    }
  }

  return count;
}

function squeezeRepetitionWithCount (string) {
  if (string.length === 1) {
    return string;
  }

  let modifiedString = string;
  let squeezedString = "";

  while (modifiedString.length > 0) {
    squeezedString += modifiedString[0];
    const count = countTillCharacter(modifiedString, modifiedString[0]);
    squeezedString += count > 1 ? count : "";
    modifiedString = modifiedString.substring(count);
  }

  return squeezedString;
}

console.log(squeezeRepetitionWithCount("a") === "a", "a should be a");
console.log(squeezeRepetitionWithCount("aa") === "a2", "aa should be a2");
console.log(squeezeRepetitionWithCount("aab") === "a2b", "aab should be a2b");
console.log(squeezeRepetitionWithCount("abb") === "ab2", "abb should be ab2");
console.log(squeezeRepetitionWithCount("aabb") === "a2b2", "aabb should be a2b2");
console.log(squeezeRepetitionWithCount("aababbc") === "a2bab2c", "aababbc should be a2bab2c");
