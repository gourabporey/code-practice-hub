const { createApp } = require('./src/app.js');

const main = () => {
  const PORT = 4000;
  const app = createApp({ comments: [] });
  app.listen(PORT, () => console.log('started listening on port', PORT));
};

main();
