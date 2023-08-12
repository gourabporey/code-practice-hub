const { greetUser } = require('./src/handlers/greet-user-handler');
const { sendPageNotFound } = require('./src/handlers/page-not-found-handler');
const { serveHomePage } = require('./src/handlers/page-server');

const handler = (req, res) => {
  if (req.url === '/') {
    serveHomePage(req, res);
    return;
  }

  if (req.url.startsWith('/greet?')) {
    greetUser(req, res);
    return;
  }

  sendPageNotFound(req, res);
};

module.exports = { handler };
