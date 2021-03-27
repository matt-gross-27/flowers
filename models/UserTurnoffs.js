const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserTurnoffs extends Model {}

UserTurnoffs.init(
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
    turnoff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'turnoffs',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'user_turnoffs',
  }
);

module.exports = UserTurnoffs