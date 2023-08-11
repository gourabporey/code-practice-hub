const http = require('http');

const parseParams = (queryString) =>
  Object.fromEntries(queryString.split('&').map((param) => param.split('=')));

const handleSearch = (_, res, queryString) => {
  const queryParams = parseParams(queryString);

  res.write('\n');
  res.write(`queryString ${JSON.stringify(queryParams)}`);
};

const redirectToWikipedia = (req, res) => {
  res.writeHead(302, { location: 'https://www.wikipedia.org' });
};

const main = () => {
  const server = http.createServer((req, res) => {
    const [resource, queryString] = req.url.split('?');

    if (resource === '/search') {
      handleSearch(req, res, queryString);
    }

    if (resource === '/wiki') {
      redirectToWikipedia(req, res);
    }

    res.end();
  });

  const PORT = 3030;
  server.listen(PORT, () => console.log('Server started listenting on', PORT));
};

main();
