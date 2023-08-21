const log = (val, msg) => {
  console.log({ val, msg });
  return val;
};

const calculateMax = (a, b) => Math.max(a, b);

fetch('https://pokeapi.co/api/v2/berry/')
  .then((res) => log(res, 'fetching the api'))
  .then((res) => log(res.json(), 'converting to json'))
  .then((content) => log(content.results, 'results'));
