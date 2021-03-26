const router = require('express').Router();
const User = require('../models/Users');

// TEST GET / route
router.get('/', (req, res) => {
  res.render('test', { message: 'Hello from flowers 💐' });
});

router.get('/search-results', async (req, res) => {
  let users = await User.findAll();

  users = users.map(user => user.get({ plain: true }));

  console.log(users, 'users')
  // res.render('test', { message: 'Hello from flowers 💐' });
  res.render('people', { users });
});

module.exports = router;