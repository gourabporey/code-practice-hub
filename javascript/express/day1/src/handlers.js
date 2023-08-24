const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

const injectComments = (comments) => (req, res, next) => {
  req.comments = comments;
  next();
};

const addComment = (req, res) => {
  req.comments.push(req.body);
  res.send(req.comments);
};

module.exports = { logger, injectComments, addComment };
