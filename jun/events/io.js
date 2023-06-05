class StdinReader {
  constructor(reader, readerDelay) {
    this.reader = reader;
    this.readerDelay = readerDelay;
    this.subcribers = { data: [], end: [] };
  }

  on(event, callback) {
    this.subcribers[event].push(callback);
  }

  start() {
    this.reader.setEncoding('utf-8');

    const intervalId = setInterval(() => {
      const data = this.reader.read();

      if (data) {
        this.subcribers.data.forEach(subcriber => subcriber(data));
      }

      if (this.reader._readableState.ended) {
        clearInterval(intervalId);
        this.subcribers.end.forEach(subcriber => subcriber());
      }

    }, this.readerDelay);
  }
}

const stdinReader = new StdinReader(process.stdin, 500);
stdinReader.start();

const logger = (data) => console.log(data);

const printIfNumber = (data) => {
  if (!isNaN(+data) && data !== null) {
    console.log(`${data.trim()}: this is a number`);
  }
};

const showEndMessage = () => console.log('Ended');

stdinReader.on('data', logger);
stdinReader.on('data', printIfNumber);
stdinReader.on('end', showEndMessage);