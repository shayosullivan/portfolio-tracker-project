const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const { User } = require('../models');
const withAuth = require('../utils/auth');
const { json } = require('express/lib/response');
// add models here
// const { Gallery, Painting } = require('../models');
const { getQuotes } = require("../utils/helpers")
// RENDER THE PAGE THEY MADE
const symbols = ["AAPL", "MSFT"]
router.get('/', async (req, res) => {
  try {
    const latestStocks = await getQuotes(symbols)

    res.render('homepage', {
      latestStocks: JSON.stringify(latestStocks),
      ticker: JSON.stringify(ticker),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['username', 'ASC']],
//     });

//     const latestStocks = await getQuotes(symbols)
//     const users = userData.map((project) => project.get({ plain: true }));
//     console.log("latest stocks from HomeRoutes: ", latestStocks)
//     console.log("users from HomeRoutes: ", users)

//     res.render('homepage', {
//       latestStocks: JSON.stringify(latestStocks),
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/price', (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) {
    return res.status(404).send('Not found');
  }
  yahooFinance.quote(
    {
      symbol: symbol,
      modules: ['financialData'],
    },
    function (err, quotes) {
      if (quotes && quotes.financialData && quotes.financialData.currentPrice) {
        res.send({
          symbol: symbol,
          price: quotes.financialData.currentPrice,
        });
      } else {
        return res.status(404).send('Not found');
      }
    }
  );
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
