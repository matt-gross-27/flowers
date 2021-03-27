const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserInterests extends Model {}

UserInterests.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    interest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'interests',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'user_interests',
    timestamps: false
  }
);

module.exports = UserInterests