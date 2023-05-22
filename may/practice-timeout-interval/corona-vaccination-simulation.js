class Person {
  #isInfected;
  #isVaccinated;
  #location;

  constructor(location) {
    this.#location = { ...location };
    this.#isInfected = false;
    this.#isVaccinated = false;
  }

  get isInfected() {
    return this.#isInfected;
  }

  get isVaccinated() {
    return this.#isVaccinated;
  }

  get location() {
    return { ...this.#location };
  }

  getInfected() {
    this.#isInfected = !this.#isVaccinated;
  }

  getVaccinated() {
    this.#isVaccinated = true;
    this.#isInfected = false;
  }

  toString() {
    if (this.#isVaccinated) {
      return "\x1b[32m+\x1b[0m";
    }

    if (this.#isInfected) {
      return "\x1b[31m*\x1b[0m";
    }

    return "o";
  }
}

let timeTaken = 0;

const tick = (delay, terminatingFn, updateFn) => {
  if (terminatingFn()) {
    console.log(`Corona eradicated from your city in ${timeTaken} days`);
    return;
  }

  setTimeout(() => {
    timeTaken++;
    updateFn();
    tick(delay, terminatingFn, updateFn);
  }, delay);
}

const city = Array.from({ length: 10 }, (_, placeIndex) => {
  return Array.from({ length: 10 }, (_, personIndex) => new Person({ x: placeIndex, y: personIndex }))
});

const infected = [];

const startInfection = () => {
  const place = Math.floor(Math.random() * 10);
  const community = Math.floor(Math.random() * 10);
  const person = city[place][community];

  person.getInfected();
  infected.push(person);
}

const exists = value => value !== undefined;

const getNeighbours = person => {
  const { x, y } = person.location;
  const neighbours = [];

  for (row = x - 1; row <= x + 1; row++) {
    if (exists(city[row])) {
      for (col = y - 1; col <= y + 1; col++) {
        if (exists(city[row][col])) {
          neighbours.push(city[row][col]);
        }
      }
    }
  }

  return neighbours;
}

const affect = () => {
  setTimeout(() => {
    infected.forEach(person => {
      getNeighbours(person).forEach(neighbour => {
        if (!neighbour.isVaccinated && !neighbour.isInfected) {
          neighbour.getInfected();
          infected.push(neighbour);
        }
      });
    });
  }, 1000);
}

const vaccinate = () => {
  setTimeout(() => {
    const place = Math.floor(Math.random() * 10);
    const community = city[place];
    community.forEach(person => person.getVaccinated());
  }, 3000);
}

const showStatus = () => {
  console.clear();
  console.log(city.map(place => {
    return place.map(person => person.toString()).join(" ");
  }).join("\n"));
}

const isVaccinated = (person) => {
  return person.isVaccinated;
}

const coronaEradicated = () => {
  return city.every(place => place.every(person => isVaccinated(person)));
}

const update = () => {
  affect();
  vaccinate();
  showStatus();
}

startInfection();

tick(
  200,
  coronaEradicated,
  update
);