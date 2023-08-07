const PROTOCOL = 'HTTP/1.1';

const isInvalidProtocol = (protocol) =>
  protocol.trim().toUpperCase() !== PROTOCOL;

const handleBadRequest = (response) => {
  response.statusCode(400);
  response.body('Bad Request');
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

const handleContentRequest = (request, response) => {
  const pathAndResponses = [
    { path: '/echo/*', getContent: () => request.uri.replace('/echo/', '') },
    { path: '/ping$', getContent: () => 'pong' },
    { path: '/$', getContent: () => 'home' },
    { path: '/echo$', getContent: () => 'echo' },
  ];

  const matchesUri = ({ path }) => new RegExp(path).test(request.uri);
  const matchedPathResponse = pathAndResponses.find(matchesUri);
  const content = matchedPathResponse?.getContent();

  return content
    ? handleValidContent(content, response)
    : handlePageNotFound(request, response);
};

const handler = (request, response) => {
  if (isInvalidProtocol(request.protocol)) {
    return handleBadRequest(response);
  }

  return handleContentRequest(request, response);
};

module.exports = { handler };
