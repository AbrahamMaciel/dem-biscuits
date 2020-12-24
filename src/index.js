/* eslint linebreak-style: [0] */

function hideLoadingSpinner() {
  const $spinner = document.querySelector('.spinner-border.d-block');
  $spinner.classList.remove('d-block');
  $spinner.classList.add('d-none');
}

function showLoadingSpinner() {
  const $spinner = document.querySelector('.spinner-border.d-none');
  $spinner.classList.remove('d-none');
  $spinner.classList.add('d-block');
}

function getSelectedCurrency() {
  const $activeItem = document.querySelector('.btn.active');
  if ($activeItem) {
    return document.querySelector('.btn.active').dataset.base;
  }
  return undefined;
}

function getSelectedDate() {
  const selectedDate = document.querySelector('#dateInput').value;
  return selectedDate || undefined;
}

function getRates(base = 'EUR', date = 'latest') {
  const BASE_URL = 'https://api.exchangeratesapi.io';
  return fetch(`${BASE_URL}/${date}?base=${base}`)
    .then((response) => response.json())
    .then((response) => response.rates)
    .catch(() => console.log(`Can’t access ${BASE_URL} response. Blocked by browser?`));
}

function showRatesList(rates) {
  const $ratesList = document.querySelector('#currencies_data');
  $ratesList.innerHTML = '';

  Object.keys(rates).sort().forEach((currency) => {
    const $row = document.createElement('tr');
    const $currency = document.createElement('th');
    $currency.setAttribute('scope', 'col');
    const $rate = document.createElement('td');

    $currency.textContent = currency;
    $rate.textContent = rates[currency];

    $row.appendChild($currency);
    $row.appendChild($rate);
    $ratesList.appendChild($row);
  });
}

function updateRatesList() {
  showLoadingSpinner();
  getRates(getSelectedCurrency(), getSelectedDate())
    .then((rates) => {
      showRatesList(rates);
      hideLoadingSpinner();
    });
}

function updateButtonState($item) {
  const $activeButtons = document.querySelectorAll('.btn.active');
  $activeButtons.forEach((button) => {
    button.classList.remove('active');
  });
  $item.classList.add('active');
}

function showCurrenciesList(currencies) {
  const $list = document.createElement('div');
  $list.className = 'div currencies-list';

  currencies.sort().forEach((base) => {
    const $item = document.createElement('button');

    $item.classList.add('btn', 'btn-outline-success', 'm-1');
    $item.textContent = base;
    $item.type = 'button';
    $item.dataset.base = base;
    // aca me faltaria agregar un event listener para que se pueda reseleccionar monedas lo hago dsp
    $item.addEventListener('click', () => {
      updateButtonState($item);
      updateRatesList();
    });
    $list.appendChild($item);
  });
  document.querySelector('#currencies').appendChild($list);
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
