const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flags extends Model {}

Flags.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      } 
    }
  },
  {
    sequelize,
    modelName: 'flags',
  }
);

module.exports = Flags