const express = require('express');
const yahooFinance = require('yahoo-finance');
const routes = require('./controllers');
const app = express();

const stock1 = 'AAPL'
const stock2 = 'QQQ'
const stock3 = 'GME'

yahooFinance.historical({
    symbol: [stock1],
    from: '2022-06-1',
    to: '2022-06-2',
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, quotes) {
    //...
    console.log(quotes)
});