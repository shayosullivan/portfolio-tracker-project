const express = require('express');
const yahooFinance = require('yahoo-finance');
const routes = require('./controllers');
const app = express();
var moment = require('moment');


// THIS WORKS SUPER WELL!
var util = require('util');

require('colors');

var _ = require('lodash');

var SYMBOLS = [
    'AAPL',
    'AMZN',
    'GOOGL',
    'YHOO',
    'TSLA',
];

yahooFinance.quote({
    symbol: "APPL",
    modules: ['price', 'summaryDetail']       // optional; default modules.
}, function (err, quote) {
    console.log(quote);
});