const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const { json } = require('express/lib/response');
// add models here
// const { Gallery, Painting } = require('../models');
const { getQuotes } = require("../utils/helpers")
// RENDER THE PAGE THEY MADE
const symbols = ["AAPL", "MSFT"]
// router.get('/', async (req, res) => {
//   try {
//     const latestStocks = await getQuotes(symbols)

//     console.log(latestStocks)

//     res.render('homepage', {
//       latestStocks: JSON.stringify(latestStocks),
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// })

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const latestStocks = await getQuotes(symbols)
    // const users = userData.map((project) => project.get({ plain: true }));
    console.log("latest stocks from HomeRoutes: ", latestStocks)

    res.render('homepage', {
      latestStocks: JSON.stringify(latestStocks),
      // users,
      logged_in: req.session.logged_in,
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
