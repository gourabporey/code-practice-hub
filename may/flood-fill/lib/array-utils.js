const chunk = function (list, size, overlap) {
  if (list.length === 0) return list;

  if (list.length <= overlap) return [list];

  const currentChunk = list.slice(0, size);
  const remaining = list.slice(size - overlap);
  return [currentChunk].concat(chunk(remaining, size, overlap));
};

exports.chunk = chunk;