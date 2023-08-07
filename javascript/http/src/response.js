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
    .join('\n');
  const response = `${statusLine}\n${headerLines}\n\n${body}`;

  return response;
};

class Response {
  #socket;
  #statusCode;
  #content;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  statusCode(code) {
    this.#statusCode = code;
  }

  setHeader(attribute, value) {
    this.#headers[attribute] = value;
  }

  body(content) {
    this.#content = content;
  }

  send() {
    const options = {
      statusCode: this.#statusCode,
      body: this.#content,
      headers: this.#headers,
    };

    this.setHeader('Date', new Date());
    this.setHeader('Content-Length', this.#content.length);

    const response = generateResponse(options);

    this.#socket.write(response);
    this.#socket.end();
  }
}

module.exports = { Response };
