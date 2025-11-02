/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let longestPalindromeTillNow = "";
  let totalTraversed = "";
  for (let i = 0; i < s.length; i++) {
    totalTraversed += s[i];
    let tempString = "";
    for (let i = totalTraversed.length - 1; i >= 0; i--) {
      tempString += totalTraversed[i];
      if (
        tempString.length > longestPalindromeTillNow.length &&
        isPalindrome(tempString)
      ) {
        longestPalindromeTillNow = tempString;
      }
    }
  }
  return longestPalindromeTillNow;
};

var isPalindrome = function (str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - i - 1]) return false;
  }
  return true;
};

var longestPalindrome2 = function (s) {
  if (s.length <= 1) return s;
  if (s.length == 2) return s[0] === s[1] ? s : s[0];
  let longestPalindromeTillNow = "";

  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      let part = s.substring(i, j + 1);
      if (part.length > longestPalindromeTillNow.length && isPalindrome(part)) {
        longestPalindromeTillNow = part;
      }
    }
  }

  return longestPalindromeTillNow;
};

const isPalindrome2 = function (s) {
  if (s.length <= 1) return true;
  if (s.length === 2) return s[0] === s[1];
  return (
    s[0] === s[s.length - 1] && isPalindrome2(s.substring(1, s.length - 1))
  );
};
