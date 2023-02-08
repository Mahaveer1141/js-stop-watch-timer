let currentIntervalId, startTime;
const timerDisplay = document.getElementById("display"),
  startButton = document.getElementById("start"),
  stopButton = document.getElementById("stop"),
  lapButton = document.getElementById("lap"),
  resetButton = document.getElementById("reset"),
  lapsList = document.getElementById("laps");

startButton.addEventListener("click", function () {
  startTime = Date.now();
  startButton.disabled = true;
  stopButton.disabled = false;
  lapButton.disabled = false;
  currentIntervalId = setInterval(function () {
    const time = Date.now() - startTime;
    timerDisplay.innerHTML = formatTime(time);
  }, 1);
});

stopButton.addEventListener("click", function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  lapButton.disabled = true;
  clearInterval(currentIntervalId);
});

lapButton.addEventListener("click", function () {
  if (!startTime) return;
  let lapTime = Date.now() - startTime;
  let lapTimeDisplay = formatTime(lapTime);
  let lap = document.createElement("p");
  lap.innerHTML = lapTimeDisplay;
  lapsList.appendChild(lap);
});

resetButton.addEventListener("click", function () {
  timerDisplay.innerHTML = "00:00:00:000";
  lapsList.innerHTML = "";
  lapButton.disabled = true;
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(currentIntervalId);
});

function formatTime(time) {
  let milliseconds = time % 1000;
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / 1000 / 60) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (milliseconds < 100) {
    milliseconds = "0" + milliseconds;
  }
  if (milliseconds < 10) {
    milliseconds = "0" + milliseconds;
  }

  return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}
