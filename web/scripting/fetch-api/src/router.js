const {
  serveBlogPage,
  servePageNotFound,
  addAndServeComments,
  serveComments,
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

  servePageNotFound(req, res);
};

module.exports = { route };
