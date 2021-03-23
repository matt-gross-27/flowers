const router = require('express').Router();

// const userRoutes = require('./user-routes');

// TEST GET /api route
router.get('/', (req, res) => {
  res.json({
    request_headers: req.headers,
    request_ip: req.signedCookies,
    request_ip: req.ip,
  });
});

module.exports = router;