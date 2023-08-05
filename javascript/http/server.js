const net = require('node:net');

const STATUS = {
  200: { code: 200, message: 'OK' },
  404: { message: 'Not Found', code: 404 },
};

const isEcho = (uri) => uri.startsWith('/echo/');

const getEchoResponse = (uri) => {
  const content = uri.replace('/echo/', '');
  const status = STATUS[200];

  return { content, status };
};

const getContent = (uri) => {
  if (isEcho(uri)) return getEchoResponse(uri);

  const responses = {
    '/': { content: 'home', status: STATUS[200] },
    '/ping': { content: 'pong', status: STATUS[200] },
    '/echo': { content: 'echo', status: STATUS[200] },
  };

  const uriNotFound = { status: STATUS[404], content: `${uri} Not Found` };

  return responses[uri] || uriNotFound;
};

const parseRequest = (requestData) => {
  const [requestLine] = requestData.split('\n');
  const [verb, uri, protocol] = requestLine.trim().split(' ');

  return { verb, uri, protocol };
};

const PROTOCOL = 'HTTP/1.1';

const generateResponse = ({ status, content }) => {
  return `${PROTOCOL} ${status.code} ${status.message}\n\n${content}`;
};

const isInvalidProtocol = (protocol) =>
  !protocol || protocol.toUpperCase() !== PROTOCOL;

const isInvalidVerb = (verb) => verb.toUpperCase() !== 'GET';

const getProtocolErrResponse = () => {
  const content = 'BAD_REQUEST';
  const status = { code: 400, message: content };

  return generateResponse({ status, content });
};

const getBadVerbErrResponse = () => {
  const content = `METHOD_NOT_ALLOWED`;
  const status = { code: 405, message: content };

  return generateResponse({ status, content });
};

const getContentReqResponse = (uri) => generateResponse(getContent(uri));

const getResponse = (uri, verb, protocol) => {
  if (isInvalidProtocol(protocol)) return getProtocolErrResponse();
  if (isInvalidVerb(verb)) return getBadVerbErrResponse(verb);
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
  const PORT = 8000;
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');
    socket.on('data', (req) => handleRequest(socket, req));
  });

  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
