const net = require('node:net');

const getContent = (uri) => {
  const contents = {
    '/': { content: 'home', statusCode: 200, status: 'OK' },
    '/ping': { content: 'pong', statusCode: 200, status: 'OK' },
    '/echo': { content: 'echo', statusCode: 200, status: 'OK' },
  };

  const notFoundContent = {
    statusCode: 404,
    status: 'Not Found',
    content: 'Not Found',
  };

  return contents[uri] || notFoundContent;
};

const generateResponse = (status, statusCode, content) =>
  `HTTP/1.1 ${statusCode} ${status}\n\n ${content}`;

const main = () => {
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8').on('data', (req) => {
      const [, uri] = req.split(' ');
      const { content, statusCode, status } = getContent(uri);
      const response = generateResponse(status, statusCode, content);

      socket.write(response);
      socket.end();
    });
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
