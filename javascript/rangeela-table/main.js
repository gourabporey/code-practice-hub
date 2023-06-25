const colors = require('colors/safe');

const main = () => {
   console.log(colors.green.inverse.underline.bold('hello'));
}

main();