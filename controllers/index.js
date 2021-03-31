const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// catch all route
router.use((req, res) => {
  res.redirect('/'); 
});

module.exports = router;