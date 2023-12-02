const express = require('express');
const http = require('http');

const app = express();
let id = 0;
let isWorkerFree = true;
const jobs = [];

setInterval(() => {
  if (isWorkerFree && jobs.length > 0) {
    const job = jobs.shift();
    const { id, params } = job;
    delegateToWorker(id, params);
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

const delegateToWorker = (id, { count, height, width, tags }) => {
  const options = getWorkerOptions();
  options.path = `/process/${id}/${count}/${height}/${width}/${tags}`;
  const req = http.request(options, (res) => {
    console.log('Got from worker', res.statusCode);
  });
  req.end();
};

app.use(logger);

app.post('/completed-job/:id', (_, res) => {
  isWorkerFree = true;
  res.end();
});

app.post('/process/:name/:count/:height/:width/:tags', (req, res) => {
  res.send(`id: ${id}`);
  res.end();
  jobs.push({ id, params: req.params });
  id++;
});

app.listen(8900, () => console.log('Server listening on port', 8900));
