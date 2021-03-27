const router = require("express").Router();
const { Interests } = require('../../models');

// GET /api/interest -> (get interests table)
router.get('/', (req, res) => {
  Interests.findAll({})
    .then(interestsData => res.json(interestsData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;