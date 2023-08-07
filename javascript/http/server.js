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

  const matchesUri = ({ path }) => new RegExp(path).test(uri);
  const matchedPathAndResponse = pathAndResponses.find(matchesUri);
  const uriNotFound = { status: STATUS[404], content: `${uri} Not Found` };

  return matchedPathAndResponse?.response || uriNotFound;
};

const parseRequest = (requestData) => {
  const [requestLine, ...AllHeaders] = requestData.split('\n');
  const headers = Object.fromEntries(
    AllHeaders.map((header) => header.split(': '))
  );
  const [verb, uri, protocol] = requestLine.trim().split(' ');

  return { verb, uri, protocol, headers };
};

const generateResponse = ({ status, content }) => {
  const { code, message } = status;
  const responseLine = [PROTOCOL, code, message].join(' ');

  const dateLine = `Date: ${new Date()}`;
  const contentLengthLine = `Content-Length: ${content.length}`;
  const headers = [dateLine, contentLengthLine].join('\n');

  return `${responseLine}\n${headers}\n\n${content}`;
};

const isInvalidProtocol = (protocol) =>
  !protocol || protocol.toUpperCase() !== PROTOCOL;

const isInvalidVerb = (verb) => verb.toUpperCase() !== 'GET';

const respondToBadRequest = () => {
  const content = 'BAD_REQUEST';
  const status = { code: 400, message: content };

  return generateResponse({ status, content });
};

const respondToBadMethod = () => {
  const content = `METHOD_NOT_ALLOWED`;
  const status = { code: 405, message: content };

  return generateResponse({ status, content });
};

const userAgentNotFound = (headers) => !('User-Agent' in headers);

const respondToContentRequest = (uri) => generateResponse(getContent(uri));

const getResponse = (uri, verb, protocol, headers) => {
  if (isInvalidProtocol(protocol)) return respondToBadRequest();
  if (userAgentNotFound(headers)) return respondToBadRequest();
  if (isInvalidVerb(verb)) return respondToBadMethod(verb);
  return respondToContentRequest(uri);
};

const handleRequest = (socket, req) => {
  console.log(req);

  const { uri, verb, protocol, headers } = parseRequest(req);
  const response = getResponse(uri, verb, protocol, headers);

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
