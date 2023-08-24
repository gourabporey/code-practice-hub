class SocketController {
  #socket;

  constructor(socket) {
    this.#socket = socket;
  }

  sendData(data) {
    this.#socket.write(data);
  }

  onInputReceived(sendDataToGame) {
    this.#socket.on('data', (data) => {
      sendDataToGame(data);
    });
  }

  stop() {
    this.#socket.end();
  }
}

module.exports = { SocketController };
