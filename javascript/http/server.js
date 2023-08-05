const net = require('node:net');

const getContent = (uri) => {
  const contents = {
    '/': { content: 'home', status: { code: 200, message: 'OK' } },
    '/ping': { content: 'pong', status: { code: 200, message: 'OK' } },
    '/echo': { content: 'echo', status: { code: 200, message: 'OK' } },
  };

  const notFoundContent = {
    status: { message: 'Not Found', code: 404 },
    content: 'Not Found',
  };

  return contents[uri] || notFoundContent;
};

const generateResponse = (status, content) =>
  `HTTP/1.1 ${status.code} ${status.message}\n\n${content}`;

const main = () => {
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8').on('data', (req) => {
      console.log(req);

      const [, uri] = req.split(' ');
      const { content, status } = getContent(uri);
      const response = generateResponse(status, content);

      socket.write(response);
      socket.end();
    });
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
