const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });


  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
