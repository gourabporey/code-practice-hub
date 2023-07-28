const net = require('node:net');

const client = net.createConnection(9000);

client.on('connect', () => {
  console.log('connection established with server');

  client.setEncoding('utf-8');

  let count = 0;
  const interval = setInterval(() => {
    count++;
    client.write(count.toString());

    if (count === 5) {
      client.end();
      clearInterval(interval);
    }
  }, 1000);

  client.on('data', (data) => {
    console.log(data);
  });
});
