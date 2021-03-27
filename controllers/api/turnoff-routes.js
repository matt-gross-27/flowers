const router = require("express").Router();
const { Turnoffs } = require('../../models');

// GET /api/turnoffs -> (get turnoffs table)
router.get('/', (req, res) => {
  Turnoffs.findAll({})
    .then(turnoffsData => res.json(turnoffsData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;