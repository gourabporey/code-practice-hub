const { readFile } = require('fs');

const parseParams = (url) => {
  const [, queryString] = url.split('?');
  return new URLSearchParams(queryString);
};

const serveHomePage = (req, res) => {
  const filePath = './public/index.html';

  readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500).end();
    } else {
      res.end(content);
    }
  });
};

const greetUser = (req, res) => {
  const queryParams = parseParams(req.url);
  const name = queryParams.get('name');
  const message = queryParams.get('message');
  const greetingHTML = `<h2>${message} ${name}</h2>`;

  res.writeHead(200, { 'content-type': 'text/html' }).end(greetingHTML);
};

module.exports = { greetUser, serveHomePage };
