const watchStdin = function (time, onData, shouldExit) {
  const interval = setInterval(() => {
    process.stdin.setEncoding("utf-8");
    const data = process.stdin.read();
    if (data) {
      onData(data);
      if (shouldExit(data)) {
        clearInterval(interval);
      }
    }
  }, time);
}

const onData = (data) => {
  console.log(data);
}

const shouldExit = data => {
  return data.trim() === ".exit";
}

watchStdin(100, onData, shouldExit);