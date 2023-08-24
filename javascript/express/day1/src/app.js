const express = require('express');
const { logger, injectComments, addComment } = require('./handlers');

const createApp = ({ comments }) => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(injectComments(comments));

  app.post('/comment', addComment);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
