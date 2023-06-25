const factorial = function(number) {
  if (number < 1) return 1;
  return number * factorial(number - 1);
}

const main = function() {
  const number = process.argv[2];
  console.log(factorial(number));
}

main();
