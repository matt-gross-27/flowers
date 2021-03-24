const router = require('express').Router();
const { Users, Flowers } = require('../../models');

router.get('/', (req, res) => {
  Users.findAll({
    attributes: { exclude: ['password'] },
    include: {
      model: Flowers,
    }
  })
    .then(userData => res.json(userData))
    .then(err => res.status(500).json(err));
});

module.exports = router;