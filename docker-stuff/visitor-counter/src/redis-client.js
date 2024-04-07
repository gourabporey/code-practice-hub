const redis = require('redis');

const createClient = async ({ onConnection }) => {
  const client = redis.createClient({ url: 'redis://redis:6379', legacyMode: true });
  await client.connect();

  client.on('error', (err) => console.log('Error connecting to Redis Client:', err));

  client.set('visits', 0, (err) => {
    if (err) console.error('Error setting initial visits count:', err);
    else console.log('Initial visits count set in Redis');
  });

  onConnection({ client });

  client.on('end', () => {
    console.log('Connection to Redis server has ended');
  });
};

module.exports = createClient;