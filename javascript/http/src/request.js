const parseRequest = (requestData) => {
  const [requestInformation] = requestData.split('\r\n\n');
  const [requestLine, ...allHeaders] = requestInformation.split('\n');
  const headers = Object.fromEntries(
    allHeaders.map((header) => header.split(': '))
  );
  const [method, uri, protocol] = requestLine.trim().split(' ');

  return { method, uri, protocol, headers };
};

module.exports = { parseRequest };
