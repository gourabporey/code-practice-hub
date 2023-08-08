const PROTOCOL = 'HTTP/1.1';

const isInvalidProtocol = (protocol) =>
  protocol.trim().toUpperCase() !== PROTOCOL;

const isUserAgentAbsent = (headers) => !('User-Agent' in headers);

const isBadRequest = (request) =>
  isInvalidProtocol(request.protocol) || isUserAgentAbsent(request.headers);

const hasInvalidMethod = (request) => request.method.toUpperCase() !== 'GET';

const writeAndEndResponse = (response, { statusCode, body }) => {
  response.statusCode(statusCode);
  response.body(body);
  response.end();
};

const handleBadRequest = (request, response) => {
  writeAndEndResponse(response, { statusCode: 400, body: 'Bad Request' });
};

const handleBadMethod = (request, response) => {
  writeAndEndResponse(response, {
    statusCode: 405,
    body: 'Method Not Allowed',
  });
};

const handlePageNotFound = (request, response) => {
  writeAndEndResponse(response, {
    statusCode: 404,
    body: `${request.uri} Page Not Found`,
  });
};

const handleRootRequest = (request, response) => {
  writeAndEndResponse(response, { statusCode: 200, body: 'home' });
};

const handlePingRequest = (request, response) => {
  writeAndEndResponse(response, { statusCode: 200, body: 'ping' });
};

const handleEchoRequest = (request, response) => {
  writeAndEndResponse(response, { statusCode: 200, body: 'echo' });
};

const handleEchoTextRequest = (request, response) => {
  writeAndEndResponse(response, {
    statusCode: 200,
    body: request.uri.replace('/echo/', ''),
  });
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
  const matchedPathResponse = pathHandlers.find(matchesUri);
  matchedPathResponse.handler(request, response);
};

const handler = (request, response) => {
  if (isBadRequest(request)) return handleBadRequest(request, response);
  if (hasInvalidMethod(request)) return handleBadMethod(request, response);
  return handleContentRequest(request, response);
};

module.exports = { handler };
