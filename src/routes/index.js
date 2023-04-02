const express = require('express');
const passport = require('passport');
const upload = require("../controllers/index")
const router = express.Router()
//const rvr = require('../public/RVR/rvres.json')
const book = 'Enoc_libro/LibrodeEnoc.pdf';
const url = "http://www.palabrasdevida.com/rv1960/index.html";
const path = require('path')
const url_Text = "https://dailyverses.net/es/versiculo-de-la-biblia-al-azar"

// Publiccaciones

const controller = require('../server/controller/controller');
const store = require('../server/middleware/multer')
const UploadModel = require('../server/model/schema');
const fs = require('fs');
//Routing

// Views images fom db
router.get('/', (req, res, next) => {
  res.render('home', { book, url, url_Text });

});

// routes
router.get('/new-upload-file', controller.home);
router.post('/uploadmultiple', store.array('images', 12), controller.uploads)


//Files book enock
router.get('/book', isAuthenticated, (req, res, next) => {
  res.render('book/index', { book })
});

// 
router.get('/signup', (req, res, next) => {
  res.render('login/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));


router.get('/signin', (req, res, next) => {
  res.render('login/signin');
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

//Public
router.get("/publico", async (req, res, next) => {
  const all_images = await UploadModel.find()
  res.render('publico', { images: all_images });
})


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
