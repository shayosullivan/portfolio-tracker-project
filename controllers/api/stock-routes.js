const router = require('express').Router();
const { Stock } = require('../../models');
const withAuth = require('../../utils/auth');

// post new stock into database
router.post('/', withAuth, async (req, res) => {
  try {
    const newStock = await Stock.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newStock);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update stock after editing
router.put('/:id', withAuth, async (req, res) => {
  try {
    const newStock = await Stock.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(newStock);
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete stock by id based on user choice
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const stockData = await Stock.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!stockData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }

    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
