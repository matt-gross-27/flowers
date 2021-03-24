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
    flagged_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    notifying_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      } 
    }
  },
  {
    sequelize,
    modelName: 'flags',
  });

module.exports = Flags