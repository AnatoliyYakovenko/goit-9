import { Notify } from "notiflix/build/notiflix-notify-aio";

const formRef = document.querySelector(".form");

formRef.addEventListener("submit", makePromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function makePromises(event) {
  event.preventDefault();

  const form = event.currentTarget;

  let delay = +form.elements.delay.value;
  const step = +form.elements.step.value;
  const amount = +form.elements.amount.value;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
