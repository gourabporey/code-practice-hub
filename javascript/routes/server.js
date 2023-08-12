const http = require('http');

const log = (req) => console.log(req.method, req.url);

const handleHTTPVersion = (req, res, next) => {
  if (req.httpVersion !== '1.1') {
    res.end('Invalid HTTP version');
    return true;
  }

  next();
};

const handlePageRequest = (req, res, next) => {
  if (req.url === '/') {
    res.end('Home page');
    return true;
  }

  next();
};

const send404 = (req, res) => res.end('404');

const handler = (req, res) => {
  const handlers = [handleHTTPVersion, handlePageRequest, send404];
  let currentHandlerIndex = -1;

  const next = () => {
    currentHandlerIndex++;
    const currentHandler = handlers[currentHandlerIndex];
    currentHandler(req, res, next);
  };

  next();
};

const main = () => {
  const PORT = 5050;

  const server = http.createServer((req, res) => {
    log(req);
    handler(req, res);
  });

  server.on('connection', () => console.log('connection established'));
  server.listen(PORT, () => console.log('started listening on', PORT));
};

main();
