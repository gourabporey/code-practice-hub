const fs = require('fs');

const fileReader = fs.createReadStream(process.argv[2], {
   encoding: 'utf-8'
});

let chunkIndex = 1;

fileReader.on('data', (data) => {
   console.log('Chunk:', chunkIndex++);
   console.log(data);
   console.log('--X--X--X--X--')
});

fileReader.on('end', () => console.log('End reading file'));

fileReader.on('start', () => console.log('started'));
fileReader.emit('start')