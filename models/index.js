const Users = require('./Users');
const Flowers = require('./Flowers')
const Messages = require('./Messages')
const Flags = require('./Flags')

// Users -> Flowers relationships
Users.belongsToMany(Users, {
  through: Flowers,
  foreignKey: 'sender_id',
  as: 'sent_flowers_to'
});

Users.belongsToMany(Users, {
  through: Flowers,
  foreignKey: 'recipient_id',
  as: 'received_flowers_from'
});

Users.hasMany(Flowers, {foreignKey: 'sender_id'});
Users.hasMany(Flowers, {foreignKey: 'recipient_id'});

Flowers.belongsTo(Users, {foreignKey: 'sender_id'});
Flowers.belongsTo(Users, {foreignKey: 'recipient_id'});

module.exports = { Users, Flowers, Messages, Flags };