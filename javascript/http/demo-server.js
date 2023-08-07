const net = require('node:net');

const server = net.createServer();

server.on('connection', (socket) => {
  socket.setEncoding('utf-8');
  socket.on('data', (data) => {
    const parsedReq = parseR
  })
});
