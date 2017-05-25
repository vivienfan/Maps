'use strict';

require('dotenv').config();

const PORT            = process.env.PORT || 8080;
const ENV             = process.env.ENV || 'development';
const express         = require('express');
const bodyParser      = require('body-parser');
const sass            = require('node-sass-middleware');
const app             = express();

const knexConfig      = require('./knexfile');
const knex            = require('knex')(knexConfig[ENV]);
const morgan          = require('morgan');
const knexLogger      = require('knex-logger');
const cookieSession   = require('cookie-session');
const methodOverride  = require('method-override');

const dataHelper      = require('./lib/dataHelper.js')(knex);

// Seperated Routes for each Resource
const homeRoute       = require('./routes/home.js')(dataHelper);
const profilesRoutes  = require('./routes/profiles.js')(dataHelper);
const listsRoutes     = require('./routes/lists.js')(dataHelper);
const mapsRoutes      = require('./routes/maps.js')(dataHelper);
const pointsRoutes    = require('./routes/points.js')(dataHelper);
const usersRoutes     = require('./routes/users.js')(knex);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));
app.use(cookieSession({
  name: "session",
  keys: ["This-is-my-secrete-key"],
  maxAge: 20 * 365 * 24 * 60 * 60 * 1000 // 20 years
}));
app.use(methodOverride('_method'));

// Mount all routes
app.use('/', homeRoute);
app.use('/profiles', profilesRoutes);
app.use('/lists', listsRoutes);
app.use('/maps', mapsRoutes);
app.use('/points', pointsRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
