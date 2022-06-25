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
    'MSFT',
    'TSLA',
];
const today = moment().format("YYYY-MM-DD")
console.log(today)
const since = moment().subtract(1, "days");
const yesterday = moment(since).format("YYYY-MM-DD")
console.log("THIS IS YESTERDAY: " + yesterday)


yahooFinance.historical({
    symbols: SYMBOLS,
    from: yesterday,
    to: today,
    period: 'd'
}, function (err, result) {
    if (err) { throw err; }
    _.each(result, function (quotes, symbol) {
        console.log(util.format(
            '=== %s (%d) ===',
            symbol,
            quotes.length
        ).cyan);
        if (quotes[0]) {
            console.log(
                '%s\n...\n%s',
                JSON.stringify(quotes[0], null, 2),
                JSON.stringify(quotes[quotes.length - 1], null, 2)
            );
        } else {
            console.log('N/A');
        }
    });
});