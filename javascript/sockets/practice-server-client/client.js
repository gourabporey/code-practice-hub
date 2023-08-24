const net = require('node:net');

const client = net.createConnection(9000);

client.on('connect', () => {
  console.log('connection established with server');

  client.setEncoding('utf-8');

  client.on('data', (data) => {
    console.log(data);
  });

  process.stdin.on('data', (data) => {
    client.write(data);
  });
});
