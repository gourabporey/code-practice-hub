const parseParams = (url) => {
  const [, queryString] = url.split('?');
  return new URLSearchParams(queryString);
};

const greetUser = (req, res) => {
  const queryParams = parseParams(req.url);
  console.log(queryParams);
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
