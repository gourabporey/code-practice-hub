const parseRequest = (requestData) => {
  const [requestLine, ...headerLines] = requestData.trim().split('\r\n');
  const toHeader = (header) => header.split(': ');
  const headers = Object.fromEntries(headerLines.map(toHeader));
  const [method, uri, protocol] = requestLine.trim().split(' ');

  return { method, uri, protocol, headers };
};

module.exports = { parseRequest };
