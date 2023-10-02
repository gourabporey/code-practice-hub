import createApp from './app';
import { Express } from 'express';

const main = (): void => {
  const app: Express = createApp();
  const PORT: number = 8080;
  app.listen(PORT, () => console.log('Server started listening on port', PORT));
};

main();
