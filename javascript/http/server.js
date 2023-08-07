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
      handler: () => ({
        content: uri.replace('/echo/', ''),
        status: STATUS[200],
      }),
    },
    {
      path: '/ping$',
      handler: () => ({ content: 'pong', status: STATUS[200] }),
    },
    {
      path: '/echo$',
      handler: () => ({ content: 'echo', status: STATUS[200] }),
    },
    { path: '/$', handler: () => ({ content: 'home', status: STATUS[200] }) },
  ];

  const matchesUri = ({ path }) => new RegExp(path).test(uri);
  const matchedPathAndResponse = pathAndResponses.find(matchesUri);
  const uriNotFound = { status: STATUS[404], content: `${uri} Not Found` };

  return matchedPathAndResponse?.handler() || uriNotFound;
};

const parseRequest = (requestData) => {
  const [requestInformation] = requestData.split('\r\n\n');
  const [requestLine, ...allHeaders] = requestInformation.split('\n');
  const headers = Object.fromEntries(
    allHeaders.map((header) => header.split(': '))
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
