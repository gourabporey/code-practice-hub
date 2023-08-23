const express = require('express');
const {
  logger,
  loginUser,
  injectCookies,
  addComment,
  injectComments,
  handleGetComments,
  serveLoginPage,
  logoutUser,
} = require('./handlers');

const createApp = ({ comments }) => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(injectComments(comments));
  app.get('/login', serveLoginPage);
  app.post('/login', loginUser);

  app.use(injectCookies);

  app.post('/comment', addComment, handleGetComments);
  app.get('/comment', handleGetComments);

  app.get('/logout', logoutUser);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
