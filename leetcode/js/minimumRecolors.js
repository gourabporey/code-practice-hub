var minimumRecolors = function(blocks, k) {
  const chunks = chunk(blocks, k);
  console.log(chunks);
  return Math.min(...chunks.map(findBlacksRequired));
};

const findBlacksRequired = (str) => {
  return [...str].filter(l => l === 'W').length;
}

const chunk = (elements, chunkSize) => {
  if(elements.length <= chunkSize) return [...elements];
  const chunks = [];
  for(let i = 0; i <= elements.length - chunkSize; i++) {
    chunks.push(elements.slice(i, i + chunkSize));
  }
  return chunks;
}

console.log(minimumRecolors("WBBWWBBWBW", 7));
console.log(minimumRecolors("WBWBBBW", 2));
