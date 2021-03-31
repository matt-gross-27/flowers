const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Users extends Model {
    // send flowers method
    static sendFlowers(reqObj, models) {
        // create new row in flowers table
        return models.Flowers.create({
                recipient_id: reqObj.recipient_id,
                sender_id: reqObj.sender_id
            })
            .then(() => {
                // check if the recipient has previously sent flowers to the sender
                return models.Flowers.findOne({
                    where: {
                        sender_id: reqObj.recipient_id,
                        recipient_id: reqObj.sender_id
                    }
                });
            })
            .then((checkMatchData) => {
                // if they have (above) > create a row in the match table with both user_ids
                if (checkMatchData) {
                    return models.Matches.create({
                        user_id: reqObj.sender_id,
                        match_user_id: reqObj.recipient_id
                    })
                    return;
                }
            })
            .then(() => {
                // send data back for put request response (user data with flowers and matches)
                return this.getCurrentUser(reqObj.sender_id);
            });
    };

    static getCurrentUser(id) {
        return Users.findOne({
            where: { id },
            attributes: [
                'id', 'first_name', 'last_name', 'interested_in_m', 'interested_in_f', 'interested_in_o',
            ],
            include: [{
                    model: Users,
                    attributes: ['id'],
                    through: { attributes: [] },
                    as: 'sent_flowers_to',
                },
                {
                    model: Users,
                    attributes: ['id'],
                    through: { attributes: [] },
                    as: 'user_matches'
                },
                {
                    model: Users,
                    attributes: ['id'],
                    through: { attributes: [] },
                    as: 'matched_users'
                }
            ]
        })
    };

    // block another user method
    static blockUser(obj, models) {
        return models.Blocks.create({
            recipient_id: obj.recipient_id,
            sender_id: obj.sender_id
        }).then(() => {
            return Users.findOne({
                where: { id: obj.sender_id },
                attributes: ['id', 'first_name', 'last_name'],
                include: {
                    model: Users,
                    attributes: ['id'],
                    through: { attributes: [] },
                    as: 'sent_block_to',
                }
            });
        });
    };

    // flag another user method
    static flagUser(obj, models) {
        return models.Flags.create({
            recipient_id: obj.recipient_id,
            sender_id: obj.sender_id
        }).then(() => {
            return Users.findOne({
                where: { id: obj.sender_id },
                attributes: ['id', 'first_name', 'last_name'],
                include: {
                    model: Users,
                    attributes: ['id'],
                    through: { attributes: [] },
                    as: 'sent_flag_to',
                }
            });
        });
    };

    // update users interests method
    static updateInterests(obj, models) {
        return models.UserInterests.destroy({
                where: { user_id: obj.user_id }
            })
            .then(() => {
                return obj.interest_ids.forEach(interestId => {
                    models.UserInterests.create({
                        user_id: obj.user_id,
                        interest_id: interestId
                    });
                });
            })
            .then(() => {
                return models.Users.findOne({
                    where: { id: obj.user_id },
                    attributes: ['id', 'first_name', 'last_name'],
                    include: {
                        model: models.Interests,
                        through: { attributes: [] },
                        as: 'users_interests'
                    }
                });
            });
    };
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /[A-z]+/
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /[A-z]+/
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    },
    description: {
<<<<<<< HEAD
        type: DataTypes.STRING,
        validate: {
            len: [0, 130]
        }
=======
      type: DataTypes.TEXT,
>>>>>>> 720935129c383deba49b0f3a7b375a1eb9eaef2c
    },
    profile_picture_src: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            max: 110,
            min: 18,
        }
    },
    gender: {
        type: DataTypes.STRING,
        validate: {
            isIn: [
                ['m', 'f', 'o']
            ]
        }
    },
    interested_in_m: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    interested_in_f: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    interested_in_o: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    interested_in_min_age: {
        type: DataTypes.INTEGER,
        validate: {
            max: 110,
            min: 18,
        }
    },
    interested_in_max_age: {
        type: DataTypes.INTEGER,
        validate: {
            max: 110,
            min: 18,
        }
    },

    interested_in_distance: {
        type: DataTypes.INTEGER,
        validate: {
            max: 1000,
            min: 0,
        }
    },

    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        validate: {
            max: 90,
            min: -90,
        }
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        validate: {
            max: 180,
            min: -180,
        }
    }
}, {
    hooks: {
        // hash password before create and update
        async beforeCreate(userData) {
            userData.password = await bcrypt.hash(userData.password, 10);
        },
        async beforeUpdate(userData) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
    },
    sequelize,
    modelName: 'users'
});

module.exports = Users;