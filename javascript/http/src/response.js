const { generateResponse } = require('./response-generator');

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
    return this;
  }

  setHeader(attribute, value) {
    this.#headers[attribute] = value;
    return this;
  }

  body(content) {
    this.#content = content;
    this.setHeader('Content-Length', this.#content.length);
    return this;
  }

  end() {
    this.setHeader('Date', new Date());

    const options = {
      statusCode: this.#statusCode,
      body: this.#content,
      headers: this.#headers,
    };

    const response = generateResponse(options);

    this.#socket.write(response);
    this.#socket.end();
  }
}

module.exports = { Response };
