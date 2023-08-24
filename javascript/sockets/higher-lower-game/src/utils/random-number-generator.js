const generateRandom = (range) => {
  const from = range.from || 0;
  const to = range.to;
  return Math.round(Math.random() * (to - from)) + from;
};

module.exports = { generateRandom };
