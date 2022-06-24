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
