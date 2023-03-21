const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan')
const expHBS = require('express-handlebars');


// initializations 
const app = express();
require('./database');
require('./passport/local-auth');

// settings

// obten rutas static 
app.set('server', process.env.PORT || 5500)


// 
var hbs = expHBS.create({
  extname: '.hbs',
  // layoutsDir:'views/loyauts',
  partialsDir: path.join(__dirname, './partials')
})
app.engine('hbs', hbs.engine)
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs')


// Obteniendo Las Rutas static
app.use(express.static(path.join(__dirname, '/public')));
// app.use(router)
//Configure database 


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

// routes
app.use('/', require('./routes/index'));

// On Port: 
app.listen(app.get('server'), () => {
    console.log(`Server is Running ${app.get('server')}`);
})
