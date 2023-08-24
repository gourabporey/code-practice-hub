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

const runChatServer = (chatServer) => {
  const clientSockets = [];

  chatServer.on('connection', (socket) => {
    socket.write('Hello, Please Enter your user name: ');
    socket.setEncoding('utf-8');
    const messages = [];

    const makeEntryOfClient = (name) => {
      clientSockets.push({ socket, messages, name: name.trim() });
    };

    const sendMsg = (client, msg) => {
      const identityClient = (client) => client.socket === socket;
      const msgSender = clientSockets.find(identityClient);

      if (client.socket !== socket) {
        client.socket.write(`${msgSender.name}: ${msg.trim()}\n`);
      }
    };

    const sendMsgToOthers = (msg) => {
      messages.push(msg.trim());
      clientSockets.forEach((client) => sendMsg(client, msg));
    };

    socket.once('data', (name) => {
      makeEntryOfClient(name);
      socket.on('data', sendMsgToOthers);
    });
  });
};

const main = () => {
  const server = net.createServer();
  const PORT = 9000;
  server.listen(PORT, () => console.log('Server started listening on', PORT));
  runChatServer(server);
};

main();
