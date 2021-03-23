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
  secret: process.env.SECRET,
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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`application live at http://localhost:${PORT}/`));
});