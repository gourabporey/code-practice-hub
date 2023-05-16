function grid () {
  const grid = [];

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      grid[x][y] = 0;
    }
  }

  return grid;
}

