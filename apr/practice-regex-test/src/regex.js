const substitute = function(text, pattern, toPattern) {
  return text.replaceAll(pattern, toPattern);
};

const validate = function(regex, text) {
  return regex.test(text);
};

exports.substitute = substitute;
exports.validate = validate;
