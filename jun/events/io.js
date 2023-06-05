class StdinReader {
   constructor(reader, readerDelay) {
      this.reader = reader;
      this.readerDelay = readerDelay;
      this.subcribers = { data: [], end: [] };
   }

   on(event, callback) {
      return this.subcribers[event].push(callback) - 1;
   }

   remove(event, callback) {
      this.subcribers[event] = this.subcribers[event]?.filter(h => h != callback);
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
   if (data.trim() === '0') {
      stdinReader.remove('data', printIfNumber);
      console.log('printIfNumber stopped executing');
      return;
   }

   if (!isNaN(+data) && data !== null) {
      console.log(`${data.trim()}: this is a number`);
   }
};

const showEndMessage = () => console.log('Ended');

stdinReader.on('data', logger);
stdinReader.on('data', printIfNumber);
stdinReader.on('end', showEndMessage);

// process.stdin.setEncoding('utf-8');
// process.stdin.on('start', () => console.log('started'));
// process.stdin.on('data', (data) => console.log(data));
// process.stdin.on('end', () => console.log('ended'));