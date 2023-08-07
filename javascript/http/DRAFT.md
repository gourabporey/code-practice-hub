```js
class Response {
  constructor(socket) {
    this.socket = socket;
  }

  body(content) {
    this.body = content;
  }

  statusCode(code) {
    this.code = code;
  }

  end() {
    // Some how get the content
    this.socket.end();
  }
}
```

Changes I want to make to the server -

- A way to register paths and their handlers.
- Respond to specific request.

```
A HTTPServer
- properties: server, handlers
- methods:
  - register handler
  - validation of options
  - perform request
```

```js
class HTTPServer {
  constructor(server) {
    this.server = server;
    this.handlers = {};
  }

  register(path, handler) {
    this.handlers.path = (this.handlers.path || []).concat(handler);
  }

  handleRequest({ uri, method, protocol, headers }) {
    if (isInvalidProtocol(protocol)) return this.#handleBadRequest();

    if (isUserAgentAbsent(headers)) return this.#handleBadRequest();

    if (isInvalidMethod(method)) return this.#handleBadMethod(method);

    return this.#handleContentRequest(uri);
  }
}
```

GET /echo/hello HTTP/1.1
Host: localhost:8000
Connection: keep-alive
Cache-Control: max-age=0
sec-ch-ua: "Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,_/_;q=0.8
Sec-GPC: 1
Accept-Language: en-GB,en
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
