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

const isInvalidVerb = (verb) => verb.toUpperCase() !== 'GET';

const getBadReqResponse = () => {
  const status = { code: 400, message: 'Bad Request' };
  const content = 'Bad Request';

  return generateResponse({ status, content });
};

const getContentReqResponse = (uri) => {
  const { content, status } = getContent(uri);
  return generateResponse({ status, content });
};

const getBadVerbResponse = (verb) => {
  const content = `${verb} Not Allowed`;
  const status = { code: 405, message: content };

  return generateResponse({ status, content });
};

const getResponse = (uri, verb, protocol) => {
  if (isInvalidProtocol(protocol)) return getBadReqResponse();
  if (isInvalidVerb(verb)) return getBadVerbResponse(verb);
  return getContentReqResponse(uri);
};

const handleRequest = (socket, req) => {
  console.log(req);

  const { uri, verb, protocol } = parseRequest(req);
  const response = getResponse(uri, verb, protocol);

  socket.write(response);
  socket.end();
};

const main = () => {
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');
    socket.on('data', (req) => handleRequest(socket, req));
  });

  const PORT = 8000;
  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
