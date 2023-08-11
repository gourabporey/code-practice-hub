const http = require('http');

const { serveHomePage, greetUser, sendPageNotFound } = require('./handlers');

const log = (req) => {
  console.log(req.method, req.url);
};

const main = () => {
  const server = http.createServer((req, res) => {
    log(req);

    if (req.url === '/') {
      serveHomePage(req, res);
      return;
    }

    if (req.url.startsWith('/greet?')) {
      greetUser(req, res);
      return;
    }

    sendPageNotFound(req, res);
  });

  const PORT = 3030;
  server.listen(PORT, () => console.log('Server started listenting on', PORT));
};

main();
