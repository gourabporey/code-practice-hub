const net = require('node:net');

const server = net.createServer();

const html = `Hello World`;

const response = `HTTP 410 \n\n${html}`;

server.on('connection', (socket) => {
  socket.setEncoding('utf-8').on('data', (data) => {
    console.log(data);
    socket.write(response);
    socket.end();
  });
});

server.listen(8000, () => console.log('Listening on', 8000));
