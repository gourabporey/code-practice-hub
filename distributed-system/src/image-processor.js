const processImages = ({ count, height, width, tags }) => {
  return new Promise((resolve) => {
    for (let c = 0; c <= +count; c++) {
      for (let h = 0; h <= +height; h++) {
        for (let w = 0; w <= +width; w++) {
          const b = c + h - w;
        }
      }
    }

    const tagsSeparated = tags.split('_');

    resolve(tagsSeparated);
  });
};

module.exports = { processImages };
