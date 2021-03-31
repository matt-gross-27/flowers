const router = require('express').Router();
const User = require('../models/Users');
const { Flowers, Matches, Flags, Blocks, UserInterests, UserTurnoffs, Interests, Turnoffs, Users } = require('../models');

// Render Homepage
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard')
  }
  res.render('home', { ...req.session });
});

// Render Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/')
  }
  Users.findOne({
    where: { id: req.session.user_id },
    attributes: { exclude: ['password'] },
    include: [{
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
      attributes: { exclude: ['password',] },
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
      attributes: { exclude: ['password',] },
      through: { attributes: [] },
      as: 'user_matches'
    }
    ]
  })
    .then(userData => {
      const user = userData.get({ plain: true });

      function showFlowers(userObj) {
        return [
          ...user.sent_flowers_to,
          ...user.sent_block_to,
          ...user.received_block_from,
          ...user.sent_flag_to,
          ...user.received_flag_from
          ].map(x => x.id)
          .includes(userObj.id) === false;
        }
      
      user.received_flowers_from = user.received_flowers_from.filter(showFlowers);

      function showMatches(userObj) {
        return [
          ...user.sent_block_to,
          ...user.received_block_from,
          ...user.sent_flag_to,
          ...user.received_flag_from
          ].map(x => x.id)
          .includes(userObj.id) === false;
        }

        user.user_matches = user.user_matches.filter(showMatches);
      
      res.render('dashboard', { ...user, ...req.session });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Render search Page
router.get('/search', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/')
  }

  Users.findOne({
    where: { id: req.session.user_id },
    attributes: { exclude: ['password'] },
    include: [{
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
      attributes: { exclude: ['password',] },
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
      attributes: { exclude: ['password'] },
      through: { attributes: [] },
      as: 'user_matches'
    },
    {
      model: Users,
      attributes: { exclude: ['password'] },
      through: { attributes: [] },
      as: 'matched_users'
    }
    ]
  })
    .then(userData => {
      const user = userData.get({ plain: true });
      res.render('people', { ...user, ...req.session });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// //Render Login page
router.get('/login', (req, res) => {
  //set up redirect
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
})

//Render Signup page
router.get('/signup', (req, res) => {
  //set up redirect if logged in 
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
})

// Render my-profile pages
router.get('/my-profile', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  Users.findOne({
    where: { id: req.session.user_id },
    include: [{
      model: Interests,
      through: { attributes: [] },
      as: 'users_interests'
    },
    {
      model: Turnoffs,
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
      attributes: { exclude: ['password'] },
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
      attributes: { exclude: ['password'] },
      through: { attributes: [] },
      as: 'user_matches'
    },
    {
      model: Users,
      attributes: { exclude: ['password'] },
      through: { attributes: [] },
      as: 'matched_users'
    }
    ]
  })
    .then(userData => {
      const user = userData.get({ plain: true });
      res.render('my-profile', { ...user, ...req.session });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Render Profile Other Peoples Profile Pages
router.get('/:id', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/')
  }
  Users.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password'] },
    include: [{
      model: Interests,
      through: { attributes: [] },
      as: 'users_interests'
    },
    {
      model: Turnoffs,
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
      attributes: { exclude: ['password'] },
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
      if (!userData) {
        res.status(404).json({ message: `User not found` })
        return;
      }
      const user = userData.get({ plain: true });
      res.render('profile', { ...user, ...req.session});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;