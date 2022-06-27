const router = require('express').Router();
const { quote } = require('yahoo-finance');
const yahooFinance = require('yahoo-finance');
const { User, Stock } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   res.render('homepage', {
//     logged_in: req.session.logged_in
//   })
// });
router.get('/', (req, res) => {
  let symbol;
  let symbols = ['AAPL', 'AMZN', 'GOOG'];
  let stocks = [];
  for (let i = 0; i < symbols.length; i++) {
    callApi(symbols[i], i);
  }
  function callApi(symbol, i) {
    yahooFinance.quote(
      {
        symbol: symbol,
        modules: ['financialData'],
      },
      function (err, quotes) {
        if (quotes) {
          const price = quotes.financialData.currentPrice;
          stocks.push({ symbol: symbol, price: price });
          console.log('this is our data', stocks);
          if (i === symbols.length - 1) {
            res.render('homepage', { stocks, loggedIn: req.session.logged_in });
          }
        } else {
          return res.status(404).send('Not found');
        }
      }
    );
  }
});

router.get('/price', withAuth, (req, res) => {
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Stock }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});
module.exports = router;
