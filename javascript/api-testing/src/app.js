const express = require('express');
const {
  serveHome,
  greetIntern,
  serveLogin,
  loginUser,
} = require('./handlers/homepage-handler');

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get('/', serveHome);
  app.post('/intern', greetIntern);
  app.get('/login', serveLogin);
  app.post('/login', loginUser);

  return app;
};

module.exports = { createApp };
