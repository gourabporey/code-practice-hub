const net = require('node:net');

const PROTOCOL = 'HTTP/1.1';

const STATUS = {
  200: { code: 200, message: 'OK' },
  404: { code: 404, message: 'Not Found' },
};

const getContent = (uri) => {
  const pathAndResponses = [
    {
      path: '/echo/*',
      response: { content: uri.replace('/echo/', ''), status: STATUS[200] },
    },
    { path: '/ping$', response: { content: 'pong', status: STATUS[200] } },
    { path: '/echo$', response: { content: 'echo', status: STATUS[200] } },
    { path: '/$', response: { content: 'home', status: STATUS[200] } },
  ];

  const matchedPathAndResponse = pathAndResponses.find(({ path }) => {
    return new RegExp(path).test(uri);
  });

  const uriNotFound = { status: STATUS[404], content: `${uri} Not Found` };

  return matchedPathAndResponse?.response || uriNotFound;
};

const parseRequest = (requestData) => {
  const [requestLine] = requestData.split('\n');
  const [verb, uri, protocol] = requestLine.trim().split(' ');

  return { verb, uri, protocol };
};

const generateResponse = ({ status, content }) => {
  return `${PROTOCOL} ${status.code} ${status.message}\n\n${content}`;
};

const isInvalidProtocol = (protocol) =>
  !protocol || protocol.toUpperCase() !== PROTOCOL;

const isInvalidVerb = (verb) => verb.toUpperCase() !== 'GET';

const respondToProtocolError = () => {
  const content = 'BAD_REQUEST';
  const status = { code: 400, message: content };

  return generateResponse({ status, content });
};

const respondToBadMethod = () => {
  const content = `METHOD_NOT_ALLOWED`;
  const status = { code: 405, message: content };

  return generateResponse({ status, content });
};

const respondToContentRequest = (uri) => generateResponse(getContent(uri));

const getResponse = (uri, verb, protocol) => {
  if (isInvalidProtocol(protocol)) return respondToProtocolError();
  if (isInvalidVerb(verb)) return respondToBadMethod(verb);
  return respondToContentRequest(uri);
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
