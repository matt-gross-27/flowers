const router = require('express').Router();
const { Users, Messages } = require('../../models');
const sequelize = require('../../config/connection');

// CREATE POST /api/messages -> (create a message)
router.post('/', (req, res) => {
  // expects req.body { "recipient_id": INT, "message_text", "STRING" }
  Messages.create({
    sender_id: req.session.user_id | req.body.sender_id,
    recipient_id: req.body.recipient_id,
    message_text: req.body.message_text,
  })
    .then (messageData => res.json(messageData))
    .catch(err => res.status(500).json(err));
});

// READ GET /api/message -> (get all messages);
router.get('/', (req, res) => {
  Messages.findAll()
    .then (messageData => res.json(messageData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;