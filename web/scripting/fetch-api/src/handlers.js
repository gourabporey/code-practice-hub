const fs = require('fs');

const servePageNotFound = (req, res) => {
  res.writeHead(404).end(`${req.url} not found`);
};

const addAndServeComments = (req, res, comments) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    const comment = new URLSearchParams(data).get('comment');
    comments.push(comment);
    res.writeHead(302, { location: '/blog' }).end();
  });
};

const serveComments = (req, res, comments) => {
  res
    .writeHead(200, { 'content-type': 'application/json' })
    .end(JSON.stringify(comments));
};

const serveBlogPage = (req, res) => {
  fs.readFile('./public/index.html', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.setHeader('content-type', 'text/html').end(data);
  });
};

const serveCalculatorPage = (req, res) => {
  fs.readFile('./public/calculator.html', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.setHeader('content-type', 'text/html').end(data);
  });
};

const calculateAndServeResult = (req, res) => {
  let reqBody = '';
  req.on('data', (data) => (reqBody += data));
  req.on('end', () => {
    const { operandOne, operandTwo, operator } = JSON.parse(reqBody);

    switch (operator) {
      case '+':
        result = operandOne + operandTwo;
        break;

      case '-':
        result = operandOne - operandTwo;
        break;
    }

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ result }));
  });
};

module.exports = {
  serveBlogPage,
  servePageNotFound,
  addAndServeComments,
  serveComments,
  serveCalculatorPage,
  calculateAndServeResult,
};
