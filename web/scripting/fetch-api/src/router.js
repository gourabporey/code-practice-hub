const {
  serveBlogPage,
  servePageNotFound,
  addAndServeComments,
  serveComments,
  serveCalculatorPage,
  calculateAndServeResult,
} = require('./handlers');

const route = (req, res, comments) => {
  if (req.method === 'GET' && req.url === '/blog') {
    serveBlogPage(req, res);
    return;
  }

  if (req.method === 'POST' && req.url === '/blog/comment') {
    addAndServeComments(req, res, comments);
    return;
  }

  if (req.method === 'GET' && req.url === '/blog/comment') {
    serveComments(req, res, comments);
    return;
  }

  if (req.method === 'GET' && req.url === '/calculator') {
    serveCalculatorPage(req, res);
    return;
  }

  if (req.method === 'POST' && req.url === '/calculate') {
    calculateAndServeResult(req, res);
    return;
  }

  servePageNotFound(req, res);
};

module.exports = { route };
