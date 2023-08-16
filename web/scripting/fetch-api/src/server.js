const http = require('http');
const { route } = require('./router');

const logReq = (req) => console.log(`${req.method} ${req.url}`);

const getComments = () => [];

const main = () => {
  const comments = getComments();

  const server = http.createServer((req, res) => {
    logReq(req);
    route(req, res, comments);
  });
  const port = 3456;
  server.listen(port, () => console.log('started listening on ', port));
};

main();
