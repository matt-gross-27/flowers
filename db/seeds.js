const { Interests, Turnoffs, Users, UserInterests, UserTurnoffs, Flowers, Matches } = require('../models');
const sequelize = require('../config/connection');

const interests = [
  { id: 1, interest_name: "interest # 1" },
  { id: 2, interest_name: "interest # 2" },
  { id: 3, interest_name: "interest # 3" },
  { id: 4, interest_name: "interest # 4" },
  { id: 5, interest_name: "interest # 5" },
  { id: 6, interest_name: "interest # 6" },
  { id: 7, interest_name: "interest # 7" },
  { id: 8, interest_name: "interest # 8" },
  { id: 9, interest_name: "interest # 9" },
  { id: 10, interest_name: "interest # 10" },
  { id: 11, interest_name: "interest # 11" },
  { id: 12, interest_name: "interest # 12" },
  { id: 13, interest_name: "interest # 13" },
  { id: 14, interest_name: "interest # 14" },
  { id: 15, interest_name: "interest # 15" },
  { id: 16, interest_name: "interest # 16" }
];

const turnoffs = [
  { id: 1, turnoff_name: "turnoff # 1" },
  { id: 2, turnoff_name: "turnoff # 2" },
  { id: 3, turnoff_name: "turnoff # 3" },
  { id: 4, turnoff_name: "turnoff # 4" },
  { id: 5, turnoff_name: "turnoff # 5" },
  { id: 6, turnoff_name: "turnoff # 6" },
  { id: 7, turnoff_name: "turnoff # 7" },
  { id: 8, turnoff_name: "turnoff # 8" },
  { id: 9, turnoff_name: "turnoff # 9" },
  { id: 10, turnoff_name: "turnoff # 10" },
  { id: 11, turnoff_name: "turnoff # 11" },
  { id: 12, turnoff_name: "turnoff # 12" },
  { id: 13, turnoff_name: "turnoff # 13" },
  { id: 14, turnoff_name: "turnoff # 14" },
  { id: 15, turnoff_name: "turnoff # 15" },
  { id: 16, turnoff_name: "turnoff # 16" }
];

const testUsers = [
  //males
  {
    email: "MA@hotmail.com",
    first_name: "MA",
    last_name: "LikesF",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/2.jpg",
    age: 35,
    gender: "m",
    interested_in_m: false,
    interested_in_f: true,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "37.08929000",
    longitude: "-119.38289000",
  },
  {
    email: "MB@hotmail.com",
    first_name: "MB",
    last_name: "LikesF",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/1.jpg",
    age: 19,
    gender: "m",
    interested_in_m: false,
    interested_in_f: true,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "38.08929000",
    longitude: "-111.38289000",
  },
  {
    email: "MC@hotmail.com",
    first_name: "MC",
    last_name: "LikesF",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/3.jpg",
    age: 35,
    gender: "m",
    interested_in_m: false,
    interested_in_f: true,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "38.08929000",
    longitude: "-111.38289000",
  },
  {
    email: "MD@hotmail.com",
    first_name: "MD",
    last_name: "LikesM",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/4.jpg",
    age: 35,
    gender: "m",
    interested_in_m: true,
    interested_in_f: false,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "35.08929",
    longitude: "-119.2344",
  },
  {
    email: "ME@hotmail.com",
    first_name: "ME",
    last_name: "LikesM",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/5.jpg",
    age: 35,
    gender: "m",
    interested_in_m: true,
    interested_in_f: false,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "40.08929",
    longitude: "-116.944",
  },
  {
    email: "MF@hotmail.com",
    first_name: "MF",
    last_name: "LikesMF",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/6.jpg",
    age: 60,
    gender: "m",
    interested_in_m: true,
    interested_in_f: true,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "40.08929",
    longitude: "-116.944",
  },
  //females
  {
    email: "FA@hotmail.com",
    first_name: "FA",
    last_name: "LikesM",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/1.jpg",
    age: 35,
    gender: "f",
    interested_in_m: true,
    interested_in_f: false,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "37.08929000",
    longitude: "-119.38289000",
  },
  {
    email: "FB@hotmail.com",
    first_name: "FB",
    last_name: "LikesM",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/2.jpg",
    age: 19,
    gender: "f",
    interested_in_m: true,
    interested_in_f: false,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "38.08929000",
    longitude: "-111.38289000",
  },
  {
    email: "FC@hotmail.com",
    first_name: "FC",
    last_name: "LikesM",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/3.jpg",
    age: 35,
    gender: "f",
    interested_in_m: true,
    interested_in_f: false,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "38.08929000",
    longitude: "-111.38289000",
  },
  {
    email: "FD@hotmail.com",
    first_name: "FD",
    last_name: "LikesAll",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/4.jpg",
    age: 35,
    gender: "f",
    interested_in_m: true,
    interested_in_f: true,
    interested_in_o: true,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "35.08929",
    longitude: "-119.2344",
  },
  {
    email: "FE@hotmail.com",
    first_name: "FE",
    last_name: "LikesFO",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/5.jpg",
    age: 35,
    gender: "f",
    interested_in_m: false,
    interested_in_f: true,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "50.08929",
    longitude: "-150.944",
  },
  {
    email: "FF@hotmail.com",
    first_name: "FF",
    last_name: "LikesFO",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/6.jpg",
    age: 60,
    gender: "f",
    interested_in_m: false,
    interested_in_f: true,
    interested_in_o: true,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "40.08929",
    longitude: "-116.944",
  },
  {
    email: "OA@hotmail.com",
    first_name: "OA",
    last_name: "LikesF",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/7.jpg",
    age: 35,
    gender: "o",
    interested_in_m: false,
    interested_in_f: true,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "30.08929",
    longitude: "-112.944",
  },
  {
    email: "OB@hotmail.com",
    first_name: "OB",
    last_name: "LikesAll",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/women/8.jpg",
    age: 35,
    gender: "o",
    interested_in_m: true,
    interested_in_f: true,
    interested_in_o: true,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "40.082329",
    longitude: "-116.9234",
  },
  {
    email: "OC@hotmail.com",
    first_name: "OC",
    last_name: "LikesM",
    password: "supersecret",
    description: "I'm a 35 year old fun person who likes music and tv. Looking for a friend for my dog spike",
    profile_picture_src: "https://randomuser.me/api/portraits/men/9.jpg",
    age: 35,
    gender: "o",
    interested_in_m: true,
    interested_in_f: false,
    interested_in_o: false,
    interested_in_min_age: 20,
    interested_in_max_age: 50,
    latitude: "41.0929",
    longitude: "-116.044",
  }
];

const userInterests = [
  { user_id: 1, interest_id: 1 },
  { user_id: 1, interest_id: 2 },
  { user_id: 1, interest_id: 3 },
  { user_id: 2, interest_id: 1 },
  { user_id: 2, interest_id: 2 },
  { user_id: 2, interest_id: 5 },
  { user_id: 3, interest_id: 9 },
];

const userTurnoffs = [
  { user_id: 1, turnoff_id: 9 },
  { user_id: 1, turnoff_id: 8 },
  { user_id: 1, turnoff_id: 7 },
  { user_id: 2, turnoff_id: 6 },
  { user_id: 2, turnoff_id: 5 },
  { user_id: 2, turnoff_id: 4 },
  { user_id: 3, turnoff_id: 1 },
];

const flowers = [
  { sender_id: 14, recipient_id: 1 },
  { sender_id: 1, recipient_id: 7 },
  { sender_id: 1, recipient_id: 9 },
  { sender_id: 7, recipient_id: 1 },
  { sender_id: 8, recipient_id: 1 },
  { sender_id: 1, recipient_id: 8 },
];

seedDatabase = () => {
  Interests.bulkCreate(interests)
    .then(data => console.log('Interests seeded!'));

  Turnoffs.bulkCreate(turnoffs)
    .then(data => console.log('Turnoffs seeded!'));

  Users.bulkCreate(testUsers, { individualHooks: true })
    .then(data => console.log('TestUsers seeded!'))

    .then(() => {
      UserInterests.bulkCreate(userInterests);
    })
    .then(data => console.log('UserInterests seeded!'))

    .then(() => {
      UserTurnoffs.bulkCreate(userTurnoffs);
    })
    .then(() => {
      flowers.forEach(flower => {
        Users.sendFlowers(flower, { Users, Flowers, Matches });
      })
    })
    .then(data => console.log('UserInterests seeded!'))
}

module.exports = seedDatabase;