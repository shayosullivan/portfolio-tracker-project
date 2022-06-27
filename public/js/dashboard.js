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

const myChart = new Chart(document.getElementById('chart'), config);

addSymbolButton.addEventListener('click', () => {
  const symbolInputValue = symbolInput.value.toUpperCase();
  const sharesInputValue = sharesInput.value;
  addSymbol(symbolInputValue, sharesInputValue);
  symbolInput.value = '';
  sharesInput.value = '';
});

const addSymbol = async (symbol, shares) => {
  if (symbol && shares) {
    const response = await fetch(`/api/stocks`, {
      method: 'POST',
      body: JSON.stringify({ symbol, shares }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    window.location.replace('/dashboard');
  } else {
    alert('Please enter both symbol and shares');
  }
};

function addSymbolToChart(symbol) {
  myChart.data.labels.push(symbol.symbol);
  myChart.data.datasets[0].data.push(round(symbol.shares * symbol.price));
  myChart.data.datasets[0].backgroundColor.push(getRandomColor());
  myChart.update();
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
