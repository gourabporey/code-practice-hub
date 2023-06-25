class IO {
  #in;
  #out;

  constructor(inputStream, outputStream) {
    this.#in = inputStream;
    this.#out = outputStream;
  }

  watchInputLine(onNewLine) {
    const stdin = this.#in;
    stdin.setEncoding('utf8');
    stdin.on('data', onNewLine);
  }

  writeLine(line) {
    this.#out.write(line.toString() + '\n');
  }
}

exports.IO = IO;
