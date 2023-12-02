const express = require('express');

const processImages = ({ count, height, width, tags }) => {
  return new Promise((resolve) => {
    for (let c = 0; c <= +count; c++) {
      for (let h = 0; h <= +height; h++) {
        for (let w = 0; w <= +width; w++) {
          const b = c + h - w;
        }
      }
    }

    const tagsSeparated = tags.split('_');

    resolve(tagsSeparated);
  });
};

const handleImageProcessingRequest = (req, res) => {
  return processImages(req.params)
    .then((tags) => {
      console.log(tags);
      return tags;
    })
    .then((tags) => {
      res.send(JSON.stringify(tags));
    });
};

const logger = (req, _, next) => {
  console.log(req.method, req.url);
  next();
};

const createApp = () => {
  const app = express();

  app.use(logger);
  app.post(
    '/process/:name/:count/:height/:width/:tags',
    handleImageProcessingRequest
  );

  return app;
};

module.exports = createApp;
