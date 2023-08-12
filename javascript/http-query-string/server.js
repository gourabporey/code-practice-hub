const http = require('http');

const { handler } = require('./src/handler');

const log = (req) => {
  console.log(req.method, req.url);
};

const main = () => {
  const server = http.createServer((req, res) => {
    log(req);
    handler(req, res);
  });

  const PORT = 3030;
  server.listen(PORT, () => console.log('Server started listenting on', PORT));
};

main();
