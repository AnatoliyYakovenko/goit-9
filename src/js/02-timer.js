import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const startBtn = document.querySelector("[data-start]");
let dateInput = document.querySelector("#datetime-picker");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minsEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
let intervalId = null;
let selectedTime = Date.now();

startBtn.addEventListener("click", runTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      startBtn.disabled = true;
      Notify.failure("Please choose a date in the future");
      return;
    }
    selectedTime = selectedDates[0].getTime();
    startBtn.disabled = false;
  },
};
flatpickr(dateInput, options);

function runTimer() {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    let timerTime = selectedTime - Date.now();
    if (timerTime <= 0) {
      clearInterval(intervalId);
      Notify.info("Time is out!");
      startBtn.disabled = false;
      return;
    }
    showDate(timerTime);
  }, 1000);
}

function showDate(timerTime) {
  const { days, hours, minutes, seconds } = convertMs(timerTime);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minsEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
