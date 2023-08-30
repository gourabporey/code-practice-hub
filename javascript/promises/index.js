const fs = require('fs');

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const readFile = (filePath, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
