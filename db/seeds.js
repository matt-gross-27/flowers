const { Interests, Turnoffs, Users, UserInterests, UserTurnoffs, Flowers, Matches } = require('../models');
const oSrcArr = require('./non-binary-src');

function randomNumBtw(min, max) {
  return Math.random() * (max - min) + min;
}

function randomIntBtw(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

const interests = [
  { id: 1, interest_name: "Hiking" },
  { id: 2, interest_name: "Reading" },
  { id: 3, interest_name: "Fishing" },
  { id: 4, interest_name: "Astrology" },
  { id: 5, interest_name: "Music" },
  { id: 6, interest_name: "Binging Netflix" },
  { id: 7, interest_name: "Bowling" },
  { id: 8, interest_name: "Cooking" },
  { id: 9, interest_name: "Art" },
  { id: 10, interest_name: "Fashion" },
  { id: 11, interest_name: "Hacking" },
  { id: 12, interest_name: "Lego building" },
  { id: 13, interest_name: "Needlepoint" },
  { id: 14, interest_name: "Cats" },
  { id: 15, interest_name: "Dogs" },
  { id: 16, interest_name: "Wine" }
];

const turnoffs = [
  { id: 1, turnoff_name: "Selfishness" },
  { id: 2, turnoff_name: "Aggression" },
  { id: 3, turnoff_name: "Drinking" },
  { id: 4, turnoff_name: "Smoking" },
  { id: 5, turnoff_name: "Boring People" },
  { id: 6, turnoff_name: "Over Sensitivity" },
  { id: 7, turnoff_name: "Bad Driving" },
  { id: 8, turnoff_name: "Bad Teeth" },
  { id: 9, turnoff_name: "Baby Talk" },
  { id: 10, turnoff_name: "Ex-Talk" },
  { id: 11, turnoff_name: "Meanness" },
  { id: 12, turnoff_name: "Bad Hygiene" },
  { id: 13, turnoff_name: "Long Fingernails" },
  { id: 14, turnoff_name: "Laziness" },
  { id: 15, turnoff_name: "Bad Listeners" },
  { id: 16, turnoff_name: "Bad Kissers" }
];

function generateTestUsers(num) {
  var userArr = [];
  var iM = 0;
  var iW = 0;
  var iO = 0;

  for (let i = 1; i < num + 1; i++) {
    let user = {}
    user.email = `${i}@hotmail.com`;
    user.first_name = `Test`;
    user.last_name = `User`;
    user.password = '12345678';
    user.age = Math.floor(Math.random() * 50 + 18)
    let x = Math.random()
    if (x < .4) {
      user.gender = "m";
      user.profile_picture_src = `https://randomuser.me/api/portraits/men/${iM}.jpg`;
      iM++;
    } else if (x < .8) {
      user.gender = "f";
      user.profile_picture_src = `https://randomuser.me/api/portraits/women/${iW}.jpg`;
      iW++;
    } else {
      user.gender = "o";
      user.profile_picture_src = oSrcArr[iO];
      iO++;
    }

    if (Math.random() > 0.5) {
      user.interested_in_m = true;
    } else {
      user.interested_in_m = false;
    }

    if (Math.random() > 0.5) {
      user.interested_in_f = true;
    } else {
      user.interested_in_f = false;
    }

    if (Math.random() > 0.5) {
      user.interested_in_o = true;
    } else {
      user.interested_in_o = false;
    }

    const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    user.description = str.substring(0, Math.floor(Math.random() * 100 + 10));
    user.latitude = randomNumBtw(33.753886, 34.188941).toFixed(8);
    user.longitude = randomNumBtw(-118.38367, -117.867312).toFixed(8);

    userArr.push(user);
  }
  return userArr;
}

const testUsers = generateTestUsers(100);

function generateUserInterests(num) {
  var arr = []
  for (let i = 1; i < num + 1; i++) {
    if (Math.random() > 0.5) {
      let usrInt = {};
      usrInt.user_id = i;
      usrInt.interest_id = randomIntBtw(1, 5);
      arr.push(usrInt);
    }

    if (Math.random() > 0.5) {
      let usrInt = {};
      usrInt.user_id = i;
      usrInt.interest_id = randomIntBtw(5, 9);
      arr.push(usrInt);
    }

    if (Math.random() > 0.5) {
      let usrInt = {};
      usrInt.user_id = i;
      usrInt.interest_id = randomIntBtw(9, 13);
      arr.push(usrInt);
    }

    if (Math.random() > 0.5) {
      let usrInt = {};
      usrInt.user_id = i;
      usrInt.interest_id = randomIntBtw(13, 17);
      arr.push(usrInt);
    }
  }
  return arr;
}


const userInterests = generateUserInterests(100);

function generateUserTurnoffs(num) {
  var arr = []
  for (let i = 1; i < num + 1; i++) {
    if (Math.random() > 0.5) {
      let usrTrn = {};
      usrTrn.user_id = i;
      usrTrn.turnoff_id = randomIntBtw(1, 5);
      arr.push(usrTrn);
    }

    if (Math.random() > 0.5) {
      let usrTrn = {};
      usrTrn.user_id = i;
      usrTrn.turnoff_id = randomIntBtw(5, 9);
      arr.push(usrTrn);
    }

    if (Math.random() > 0.5) {
      let usrTrn = {};
      usrTrn.user_id = i;
      usrTrn.turnoff_id = randomIntBtw(9, 13);
      arr.push(usrTrn);
    }

    if (Math.random() > 0.5) {
      let usrTrn = {};
      usrTrn.user_id = i;
      usrTrn.turnoff_id = randomIntBtw(13, 17);
      arr.push(usrTrn);
    }
  }
  return arr;
}

const userTurnoffs = generateUserTurnoffs(100);

const flowers = [
  { sender_id: 2, recipient_id: 1 },
  { sender_id: 3, recipient_id: 1 },
  { sender_id: 4, recipient_id: 1 },
  { sender_id: 5, recipient_id: 1 },
  { sender_id: 6, recipient_id: 1 },
  { sender_id: 7, recipient_id: 1 },
];

seedDatabase = async () => {
  var a = await Interests.bulkCreate(interests).catch(err => console.log(err));
  
  if (a) {
    var b = await Turnoffs.bulkCreate(turnoffs).catch(err => console.log(err));
  }

  if (b) {
    var c = await Users.bulkCreate(testUsers, { individualHooks: true }).catch(err => console.log(err));
  }

  if (c) {
    var d = await UserInterests.bulkCreate(userInterests).catch(err => console.log(err));
  }

  if (d) {
    var e = await UserTurnoffs.bulkCreate(userTurnoffs).catch(err => console.log(err));
  }

  if (e) {
    var f = await flowers.forEach(flower => {
      Users.sendFlowers(flower, { Users, Flowers, Matches })
    });
  }
  
  if (f) {
    console.log(`=========== db seeded ===========`)
  }
}

module.exports = seedDatabase;