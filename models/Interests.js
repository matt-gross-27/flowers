const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interests extends Model {}

Interests.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    interest_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'interests',
    timestamps: false
  }
);

module.exports = Interests