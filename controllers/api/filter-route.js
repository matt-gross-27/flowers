const router = require('express').Router();
const { Users, Flowers, Matches, Blocks, Flags, Interests, Turnoffs, UserInterests, UserTurnoffs } = require('../../models');
const sequelize = require('../../config/connection');
const getDistance = require('./getDistance');

const savePreferences = (req, res, next) => {
  // Save preferences on db
  return next();

  const preferences = ['gender'].reduce((props, prop) => {
    if (req.query[prop]) {
      props[prop] = req.query[prop]
    }
    return props;
  }, {});

  // Users.update()

  next();
}

// GET /api/filter -> (get all users that satisfy filters)
router.get('/', savePreferences, (req, res) => {
  const where = ['gender'].reduce((props, prop) => {
    if (req.query[prop]) {
      props[prop] = req.query[prop]
    }
    return props;
  }, {});

  Users.findAll({
    where,
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
    .then(userData => {
      const { query } = req;
      let { distance, latitude, longitude } = req.query;

      const location = {
        latitude,
        longitude
      };

      const data = userData
        .map((match) => {
          match.distance = getDistance(location, {
            latitude: match.latitude,
            longitude: match.longitude
          })
          return match;
        })
        .filter(({ id }) => id !== req.session.user_id)
        .filter(({ distance }) => distance < query.distance)
        .sort((a, b) => a.distance > b.distance ? 1 : -1);

      res.json(data)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;