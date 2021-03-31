const router = require('express').Router();

const filterRoute = require('./filter-route');
const userRoutes = require('./user-routes');
const interestRoutes = require('./interest-routes');
const turnoffRoutes = require('./turnoff-routes');

router.use('/users', userRoutes);
router.use('/interests', interestRoutes);
router.use('/turnoffs', turnoffRoutes);
router.use('/filter', filterRoute);

module.exports = router;