require('dotenv').config();

//grab our dependencies
const express    = require('express'),
  app            = express(),
  port           = process.env.PORT || 8081,
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'),
  expressValidator = require('express-validator');

//configure our app ============================
//set sessions and cookie parser
app.use(cookieParser());
// app.use(session({
  // secret: process.env.SECRET,
  // cookie: {maxAge: 60000},
  // resave: false, // forces the session to be saved back to the store
  // saveUninitialized: false // dont save unmodified
// }));
app.use(flash());

//tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

//set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//connect to our database
// mongoose.connect('mongodb://olympics:olympics@ds247007.mlab.com:47007/olympic-events');
// mongoose.connect("mongodb://toma:toma@localhost:27017/olympic-events");
// mongoose.connect("mongodb://tester:qwe@mongo_server_test:27017/test");
mongoose.connect("mongodb://mongo_test");

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

//set the routes ===============================
app.use(require('./app/routes'));

//start our server =============================
app.listen(port, () => {
  console.log(`Api listen port ${port}`)
});