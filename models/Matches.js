const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Matches extends Model {}

Matches.init(
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
    match_user_id: {
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
    modelName: 'matches',
  }
);

module.exports = Matches