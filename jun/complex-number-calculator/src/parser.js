const { Real, Imaginary, ComplexNumber } = require("complex_number");

class Parser {
   parse(text) {
      const [operator, realText, signOfImag, imagText] = text.split(' ');
      const real = new Real(+realText);
      const imagNumber = +imagText.slice(0, -1);
      let imag = new Imaginary(new Real(imagNumber));

      if (signOfImag === '-') {
         imag = new Imaginary(new Real(-imagNumber));
      }

      const complex = new ComplexNumber(real, imag);

      return { operator, complex };
   }
}

exports.Parser = Parser;