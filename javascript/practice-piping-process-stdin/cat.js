const fs = require('fs');

const readInputFromStdin = (onData) => {
  process.stdin.setEncoding('utf-8');

  const readData = () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      if (process.stdin._readableState.closed) {
        clearInterval(readTimer);
        onData(chunk);
      };
    };
  };

  const readTimer = setInterval(readData, 100);
};

readInputFromStdin(console.log)