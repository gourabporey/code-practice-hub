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

const PROTOCOL = 'HTTP/1.1';

const generateResponse = ({ status, content }) => {
  return `${PROTOCOL} ${status.code} ${status.message}\n\n${content}`;
};

const isInvalidProtocol = (protocol) => {
  return !protocol || protocol.trim().toUpperCase() !== PROTOCOL;
};

const getBadReqResponse = () => {
  const status = { code: 400, message: 'Bad Request' };
  const content = 'Bad Request';
  const response = generateResponse({ status, content });

  return response;
};

const getContentReqResponse = (uri) => {
  const { content, status } = getContent(uri);
  const response = generateResponse({ status, content });

  return response;
};

const main = () => {
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');

    socket.on('data', (req) => {
      console.log(req);

      const { uri, protocol } = parseRequest(req);

      const response = isInvalidProtocol(protocol)
        ? getBadReqResponse()
        : getContentReqResponse(uri);

      socket.write(response);
      socket.end();
    });
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
