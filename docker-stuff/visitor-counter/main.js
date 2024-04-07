const createApp = require("./src/app");
const createClient = require("./src/redis-client");

const main = () => {
  const PORT = process.env.PORT || 8000;

  createClient({
    onConnection: ({ client }) => {
      const app = createApp({ client });
      app.listen(PORT, () => console.log("Visitor Counter Started on Port", PORT));
    }
  });
};

main();
