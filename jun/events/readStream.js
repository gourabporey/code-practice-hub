const fs = require('fs');

const fileReader = fs.createReadStream(process.argv[2], {
  encoding: 'utf-8'
});

fileReader.on('data', (data) => console.log(data));
fileReader.on('end', () => console.log('End reading file'));