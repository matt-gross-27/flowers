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

Interests.bulkCreate([
  { id: 1,  interest_name: "interest # 1" },
  { id: 2,  interest_name: "interest # 2" },
  { id: 3,  interest_name: "interest # 3" },
  { id: 4,  interest_name: "interest # 4" },
  { id: 5,  interest_name: "interest # 5" },
  { id: 6,  interest_name: "interest # 6" },
  { id: 7,  interest_name: "interest # 7" },
  { id: 8,  interest_name: "interest # 8" },
  { id: 9,  interest_name: "interest # 9" },
  { id: 10, interest_name: "interest # 10" },
  { id: 11, interest_name: "interest # 11" },
  { id: 12, interest_name: "interest # 12" },
  { id: 13, interest_name: "interest # 13" },
  { id: 14, interest_name: "interest # 14" },
  { id: 15, interest_name: "interest # 15" },
  { id: 16, interest_name: "interest # 16" },
]);

module.exports = Interests