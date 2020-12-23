/* eslint linebreak-style: [0] */

function showUpdateSpinner() {
  const $spinner = document.querySelector('.spinner-border.d-none');
  console.log($spinner);
  $spinner.classList.remove('d-none');
  $spinner.classList.add('d-block');
}

function updateRates() {
  showUpdateSpinner();
}

function showCurrenciesList(currencies) {
  const $list = document.createElement('div');
  $list.className = 'div currencies-list';

  currencies.sort().forEach((base) => {
    const $item = document.createElement('button');

    $item.classList.add('btn', 'btn-outline-success', 'm-1');
    $item.textContent = base;
    $item.type = 'button';
    // aca me faltaria agregar un event listener para que se pueda reseleccionar monedas lo hago dsp
    $item.addEventListener('click', () => {
      updateRates();
    });
    $list.appendChild($item);
  });
  document.querySelector('#currencies').appendChild($list);
}

function getRates(base = 'EUR', date = 'latest') {
  const BASE_URL = 'https://api.exchangeratesapi.io';
  return fetch(`${BASE_URL}/${date}?base=${base}`)
    .then((response) => response.json())
    .then((response) => response.rates)
    .catch(() => console.log(`Can’t access ${BASE_URL} response. Blocked by browser?`));
}

function getCurrencies() {
  return getRates().then((result) => Object.keys(result).concat('EUR'));
}

function configInputFecha() {
  const $date = document.querySelector('#dateInput');
  const today = (new Date()).toISOString().split('T')[0];
  $date.setAttribute('max', today);
  $date.addEventListener('change', update);
}

function initialize() {
  getCurrencies().then((currencies) => {
    showCurrenciesList(currencies);
  });
}

initialize();
