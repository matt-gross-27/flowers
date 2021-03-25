const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Turnoffs extends Model {}

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

Turnoffs.bulkCreate([
  { id: 1,  turnoff_name: "turnoff # 1" },
  { id: 2,  turnoff_name: "turnoff # 2" },
  { id: 3,  turnoff_name: "turnoff # 3" },
  { id: 4,  turnoff_name: "turnoff # 4" },
  { id: 5,  turnoff_name: "turnoff # 5" },
  { id: 6,  turnoff_name: "turnoff # 6" },
  { id: 7,  turnoff_name: "turnoff # 7" },
  { id: 8,  turnoff_name: "turnoff # 8" },
  { id: 9,  turnoff_name: "turnoff # 9" },
  { id: 10, turnoff_name: "turnoff # 10" },
  { id: 11, turnoff_name: "turnoff # 11" },
  { id: 12, turnoff_name: "turnoff # 12" },
  { id: 13, turnoff_name: "turnoff # 13" },
  { id: 14, turnoff_name: "turnoff # 14" },
  { id: 15, turnoff_name: "turnoff # 15" },
  { id: 16, turnoff_name: "turnoff # 16" }
]);

module.exports = Turnoffs