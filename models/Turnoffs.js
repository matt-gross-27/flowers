const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Turnoffs extends Model { }

Turnoffs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    turnoff_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'turnoffs',
    timestamps: false
  }
);

module.exports = Turnoffs