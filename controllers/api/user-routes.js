const router = require('express').Router();
const { Users, Flowers } = require('../../models');
const bcrypt = require('bcrypt');

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
  Users.create(req.body)
    .then(userData => {
      const user = userData.get({ plain: true });
      // log user in on create (so sign up auto logs in)
      req.session.save(() => {
        req.session.user_id = user.id
        req.session.name = `${user.first_name} ${user.last_name}`
        req.session.loggedIn = true;
        res.json({ user: userData, session: req.session })
      })
    })
    .catch(err => res.status(500).json(err));
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
      if (!userData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}` });
        return;
      }
      bcrypt.compare(req.body.password, userData.password)
        .then(validPassword => {
          if (!validPassword) {
            res.status(400).json({ message: `Email does not match password` });
            return;
          }
          req.session.save(() => {
            req.session.user_id = userData.id
            req.session.name = `${userData.first_name} ${userData.last_name}`
            req.session.loggedIn = true;
          });
          res.json({ user: userData, session: req.session });
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
  Users.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Users,
        through: 'flowers',
        as: 'sent_flowers_to',
      },
      {
        model: Users,
        through: 'flowers',
        as: 'received_flowers_from',
      }      
    ]
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/id -> (get one user by id)
router.get('/:id', (req, res) => {
  Users.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password'] }
  })
    .then(userData => !userData ? res.status(404).json({ message: `user ${req.params.id} not found` }) : res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE
// PUT /api/users/flowers -> (send flowers from one user to another)
router.put('/flowers', (req, res) => {
  if (req.session) {
    // expects req.body === {"recipient_id: INT "}
    Users.sendFlowers({
      sender_id: req.session.user_id,
      recipient_id: req.body.recipient_id
    },
    {
      Flowers,
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

module.exports = router;