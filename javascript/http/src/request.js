const toHeader = (headerLine) => headerLine.split(': ');

const generateHeaders = (headerLines) =>
  Object.fromEntries(headerLines.map(toHeader));

const parseRequest = (requestData) => {
  const [requestLine, ...headerLines] = requestData.trim().split('\r\n');
  const headers = generateHeaders(headerLines);
  const [method, uri, protocol] = requestLine.trim().split(' ');

  return { method, uri, protocol, headers };
};

module.exports = { parseRequest };
