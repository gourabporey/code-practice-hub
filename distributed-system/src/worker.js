const http = require('http');
const express = require('express');
const { processImages } = require('./image-processor');

const getServerOptions = () => {
  return {
    port: 8900,
    host: 'localhost',
    method: 'POST',
  };
};

const informWorkerFree = ({ id, tags }) => {
  const options = getServerOptions();
  options.path = `/completed-job/${id}`;
  const req = http.request(options, () => {});
  req.write(JSON.stringify(tags));
  req.end();
};

const handleImageProcessingRequest = (req, res) => {
  return processImages(req.params)
    .then((tags) => {
      console.log('Completed processing tags..');
      return { id: req.params.id, tags };
    })
    .then(informWorkerFree);
};

const logger = (req, _, next) => {
  console.log(req.method, req.url);
  next();
};

const createApp = () => {
  const app = express();

  app.use(logger);
  app.post(
    '/process/:id/:count/:height/:width/:tags',
    handleImageProcessingRequest
  );

  return app;
};

const app = createApp();
app.listen(8901, () => console.log('Worker listening on port', 8901));
