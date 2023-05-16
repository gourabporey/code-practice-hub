class Person {
  #isInfected;
  #isVaccinated;

  constructor() {
    this.#isInfected = false;
    this.#isVaccinated = false;
  }

  get isInfected() {
    return this.#isInfected;
  }

  get isVaccinated() {
    return this.#isVaccinated;
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

const tick = (delay, terminatingFn, updateFn) => {
  if (terminatingFn()) {
    console.log("Corona eradicated from your city");
    return;
  }

  setTimeout(() => {
    updateFn();
    tick(delay, terminatingFn, updateFn);
  }, delay);
}

const city = Array.from({ length: 10 }, () => {
  return Array.from({ length: 10 }, () => new Person())
});

const showStatus = () => {
  console.clear();
  console.log(city.map(place => {
    return place.map(person => person.toString()).join(" ");
  }).join("\n"));
}

const affect = () => {
  setTimeout(() => {
    const place = Math.floor(Math.random() * 10);
    const community = Math.floor(Math.random() * 10);
    const person = city[place][community];
    person.getInfected();
  }, 1000);
}

const vaccinate = () => {
  setTimeout(() => {
    const place = Math.floor(Math.random() * 10);
    const community = Math.floor(Math.random() * 10);
    const person = city[place][community];

    if (!person.isVaccinated) {
      person.getVaccinated();
    }
  }, 2000);
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

tick(
  200,
  coronaEradicated,
  update
);