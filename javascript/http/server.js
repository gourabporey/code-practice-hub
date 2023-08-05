const net = require('node:net');

const getContent = (uri) => {
  const responses = {
    '/': { content: 'home', status: { code: 200, message: 'OK' } },
    '/ping': { content: 'pong', status: { code: 200, message: 'OK' } },
    '/echo': { content: 'echo', status: { code: 200, message: 'OK' } },
  };

  const uriNotFound = {
    status: { message: 'Not Found', code: 404 },
    content: `${uri} Not Found`,
  };

  return responses[uri] || uriNotFound;
};

const parseRequest = (requestData) => {
  const [requestLine] = requestData.split('\n');
  const [verb, uri, protocol] = requestLine.split(' ');
  return { verb, uri, protocol };
};

const generateResponse = ({ protocol, status, content }) => {
  return `${protocol} ${status.code} ${status.message}\n\n${content}`;
};

const main = () => {
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8').on('data', (req) => {
      console.log(req);

      const { uri, protocol } = parseRequest(req);
      const { content, status } = getContent(uri);
      const response = generateResponse({ protocol, status, content });

      socket.write(response);
      socket.end();
    });
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
