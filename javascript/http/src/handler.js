const PROTOCOL = 'HTTP/1.1';

const isInvalidProtocol = (protocol) =>
  protocol.trim().toUpperCase() !== PROTOCOL;

const hasInvalidMethod = (request) => request.method.toUpperCase() !== 'GET';

const isUserAgentAbsent = (headers) => !('User-Agent' in headers);

const isBadRequest = (request) =>
  isInvalidProtocol(request.protocol) || isUserAgentAbsent(request.headers);

const handleBadRequest = (response) => {
  response.statusCode(400);
  response.body('Bad Request');
  response.send();
};

const handleBadMethod = (response) => {
  response.statusCode(405);
  response.body('Method Not Allowed');
  response.send();
};

const handlePageNotFound = (request, response) => {
  response.statusCode(404);
  response.body(`${request.uri} Page Not Found`);
  response.send();
};

const handleValidContent = (content, response) => {
  response.statusCode(200);
  response.body(content);
  response.send();
};

const PATH_CONTENTS = [
  { path: '^/echo/*', getContent: (uri) => uri.replace('/echo/', '') },
  { path: '^/ping$', getContent: () => 'pong' },
  { path: '^/$', getContent: () => 'home' },
  { path: '^/echo$', getContent: () => 'echo' },
];

const handleContentRequest = (request, response) => {
  const matchesUri = ({ path }) => new RegExp(path).test(request.uri);
  const matchedPathResponse = PATH_CONTENTS.find(matchesUri);
  const content = matchedPathResponse?.getContent(request.uri);

  if (content) handleValidContent(content, response);
  else handlePageNotFound(request, response);
};

const handler = (request, response) => {
  if (isBadRequest(request)) return handleBadRequest(response);
  if (hasInvalidMethod(request)) return handleBadMethod(response);
  return handleContentRequest(request, response);
};

module.exports = { handler };
