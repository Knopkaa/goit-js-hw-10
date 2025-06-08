import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  createPromise(delay, state)
    .then(resultDelay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${resultDelay}ms`,
        position: 'topRight',
      });
    })
    .catch(resultDelay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${resultDelay}ms`,
        position: 'topRight',
      });
    });
});

/**
 * Створює проміс, який виконується або відхиляється через delay мс
 * @param {number} delay
 * @param {'fulfilled' | 'rejected'} state
 * @returns {Promise<number>}
 */
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}
