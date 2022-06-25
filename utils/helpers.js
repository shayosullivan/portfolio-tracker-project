const express = require('express');
const yahooFinance = require('yahoo-finance');
const routes = require('../controllers');
const app = express();
var moment = require('moment');
const util = require('util');
require('colors');
var _ = require('lodash');
// THIS WORKS SUPER WELL!

module.exports = {
    index_up_down: value => {
        if (value > 0) {
            return ('up')
        } else {
            return ('down')
        }
    }
}

// const symbols = [
//     'AAPL',
//     'AMZN',
//     'GOOGL',
//     'MSFT',
//     'TSLA',
// ];

// function getQuotes(symbols) {

//     const today = moment().format("YYYY-MM-DD")
//     const since = moment().subtract(1, "days");
//     const yesterday = moment(since).format("YYYY-MM-DD")

//     const promise1 = new Promise((resolve, reject) => {
//         yahooFinance.historical({
//             symbols: symbols,
//             from: yesterday,
//             to: today,
//             period: 'd'
//         }, function (err, result) {
//             if (err) { throw err; }
//             const data = [
//                 {
//                     "ticker": "AAPL",
//                     "date": "2022-06-22",
//                     "close": "135.350006"
//                 },

//             ]
//             keyArr = []
//             for (let key in result) {
//                 keyArr.push(key)
//             }
//             console.log(keyArr)
            // construct an object for each one of those keys

            // _.each(result, function (quotes, symbol) {
            //     console.log(util.format(
            //         '=== %s (%d) ===',
            //         symbol,
            //         quotes.length
            //     ).cyan);
            //     if (quotes[0]) {
            //         console.log(
            //             '%s\n...\n%s',
            //             JSON.stringify(quotes[0], null, 2),
            //             JSON.stringify(quotes[quotes.length - 1], null, 2)
            //         );
            //         resolve(result)
            //     } else {
            //         console.log('N/A');
            //     }
            // });
//             const formattedResult = []
//             for (let key in result) {
//                 formattedResult.push({
//                     ticker: result[key][0].symbol,
//                     open: result[key][0].open,
//                     close: result[key][0].close,
//                     high: result[key][0].high,
//                     low: result[key][0].low,


//                 })
//             }

//             resolve(formattedResult)
//         });
//     });
//     console.log("Promise: ", promise1)
//     return promise1


// }

// module.exports = { getQuotes }





