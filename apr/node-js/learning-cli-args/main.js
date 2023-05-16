const palindrome = require("./lib/palindrome.js");
const checkPalindromes = palindrome.checkPalindromes;

const main = function() {
  console.table(checkPalindromes(process.argv.slice(2)));
}

main();
