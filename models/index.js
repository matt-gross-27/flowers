const Users = require('./Users');
const Flowers = require('./Flowers')
const Messages = require('./Messages')
const Flags = require('./Flags')

// Add sequelize Table Associations
Messages.belongsTo(Users);
Users.hasMany(Messages); 
Users.hasMany(Flowers);
Flowers.belongsTo(Users); 
Users.hasMany(Flags); 
Flags.belongsTo(Users); 

module.exports = { Users, Flowers, Messages, Flags };
