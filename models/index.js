const Flowers = require('./Flowers');
const Users = require('./Users');

// Users -> Users relationship through Flowers
Users.belongsToMany(Users, {
  through: 'flowers',
  foreignKey: 'sender_id',
  otherKey: 'recipient_id',
  as: 'sent_flowers_to'
});

Users.belongsToMany(Users, {
  through: 'flowers',
  foreignKey: 'recipient_id',
  otherKey: 'sender_id',
  as: 'received_flowers_from'
});

Flowers.belongsTo(Users, { foreignKey: 'sender_id' });
Flowers.belongsTo(Users, { foreignKey: 'recipient_id' });

Users.hasMany(Flowers, { foreignKey: 'sender_id' });
Users.hasMany(Flowers, { foreignKey: 'recipient_id' });

module.exports = { Users, Flowers }