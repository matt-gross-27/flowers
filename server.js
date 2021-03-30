require('dotenv').config();

const express = require('express');
const routes = require('./controllers');
const path = require('path');
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection')

// handle bars
const exphbs = require('express-handlebars');
const helpers = require('./utils/hbsHelperFunctions');
const hbs = exphbs.create({ helpers });

const app = express();

// store user sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const userSession = {
  secret: 'this is a secret',
  // secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(userSession));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// turn on seedDatabase and set { force: true } to user seed data
const seedDatabase = require('./db/seeds');

sequelize.sync({ force: false }).then(() => {
  // seedDatabase();
  app.listen(PORT, () => console.log(`application live at http://localhost:${PORT}/`));
});