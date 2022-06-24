const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes2 = require('./home-routes');

router.use('/', homeRoutes2);
router.use('/api', apiRoutes);

module.exports = router;
