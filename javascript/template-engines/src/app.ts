import express, { Express } from 'express';

import { serveHomePage } from './handlers/static-handlers';

const createApp = (): Express => {
  const app = express();

  app.set('view engine', 'ejs');
  app.get('/', serveHomePage);

  return app;
};

export default createApp;
