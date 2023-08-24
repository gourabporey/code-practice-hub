const greetUser = (req, res) => {
  const queryParams = req.queryParams;
  const name = queryParams.get('name');
  const message = queryParams.get('message');
  const interests = queryParams.getAll('interests');
  const greetingHtml = `<h2>${message} ${name}</h2>`;
  const bodyHtml = `<p>Your interests are: ${interests}</p>`;

  res
    .writeHead(200, { 'content-type': 'text/html' })
    .end(greetingHtml + bodyHtml);
};

module.exports = { greetUser };
