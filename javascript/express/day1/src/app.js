const express = require('express');

const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

const createApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
