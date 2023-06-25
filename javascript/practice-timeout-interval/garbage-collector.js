let garbageQueue = [];
let itemsExamined = 0;

const isEven = num => num % 2 === 0;

const garbageIn = timeout => {
  setInterval(() => {
    const pushedGarbages = [];

    for (let garbageCount = 0; garbageCount < 5; garbageCount++) {
      const garbage = Math.floor(Math.random() * 10);
      garbageQueue.push(garbage);
      pushedGarbages.push(garbage)
    }

    console.log(`Pushed ${pushedGarbages}`);
  }, timeout);
}

garbageIn(2000);

const recycler = timeout => {
  setInterval(() => {
    for (let garbageChecked = 0; garbageChecked < 5; garbageChecked++) {
      const garbageToExamine = garbageQueue[itemsExamined];

      if (isEven(garbageToExamine)) {
        console.log(`\tRecycled: ${garbageToExamine}`);
      }

      itemsExamined++;
    }
  }, timeout);
}

recycler(2000);