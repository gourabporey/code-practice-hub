const http = require('http');

const { handleRequest } = require('./handler.js');

const logRequest = (req) => console.log(req.method, req.url);

const main = () => {
  const server = http.createServer((req, res) => {
    logRequest(req);
    handleRequest(req, res);
  });

  const port = 9876;
  server.listen(port, () => console.log('listening on', port));
};

main();
