const randomDistance = () => Math.floor((Math.random() * 10));

class Person {
  #name;
  #distanceTraversed;

  constructor(name) {
    this.#name = name;
    this.#distanceTraversed = 0;
  }

  move() {
    this.#distanceTraversed += randomDistance();
    console.log(`${"-".repeat(this.#distanceTraversed)}\`!${this.#name[0].toUpperCase()}!>`)
  }

  won() {
    return this.#distanceTraversed >= 50;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distanceTraversed;
  }
}

createRacer = name => {
  return new Person(name);
}

runAndCheckIfWon = racer => {
  racer.move();
  return racer.won();
}

const startRace = function (racerNames) {
  const racers = racerNames.map(createRacer);

  const race = setInterval(() => {
    console.clear();
    racers.forEach((racer) => {
      const isRaceFinished = runAndCheckIfWon(racer);
      if (isRaceFinished) {
        console.log(`${racer.name} won`)
        clearInterval(race);
      }
    })
  }, 1000)
}

startRace(process.argv.slice(2));