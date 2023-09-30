const express = require('express');

const congratulateUser = (req, res) => {
  const username = req.body;
  const message = `<p>Hello ${username}<p>`;
  res.send(message);
};

const createApp = () => {
  const app = express();

  app.use(express.static('public'));
  app.use(express.urlencoded());
  app.use(express.json());

  app.get('/congratulate', congratulateUser);

  return app;
};

const main = () => {
  const app = createApp();
  app.listen(9999, () => console.log('App listening on port', 9999));
};

main();
