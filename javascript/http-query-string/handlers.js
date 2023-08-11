const { readFile } = require('fs');

const parseParams = (url) => {
  const [, queryString] = url.split('?');
  return new URLSearchParams(queryString);
};

const serveHomePage = (req, res) => {
  const filePath = './public/index.html';

  readFile(filePath, (err, content) => {
    const [statusCode, contentToSend] = err
      ? [500, `Error reading file ${filePath}`]
      : [200, content];

    res.writeHead(statusCode).end(contentToSend);
  });
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

const sendPageNotFound = (req, res) => {
  const message = `${req.url} Not found`;
  res.end(message);
};

module.exports = { greetUser, sendPageNotFound, serveHomePage };
