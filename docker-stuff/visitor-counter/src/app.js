const express = require('express');
const { handleVisitorCount } = require('./handlers');

const createApp = ({ client }) => {
  const app = express();
  app.get('/', handleVisitorCount(client));
  return app;
};

module.exports = createApp;