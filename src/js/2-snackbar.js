import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formm = document.querySelector(`.form`);
formm.addEventListener(`submit`, function (event) {
    event.preventDefault();

    const form = event.target;
    const delay = parseInt(form.delay.value);
    const state = form.state.value;

    function createPromise(delay, state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === `fulfilled`) {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        })
    }


    createPromise(delay, state)
        .then(delay => {
            iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight'
        })
        })
        .catch(delay => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            })
        })
});

