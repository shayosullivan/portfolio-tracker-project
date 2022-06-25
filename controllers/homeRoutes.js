const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const { User, Portfolio } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   res.render('homepage', {
//     loggedIn: req.session.loggedIn
//   })
// }
// );

router.get('/', async (req, res) => {
<<<<<<< HEAD
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
=======
  const symbol = "SNAP"
  yahooFinance.quote(
    {
      symbol: symbol,
      modules: ['financialData'],
    },
    function (err, quotes) {
      if (quotes && quotes.financialData && quotes.financialData.currentPrice) {
        // res.send({
        //   symbol: symbol,
        //   price: quotes.financialData.currentPrice,
        // });
        res.render('homepage', {
          symbol: symbol,
          price: quotes.financialData.currentPrice,
          loggedIn: req.session.loggedIn
        })
      } else {
        return res.status(404).send('Not found');
      }
    }
  );
>>>>>>> e0266032c7a6865f981064bbc071da852743c8c4
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
      include: [{ model: Portfolio }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: true,
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

module.exports = router;
