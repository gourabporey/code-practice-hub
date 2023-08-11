const http = require('http');

const parseParams = (queryString) =>
  Object.fromEntries(queryString.split('&').map((param) => param.split('=')));

const main = () => {
  const server = http.createServer((req, res) => {
    const [resource, queryString] = req.url.split('?');

    if (resource === '/search') {
      const queryParams = parseParams(queryString);

      res.write(`resource ${resource}`);
      res.write('\n');
      res.write(`queryString ${JSON.stringify(queryParams)}`);
    }

    res.end();
  });

  const PORT = 3030;
  server.listen(PORT, () => console.log('Server started listenting on', PORT));
};

main();
