let startTime = 0;
let interval;
let isRunning = false;
let elapsed = 0;

function formatTime(ms) {
  const totalMilliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor(totalSeconds / 3600);

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(totalMilliseconds).padStart(3, '0')
  );
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  document.getElementById('display').innerText = formatTime(diff);
}

document.getElementById('start').addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
  }
});

document.getElementById('stop').addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    elapsed += Date.now() - startTime;
    clearInterval(interval);
  }
});

document.getElementById('reset').addEventListener('click', () => {
  isRunning = false;
  startTime = 0;
  elapsed = 0;
  clearInterval(interval);
  document.getElementById('display').innerText = "00:00:00.000";
  document.getElementById('lapList').innerHTML = "";
});

document.getElementById('lap').addEventListener('click', () => {
  if (isRunning) {
    const now = Date.now();
    const diff = now - startTime + elapsed;
    const li = document.createElement("li");
    li.innerText = formatTime(diff);
    document.getElementById("lapList").appendChild(li);
  }
});
