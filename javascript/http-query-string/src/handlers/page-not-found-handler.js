const sendPageNotFound = (req, res) => {
  const message = `${req.url} Not found`;
  res.end(message);
};

module.exports = { sendPageNotFound };
