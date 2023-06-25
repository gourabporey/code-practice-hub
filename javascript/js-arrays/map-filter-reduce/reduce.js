const isEven = function(num) {
  return num % 2 === 0;
}

const isDivisibleBy5 = function(num) {
  return num % 5 === 0;
}

const isPrime = function(num) {
  let i = 2;

  while(i <= Math.sqrt(num)) {
    if(num % i === 0) return false;
    i++;
  }

  return true;
}

const separate = function(numbers, criteria) {
  const initialContext = [[],[]];

  return numbers.reduce(function(context, number) {
    const newContext = context.slice(0);
    const partition = criteria(number) ? newContext[0] : newContext[1];
    partition.push(number);
    return newContext;
  }, initialContext);
}

const makeChunk = function(chunks, element, size) {
  const newChunks = chunks.slice(0);
  const lastChunkIndex = newChunks.length - 1;
  const lastChunk = newChunks[lastChunkIndex];

  if(lastChunk.length < size) {
    lastChunk.push(element);
  } else {
    newChunks.push([element]);
  }

  return newChunks;
}

const chunk = function(list, size) {
  return list.reduce(function(chunks, element) {
    return makeChunk(chunks, element, size);
  }, [[]]);
}

const isSubset = function(potentialSuperset, potentialSubset) {
  return potentialSubset.every(function(element) {
    return potentialSuperset.includes(element);
  });
}

const checkLotteryStatus = function(myTicket, winningTickets) {
  return winningTickets.some(function(winningTicket) {
    return myTicket.some(function(ticket) {
      return isSubset(winningTicket, ticket);
    });
  });
}

const frequency = function(counts, char) {
  if(char in counts) {
    counts[char] += 1;
  } else {
    counts[char] = 1;
  }

  return counts;
}

const frequencies = function(text) {
  return text.split("").reduce(frequency, {});
}

const isGreaterSequence = function(a, b) {
  return +(a.toString() + b) > +(b.toString() + a) ? -1 : 1;
}

const largestNumber = function(numbers) {
  const numberSequence = numbers.sort(isGreaterSequence);
  return +numberSequence.join("");
}
