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
  const headerLines = Object.entries(headers)
    .map((attr) => attr.join(': '))
    .join('\r\n');
  const response = `${statusLine}\r\n${headerLines}\r\n\n${body}`;

  return response;
};

module.exports = { generateResponse };
