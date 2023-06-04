class IO {
  #in
  #out
  #timer

  constructor(inputStream, outputStream, timer) {
    this.#in = inputStream;
    this.#out = outputStream;
    this.#timer = timer;
  }

  watchInputLine(onNewLine) {
    const stdin = this.#in;
    const timer = this.#timer;

    stdin.setEncoding('utf8');

    const collectInput = () => {
      const chunk = stdin.read();

      if (!chunk) {
        const readStreamEnded = stdin._readableState.ended;
        if (readStreamEnded) timer.clearInterval(readTimer);
        return;
      }

      let content = chunk.trim();
      const lines = content.split('\n');
      lines.forEach((line) => onNewLine(line));
    }

    const readTimer = timer.setInterval(collectInput, 500);
  }

  writeLine(line) {
    this.#out.write(line + '\n');
  }
}

exports.IO = IO;
