const express = require('express');
const http = require('http');
const ImageSets = require('./image-sets');

const app = express();
const imageSets = new ImageSets();
let isWorkerFree = true;
const jobs = [];

setInterval(() => {
  if (isWorkerFree && jobs.length > 0) {
    const job = jobs.shift();
    delegateToWorker(job);
    isWorkerFree = false;
  }
}, 1000);

const getWorkerOptions = () => {
  return {
    port: 8901,
    host: 'localhost',
    method: 'POST',
  };
};

const logger = (req, _, next) => {
  console.log(req.method, req.url);
  next();
};

const delegateToWorker = ({ id, count, height, width, tags }) => {
  const options = getWorkerOptions();
  options.path = `/process/${id}/${count}/${height}/${width}/${tags}`;
  const req = http.request(options, (res) =>
    console.log('Got from worker', res.statusCode)
  );

  req.end();
};

app.use(logger);

app.get('/status/:id', (req, res) => {
  res.json(imageSets.get(req.params.id));
});

app.post('/completed-job/:id', (req, res) => {
  isWorkerFree = true;

  let data = '';
  req.on('data', (chunk) => (data += chunk));
  req.on('end', () => {
    const tags = JSON.parse(data);
    imageSets.completeProcessing(req.params.id, tags);
    res.end();
  });
});

app.post('/process/:name/:count/:height/:width/:tags', (req, res) => {
  const job = imageSets.addImageSet(req.params);
  jobs.push(job);
  res.send(`id: ${job.id}`);
  res.end();
});

app.listen(8900, () => console.log('Server listening on port', 8900));
