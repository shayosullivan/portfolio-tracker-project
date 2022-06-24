const addSymbolButton = document.getElementById('add-symbol-button');
const symbolInput = document.getElementById('symbol-input');
const sharesInput = document.getElementById('shares-input');
const symbolList = document.getElementById('symbol-list');
const symbols = [];

const config = {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [
      {
        label: 'My Portfolio',
        backgroundColor: [],
        data: [],
      },
    ],
  },
  options: {},
};

addSymbolButton.addEventListener('click', () => {
  const symbolInputValue = symbolInput.value.toUpperCase();
  const sharesInputValue = +sharesInput.value;
  addSymbol(symbolInputValue, sharesInputValue);
  symbolInput.value = '';
  sharesInput.value = '';
});

function addSymbol(symbol, shares) {
  fetch('/price?symbol=' + symbol)
    .then((response) => response.json())
    .then((data) => {
      const symbolData = { ...data, shares };
      symbols.push(symbolData);
      drawList();
      addSymbolToChart(symbolData);
    });
}
