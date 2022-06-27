const router = require('express').Router();

const userRoutes = require('./userRoutes');
const stockRoutes = require('./stock-routes');

router.use('/users', userRoutes);
router.use('/stocks', stockRoutes);
module.exports = router;
