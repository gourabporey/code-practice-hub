const timer = function (timeInMinutes) {
  let timeLeftInSeconds = timeInMinutes * 60;

  const timerInterval = setInterval(() => {
    console.clear();
    timeLeftInSeconds -= 1;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    console.log(`${minutesLeft}:${secondsLeft}`);
  }, 1000);

  setTimeout(() => {
    clearInterval(timerInterval);
    console.clear();
    console.log("Times Up");
  }, timeLeftInSeconds * 1000);
}

timer(2);