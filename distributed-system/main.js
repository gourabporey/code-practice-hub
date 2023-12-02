const createApp = require('./src/app.js');

const main = () => {
  const PORT = 9999;
  const app = createApp();
  app.listen(PORT, () => console.log('App started on Port: ', PORT));
};

main();
