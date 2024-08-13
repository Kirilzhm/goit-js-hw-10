import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector(`button[data-start]`);
const dateTimePicker = document.querySelector(`#datetime-picker`);
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

let countdownInterval;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
          iziToast.error({
              title: `Error`,
              message: `Please choose a date in the future`,
          });
          startButton.disabled = true;
      } else {
          userSelectedDate = selectedDate;
          startButton.disabled = false;
      }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener(`click`, () => {
    if (userSelectedDate) {
        startButton.disabled = true;
        dateTimePicker.disabled = true;
        startCountdown(userSelectedDate);
    }
});

function startCountdown(endTime) {
    countdownInterval = setInterval(() => {
        const timeLeft = endTime - new Date();
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            updateTimeUI(0, 0, 0, 0);
            dateTimePicker.disabled = false;
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeLeft);
            updateTimeUI(days, hours, minutes, seconds)
        }
    }, 1000);
};

function addLeadingZero(value) {
    return String(value).padStart(2, `0`);
}

function updateTimeUI(days, hours, minutes, seconds) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
   secondsSpan.textContent = addLeadingZero(seconds);
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

iziToast.settings({
    position: 'topRight',  
});


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
