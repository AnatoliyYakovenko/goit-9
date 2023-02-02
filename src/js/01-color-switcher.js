function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let timerId = null;

function startChangeColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopChangeColor() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
}

startBtn.addEventListener("click", startChangeColor);
stopBtn.addEventListener("click", stopChangeColor);
