const Interests = require('../models/Interests');
const Turnoffs = require('../models/Turnoffs');
const sequelize = require('../config/connection');

const interests = [
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
  { id: 16, interest_name: "interest # 16" }
];

const turnoffs = [
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
]

seedDatabase = () => {
  Interests.bulkCreate(interests)
  .then(data => console.log('interests seeded!'));

  Turnoffs.bulkCreate(turnoffs)
  .then(data => console.log('turnoffs seeded!'));
}

module.exports = seedDatabase;