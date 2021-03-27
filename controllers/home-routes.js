const router = require('express').Router();

// TEST GET / route
router.get('/', (req, res) => {
  res.render('test', { message: 'hello from flowers 💐' });
});

//SIGNUP
router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router;