const chunk = function (list, size, overlap) {
  if (list.length === 0) return list;

  if (list.length <= overlap) return [list];

  const currentChunk = list.slice(0, size);
  const remaining = list.slice(size - overlap);
  return [currentChunk].concat(chunk(remaining, size, overlap));
}

const chunkOfTwo = (list, overlap) => {
  const chunks = chunk(list, 2, overlap);
  if (chunks[chunks.length - 1].length === 1) chunks.pop();

  return chunks;
};

exports.chunkOfTwo = chunkOfTwo;