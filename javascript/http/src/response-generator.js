const PROTOCOL = 'HTTP/1.1';

const STATUS = {
  200: 'OK',
  400: 'Bad Request',
  404: 'Page Not Found',
  405: 'Method Not Allowed',
};

const generateResponse = ({ statusCode, body, headers }) => {
  const statusMessage = STATUS[statusCode];
  const statusLine = [PROTOCOL, statusCode, statusMessage].join(' ');

  const toHeaderLine = ([key, value]) => `${key}: ${value}`;
  const headerLines = Object.entries(headers).map(toHeaderLine).join('\r\n');

  return `${statusLine}\r\n${headerLines}\r\n\n${body}`;
};

module.exports = { generateResponse };
