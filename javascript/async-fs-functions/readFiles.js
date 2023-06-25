const fs = require("fs");

// fs.readFile("./files/sample-file-1.txt", "utf-8", (err, data) => {
//   if (err) return;
//   console.log(data);
//   fs.readFile("./files/sample-file-2.txt", "utf-8", (err, data) => {
//     if (err) return;
//     console.log(data);
//     fs.readFile("./files/sample-file-3.txt", "utf-8", (err, data) => {
//       if (err) return;
//       console.log(data);
//     });
//   });
// });

const readFiles = fileNames => {
  if (fileNames.length === 0) return;
  const [currentFile, ...rest] = fileNames;

  fs.readFile(currentFile, "utf-8", (err, data) => {
    if (err) return;
    console.log(data);
    readFiles(rest);
  });
};

readFiles(["./files/sample-file-1.txt", "./files/sample-file-2.txt", "./files/sample-file-3.txt"]);