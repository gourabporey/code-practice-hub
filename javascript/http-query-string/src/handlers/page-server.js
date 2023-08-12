const { readFile } = require('fs');

const serveHomePage = (req, res) => {
  const filePath = './public/index.html';

  readFile(filePath, (err, content) => {
    const [statusCode, contentToSend] = err
      ? [500, `Error reading file ${filePath}`]
      : [200, content];

    res.writeHead(statusCode).end(contentToSend);
  });
};

module.exports = { serveHomePage };
