const { Model, DataTypes } = require('sequelize');
const { Flowers, Blocks, Flags } = require('.');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Users extends Model {
  // send flowers method
  static sendFlowers(obj, models) {
    return models.Flowers.create({
      recipient_id: obj.recipient_id,
      sender_id: obj.sender_id
    }).then(() => {
      return Users.findOne({
        where: { id: obj.sender_id },
        attributes: [
          'id', 'first_name', 'last_name',
        ],
        include: {
          model: Users,
          attributes: ['id'],
          through: 'flowers',
          as: 'sent_flowers_to',
        }
      });
    });
  };
  
  // block another user method
  static blockUser(obj, models) {
    return models.Blocks.create({
      recipient_id: obj.recipient_id,
      sender_id: obj.sender_id
    }).then(() => {
      return Users.findOne({
        where: { id: obj.sender_id },
        attributes: [ 'id', 'first_name', 'last_name' ],
        include: {
          model: Users,
          attributes: ['id'],
          through: 'blocks',
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
        attributes: [ 'id', 'first_name', 'last_name' ],
        include: {
          model: Users,
          attributes: ['id'],
          through: 'flags',
          as: 'sent_flag_to',
        }
      });
    });
  };
}

Users.init(
  {
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
      type: DataTypes.STRING,
      validate: {
        len: [0, 130]
      }
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
        isIn: [['m', 'f', 'o']]
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
  },
  {
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
  }
);

module.exports = Users;