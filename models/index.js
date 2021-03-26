const Interests = require('./Interests');
const Turnoffs = require('./Turnoffs');
const UserInterests = require('./UserInterests');
const UserTurnoffs = require('./UserTurnoffs');
const Flags = require('./Flags');
const Blocks = require('./Blocks');
const Matches = require('./Matches');
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

// Users -> Users relationship through Blocks (Used to kill interaction with a user you are no longer interested in)
Users.belongsToMany(Users, {
  through: 'blocks',
  foreignKey: 'sender_id',
  otherKey: 'recipient_id',
  as: 'sent_block_to'
});

Users.belongsToMany(Users, {
  through: 'blocks',
  foreignKey: 'recipient_id',
  otherKey: 'sender_id',
  as: 'received_block_from'
});

Blocks.belongsTo(Users, { foreignKey: 'sender_id' });
Blocks.belongsTo(Users, { foreignKey: 'recipient_id' });

Users.hasMany(Blocks, { foreignKey: 'sender_id' });
Users.hasMany(Blocks, { foreignKey: 'recipient_id' });



// Users -> Users relationship through Flags (Used to indicate a user has engaged in inappropriate behavior)
Users.belongsToMany(Users, {
  through: 'flags',
  foreignKey: 'sender_id',
  otherKey: 'recipient_id',
  as: 'sent_flag_to'
});

Users.belongsToMany(Users, {
  through: 'flags',
  foreignKey: 'recipient_id',
  otherKey: 'sender_id',
  as: 'received_flag_from'
});

Flags.belongsTo(Users, { foreignKey: 'sender_id' });
Flags.belongsTo(Users, { foreignKey: 'recipient_id' });

Users.hasMany(Flags, { foreignKey: 'sender_id' });
Users.hasMany(Flags, { foreignKey: 'recipient_id' });



// Users -> Users relationship through Matches (Used to indicate a two users have sent each other flowers)
Users.belongsToMany(Users, {
  through: 'matches',
  foreignKey: 'user_id',
  as: 'user_matches'
});

Users.belongsToMany(Users, {
  through: 'matches',
  foreignKey: 'match_user_id',
  as: 'matched_users'
});

Matches.belongsTo(Users, { foreignKey: 'user_id' });
Matches.belongsTo(Users, { foreignKey: 'match_user_id' });

Users.hasMany(Matches, { foreignKey: 'user_id' });
Users.hasMany(Matches, { foreignKey: 'match_user_id' });

// Users -> Interests & Turnoffs relationship through UserInterests
Users.belongsToMany(Interests, {
  through: 'user_interests',
  foreignKey: 'user_id',
  as: 'users_interests'
});

Interests.belongsToMany(Users, {
  through: 'user_interests',
  foreignKey: 'interest_id',
  as: 'interested_users'
});

Users.belongsToMany(Turnoffs, {
  through: 'user_turnoffs',
  foreignKey: 'user_id',
  as: 'users_turnoffs'
});

Turnoffs.belongsToMany(Users, {
  through: 'user_turnoffs',
  foreignKey: 'turnoff_id',
  as: 'repulsed_users'
});

UserInterests.belongsTo(Users, { foreignKey: 'user_id' });
UserInterests.belongsTo(Interests, { foreignKey: 'interest_id' });

UserTurnoffs.belongsTo(Users, { foreignKey: 'user_id' });
UserTurnoffs.belongsTo(Turnoffs, { foreignKey: 'turnoff_id' });

Users.hasMany(UserInterests, { foreignKey: 'user_id' });
Users.hasMany(UserTurnoffs, { foreignKey: 'user_id' });

Interests.hasMany(UserInterests, { foreignKey: 'interest_id' });
Turnoffs.hasMany(UserTurnoffs, { foreignKey: 'turnoff_id' });

module.exports = { Flowers, Matches, Flags, Blocks, UserInterests, UserTurnoffs, Interests, Turnoffs, Users }