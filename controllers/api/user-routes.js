const router = require('express').Router();
const { Users, Flowers, Matches, Blocks, Flags, Interests, Turnoffs, UserInterests, UserTurnoffs } = require('../../models');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');
const getDistance = require('./getDistance');

// CREATE
// POST USER /api/users -> (add a new user to the database and log in)
router.post('/', (req, res) => {
  /* expects to receive req.body === <Object Bellow>
    {
      "email": "test@hotmail.com",
      "first_name": "Jane",
      "last_name": "Test",
      "password": "supersecret",
      "description": "I'm a 35 year old pan-sexual who likes music and tv. Looking for a friend for my dog spike",
      "profile_picture_src": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "age": 35,
      "gender": "f",
      "interested_in_m": true,
      "interested_in_f": true,
      "interested_in_o": true,
      "interested_in_min_age": 20,
      "interested_in_max_age": 50,
      "latitude": 34.08929,
      "longitude": -118.382890
    } */
  console.log(req.body);
  Users.create(req.body)
    .then(userData => {
      const user = userData.get({ plain: true });
      // log user in on create (so sign up auto logs in)
      console.log(`req.session === ${req.session}`);
      req.session.save(() => {
        req.session.user_id = user.id
        req.session.name = `${user.first_name} ${user.last_name}`
        req.session.loggedIn = true;
        res.json({ user: userData, session: req.session })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.put('/', (req, res) => {
  /* expects to receive req.body === <Object Bellow>
    {
      "email": "test@hotmail.com",
      "first_name": "Jane",
      "last_name": "Test",
      "password": "supersecret",
      "description": "I'm a 35 year old pan-sexual who likes music and tv. Looking for a friend for my dog spike",
      "profile_picture_src": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "age": 35,
      "gender": "f",
      "interested_in_m": true,
      "interested_in_f": true,
      "interested_in_o": true,
      "interested_in_min_age": 20,
      "interested_in_max_age": 50,
      "latitude": 34.08929,
      "longitude": -118.382890
    } */
  const { id, ...data } = req.body;
  console.log(req.body, data, id);
  Users.update(data, { where: { id: req.body.id }, returning: true, plain: true })
    .then(() => {
      return Users.findOne({
        where: { id: req.body.id }
      })
    })
    .then(userData => {
      const user = userData;
      // log user in on create (so sign up auto logs in)
      console.log('User Data --------------------', userData);

      res.json({ user: userData })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

// POST LOGIN /api/users/login -> (create a session object with properties { name, user_id, loggedIn})
router.post('/login', (req, res) => {
  //expects req.body = { "email": "STR(isEmail)", "password": "STR(len >= 8)" }
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(userData => {
      console.log(userData);
      if (!userData) {
        res.status(401).json({ message: `Invalid credentials, verify your email and password.` });
        return;
      }
      bcrypt.compare(req.body.password, userData.password)
        .then(validPassword => {
          if (!validPassword) {
            res.status(401).json({ message: `Invalid credentials, verify your email and password.` });
            return;
          }
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = `${userData.first_name} ${userData.last_name}`;
            req.session.loggedIn = true;

            res.json({ user: userData, session: req.session });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST LOGOUT api/users/logout -> (destroy session object)
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).json({ message: `No user logged in` }).end();
  }
});

// READ

// GET /api/users -> (get all users)
router.get('/', (req, res) => {
  const { user_id } = req.session;
  const excludeSelf = ({ id }) => id !== user_id;

  Users.findAll({
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
      through: { attributes: [] },
      as: 'user_matches'
    },
    {
      model: Users,
      through: { attributes: [] },
      as: 'matched_users'
    },
    {
      model: Flags,
      // kick user off platform when this gets to high? investigate after 1st flag
      attributes: [
        [sequelize.literal('(SELECT COUNT(*) FROM flags where flags.recipient_id = users.id)'), 'flag_count']
      ]
    }
    ]
  })
    .then(userData => res.json(userData.filter(excludeSelf)))
    .catch(err => res.status(500).json(err));
});

router.get('/current-user', async (req, res) => {
  if (!req.session) {
    return res.status(400).json({ message: 'you must be logged in to send flowers!' })
  }

  const user = await Users.getCurrentUser(req.session.user_id | req.body.sender_id)
  res.json(user);
});

// GET /api/users/:id -> (get one user by id)
router.get('/:id', (req, res) => {
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
    .then(userData => !userData ? res.status(404).json({ message: `user ${req.params.id} not found` }) : res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE
// PUT /api/users/flowers -> (send flowers from one user to another)
router.put('/send-flowers', (req, res) => {
  if (req.session) {
    // expects req.body === {"recipient_id: INT "}
    Users.sendFlowers({
      sender_id: req.session.user_id | req.body.sender_id,
      recipient_id: req.body.recipient_id
    }, {
      Flowers,
      Matches,
      Users
    })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: 'you must be logged in to send flowers!' })
  }
});

// PUT /api/users/block -> (block a user because you are not interested in them)
router.put('/block', (req, res) => {
  if (req.session) {
    // expects req.body === {"recipient_id: INT "}
    Users.blockUser({
      sender_id: req.session.user_id,
      recipient_id: req.body.recipient_id
    }, {
      Blocks,
      Users
    })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: 'you must be logged in to block a user!' })
  }
});

// PUT /api/users/flag -> (flag a user for misconduct)
router.put('/flag', (req, res) => {
  if (req.session) {
    // expects req.body === {"recipient_id: INT "}
    Users.flagUser({
      sender_id: req.session.user_id,
      recipient_id: req.body.recipient_id
    }, {
      Flags,
      Users
    })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: 'you must be logged in to flag a user!' })
  }
});

// PUT /api/users/interest -> (update a users interest list)
router.put('/interests', (req, res) => {
  if (req.session) {
    // expects req.body === {"interest_ids: [ARRAY] "}
    Users.updateInterests({
      user_id: req.session.user_id,
      ...req.body
    }, { UserInterests, Interests, Users })

      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: 'you must be logged in to update your interests!' })
  }
});


// PUT /api/users/:id -> (update user data with new data from user profile page)
router.put('/:id', (req, res) => {
  /* expects to receive req.body === <Object Bellow>
  {
    "email": "test@hotmail.com",
    "first_name": "Jane",
    "last_name": "Test",
    "password": "supersecret",
    "description": "I'm a 35 year old pan-sexual who likes music and tv. Looking for a friend for my dog spike",
    "profile_picture_src": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "age": 35,
    "gender": "f",
    "interested_in_m": true,
    "interested_in_f": true,
    "interested_in_o": true,
    "interested_in_min_age": 20,
    "interested_in_max_age": 50,
    "latitude": 34.08929,
    "longitude": -118.382890
  } */
  Users.update(req.body, {
    where: { id: req.params.id }
  })
    .then(userData => !userData ? res.status(404).json({ message: `user ${req.params.id} not found` }) : res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  Users.destroy({
    where: { id: req.params.id },
  })
    .then(userData => !userData ? res.status(404).json({ message: `user ${req.params.id} not found` }) : res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//getting all users
router.get('/', (req, res) => {
  Users.findAll({
    attributes: { exclude: ['passowrd'] }
  }).then(dbUserdata => res.json(dbUserdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;