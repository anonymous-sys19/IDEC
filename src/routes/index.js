const express = require('express');
const passport = require('passport');
const upload = require("../controllers/index")
const router = express.Router()
//const rvr = require('../public/RVR/rvres.json')
const book = 'Enoc_libro/LibrodeEnoc.pdf';
const url = "http://www.palabrasdevida.com/rv1960/index.html";
const path = require('path')


// Publiccaciones


//Routing
router.get('/', (req, res, next) => {
  res.render('home', { book, url })
});

//Uploading GET
router.get('/new-upload-file', isAuthenticated, (req, res, next) => {
  res.render('upload/uploaded')
});


// UPLOADING POST
router.post('/uploading-file', upload.array('uploaded_file'), function (req, res, next) {

  console.log(req.file)
  res.redirect('/')
});


//Files book enock
router.get('/book', isAuthenticated, (req, res, next) => {
  res.render('book/index', { book })
});

// 

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

// Profile
router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile');

});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});



function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}



module.exports = router;
// recorrer json con nodejs?

//
