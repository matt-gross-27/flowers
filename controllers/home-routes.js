const router = require('express').Router();

// TEST GET / route
router.get('/', (req, res) => {
  res.render('test', { message: 'hello from flowers 💐' });
});

module.exports = router;