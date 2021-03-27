const router = require('express').Router();
const User = require('../models/Users');
const { Flowers, Matches, Flags, Blocks, UserInterests, UserTurnoffs, Interests, Turnoffs, Users } = require('../models');

// Get / Route for (Dashboard/ Homepage)
// Get / Route for (Dashboard/ Homepage)
router.get('/', (req, res) => {
  Users.findOne({
    where: { id: 1 },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Interests,
        attributes: ['interest_name'],
        through: { attributes: [] },
        as: 'users_interests'
      },
      {
        model: Turnoffs,
        attributes: ['turnoff_name'],
        through: { attributes: [] },
        as: 'users_turnoffs'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'sent_flowers_to',
      },
      {
        model: Users,
        // attributes: ['id', 'first_name', 'last_name', 'description', 'profile_picture_src', 'age', 'gender', 'latitude', 'longitude'],
        attributes: { exclude: ['password', ] },
        through: { attributes: [] },
        as: 'received_flowers_from'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'sent_block_to'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'received_block_from'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'sent_flag_to'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'received_flag_from'
      },
      {
        model: Users,
        through: { attributes: [] },
        as: 'user_matches'
      },
      {
        model: Users,
        through: { attributes: [] },
        as: 'matched_users'
      }
    ]
  })
    .then(userData => {
      const user = userData.get({ plain: true });
      console.log(user);
      res.render('test-dashboard' , user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/search-results', async (req, res) => {
  let users = await User.findAll();

  users = users.map(user => user.get({ plain: true }));

  console.log(users, 'users')
  // res.render('test', { message: 'Hello from flowers 💐' });
  res.render('people', { users });
  Users.findOne({
    where: { id: 1 },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Interests,
        attributes: ['interest_name'],
        through: { attributes: [] },
        as: 'users_interests'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'sent_flowers_to',
      },
      {
        model: Users,
        // attributes: ['id', 'first_name', 'last_name', 'description', 'profile_picture_src', 'age', 'gender', 'latitude', 'longitude'],
        attributes: { exclude: ['password', ] },
        through: { attributes: [] },
        as: 'received_flowers_from'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'sent_block_to'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'received_block_from'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'sent_flag_to'
      },
      {
        model: Users,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'received_flag_from'
      },
      {
        model: Users,
        through: { attributes: [] },
        as: 'user_matches'
      },
      {
        model: Users,
        through: { attributes: [] },
        as: 'matched_users'
      }
    ]
  })
    .then(userData => {
      const user = userData.get({ plain: true });
      console.log(user);
      res.render('test-dashboard' , user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//SIGNUP
router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router;