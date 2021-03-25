const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// ADD MORE app.use HERE

// catch all route
router.use((req, res) => {
  res.status(404).json({ message: "Nothing to see here" }).end();
});

module.exports = router;