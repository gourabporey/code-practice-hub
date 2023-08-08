const PROTOCOL = 'HTTP/1.1';

const isInvalidProtocol = (protocol) =>
  protocol.trim().toUpperCase() !== PROTOCOL;

const isUserAgentAbsent = (headers) => !('User-Agent' in headers);

const isBadRequest = (request) =>
  isInvalidProtocol(request.protocol) || isUserAgentAbsent(request.headers);

const hasInvalidMethod = (request) => request.method.toUpperCase() !== 'GET';

const handleBadRequest = (request, response) => {
  response.statusCode(400).body('Bad Request').end();
};

const handleBadMethod = (request, response) => {
  response.statusCode(405).body('Method Not Allowed').end();
};

const handlePageNotFound = (request, response) => {
  response.statusCode(404).body(`${request.uri} Page Not Found`).end();
};

const handleRootRequest = (request, response) => {
  response.statusCode(200).body('home').end();
};

const handlePingRequest = (request, response) => {
  response.statusCode(200).body('ping').end();
};

const handleEchoRequest = (request, response) => {
  response.statusCode(200).body('echo').end();
};

const handleEchoTextRequest = (request, response) => {
  response.statusCode(200).body(request.uri.replace('/echo/', '')).end();
};

const pathHandlers = [
  { path: '/echo/.*', handler: handleEchoTextRequest },
  { path: '/ping', handler: handlePingRequest },
  { path: '/', handler: handleRootRequest },
  { path: '/echo', handler: handleEchoRequest },
  { path: '/.*', handler: handlePageNotFound },
];

const matchesPattern = (pattern, text) => new RegExp(`^${pattern}$`).test(text);

const handleContentRequest = (request, response) => {
  const matchesUri = ({ path }) => matchesPattern(path, request.uri);
  const matchedPathHandler = pathHandlers.find(matchesUri).handler;
  matchedPathHandler(request, response);
};

const handler = (request, response) => {
  if (isBadRequest(request)) return handleBadRequest(request, response);
  if (hasInvalidMethod(request)) return handleBadMethod(request, response);
  return handleContentRequest(request, response);
};

module.exports = { handler };
