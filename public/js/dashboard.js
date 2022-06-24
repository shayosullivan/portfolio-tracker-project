const addSymbolButton = document.getElementById('add-symbol-button');
const symbolInput = document.getElementById('symbol-input');
const sharesInput = document.getElementById('shares-input');
const symbolList = document.getElementById('symbol-list');
const symbols = [];

const config = {
  type: 'pie',
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

const pieChart = new Chart(document.getElementById('chart'), config);

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

function drawList() {
  symbolList.innerHTML = '';
  symbols.forEach((symbol) => {
    const li = document.createElement('li');
    li.innerText =
      symbol.symbol +
      ' ' +
      symbol.shares +
      ' x ' +
      ' $' +
      symbol.price +
      ' = ' +
      '$' +
      round(symbol.price * symbol.shares);
    symbolList.appendChild(li);
  });
}

function addSymbolToChart(event) {
  pieChart.data.labels.push(event.symbol);
  pieChart.data.datasets[0].data.push(round(event.shares * event.price));
  pieChart.data.datasets[0].backgroundColor.push(getRandomColor());
  pieChart.update();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function round(value) {
  return Math.round(value * 100) / 100;
}
