const router = require('express').Router();

const userRoutes = require('./user-routes');
const interestRoutes = require('./interest-routes');
const turnoffRoutes = require('./turnoff-routes');

router.use('/users', userRoutes);
router.use('/interests', interestRoutes);
router.use('/turnoffs', turnoffRoutes);

module.exports = router;