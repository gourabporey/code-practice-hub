const reverse = function(text) {
  return text.split("").reverse().join("");
}

const isPalindrome = function(text) {
  return text === reverse(text);
}

const checkPalindromes = function(texts) {
  const resultArray = [];
  for (const text of texts) {
    const result = {};
    result.text = text;
    result.isPalindrome = isPalindrome(text);
    resultArray.push(result);
  }
  return resultArray;
}

exports.checkPalindromes = checkPalindromes;
