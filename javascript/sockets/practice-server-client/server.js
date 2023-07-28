const net = require('node:net');

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const welcomeAndCalculate = (socket) => {
  socket.write('Welcome to calculator\n');
  socket.setEncoding('utf-8');
  socket.on('data', (data) => {
    if (data.trim() === 'q') {
      socket.end();
      return;
    }

    try {
      const [op1, operator, op2] = data.trim().split(/\s+/);
      const operands = [op1, op2].map((num) => +num);
      socket.write(`${OPERATIONS[operator](...operands)}\n`);
    } catch (e) {
      socket.write('Some error occurred\n');
    }

    socket.write('Enter expression(q to quit): ');
  });
};

const runCalculatorServer = () => {
  const calculatorServer = net.createServer();
  calculatorServer.on('connection', welcomeAndCalculate);
  calculatorServer.listen(9000, () => console.log('calculator started'));
};

const runChatBot = () => {
  const chatServer = net.createServer();
  chatServer.listen(9000);

  const clientSockets = [];

  chatServer.on('connection', (socket) => {
    socket.write('Hello, Please Enter your user name: ');
    socket.setEncoding('utf-8');
    const messages = [];

    socket.on('data', (data) => {
      messages.push(data);

      if (messages.length === 1) {
        clientSockets.push({ socket, messages, name: data.trim() });
        return;
      }

      clientSockets.forEach((client) => {
        const currentClient = clientSockets.find(
          (client) => client.socket === socket
        );

        if (socket !== client.socket)
          client.socket.write(`${currentClient.name}: ${data}\n`);
      });
    });
  });
};

const main = () => {
  const server = net.createServer();
  server.listen(9000);
  server.on('connection', (socket) => {
    console.log('New Connection established');

    socket.setEncoding('utf-8');
    socket.on('data', (data) => {
      console.log(`\nTo Server: ${data}`);
      socket.write(`\nTo client: ${data}`);
    });
  });
};

main();
