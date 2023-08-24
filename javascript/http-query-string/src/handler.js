const { greetUser } = require('./handlers/greet-user-handler');
const { sendPageNotFound } = require('./handlers/page-not-found-handler');
const { serveHomePage } = require('./handlers/page-server');
const { serveWikiContent } = require('./handlers/wiki-content-server');

const parseParams = (url) => {
  const [, queryString] = url.split('?');
  return new URLSearchParams(queryString);
};

const handler = (req, res) => {
  const queryParams = parseParams(req.url);
  req.queryParams = queryParams;

  if (req.url === '/') {
    serveHomePage(req, res);
    return;
  }

  if (req.url.startsWith('/greet?')) {
    greetUser(req, res);
    return;
  }

  if (req.url.startsWith('/wiki?')) {
    serveWikiContent(req, res);
    return;
  }

  sendPageNotFound(req, res);
};

module.exports = { handler };
