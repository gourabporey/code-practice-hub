const net = require('node:net');

const { parseRequest } = require('./src/request');
const { Response } = require('./src/response');
const { handler } = require('./src/handler');

const main = () => {
  const PORT = 8000;
  const server = net.createServer();

  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');
    socket.on('data', (data) => {
      const request = parseRequest(data);
      const response = new Response(socket);
      handler(request, response);
    });
  });

  server.listen(PORT, () => console.log('Listening on', PORT));
};

main();
