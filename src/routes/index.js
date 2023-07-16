const express = require('express');
const passport = require('passport');
const router = express.Router()
//const rvr = require('../public/RVR/rvres.json')
const book = 'Enoc_libro/LibrodeEnoc.pdf';
// const book_url_rvr1960 = "http://www.palabrasdevida.com/rv1960/index.html";
const path = require('path')
const url_Text = "https://dailyverses.net/es/versiculo-de-la-biblia-al-azar"
const userSchema = require("../models/user")
// Publiccaciones
const multer = require('multer');
const mongoose = require('mongoose');
const controller = require('../server/controller/controller');
const store = require('../server/middleware/multer')
const UploadModel = require('../server/model/schema');
const fs = require('fs');
const { userInfo } = require('os');
const user = require('../models/user');
//Routing







// Views images fom db
router.get('/', (req, res, next) => {
  res.render('home', {book });

});
// Biblia
router.get('/biblia', (req, res) =>{
  res.render('book/biblia')
})
// routes
router.get('/new-upload', (req, res) => {
  res.render('upload/upload-files')
})
router.post('/uploadmultiple', store.array('images', 12), controller.uploads)
// router.post('/upload', upload.array('mp3Files', 5), controller.uploads_mp3)

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
// isAuthenticated => Validate if Autenticate
router.get("/profile-admin", isAuthenticated, (req, res, next) => {
  userSchema
    .find()
    .then(data => {
      res.render("administrativo", { data: data.map(datos => datos.toJSON()) })
      //res.json(data)

    })
    .catch((error) => res.json({ mesagge: error }))

  //res.json(data)
})
//  IS redirect to profile
//VIEW USER ALL 
router.get("/profile", isAuthenticated, (req, res, next) => {
  res.render("profile")
  //res.json(data)

})

//Public
router.get("/publico", async (req, res, next) => {
  const all_images = await UploadModel.find()
  //console.log(all_images);
  res.render('publico', { images: all_images });
})

router.delete("/publico/:id", async (req, res) => { //Delete image of publication
  const id = req.params.id
  console.log(id);

  try {
    const all_id = await UploadModel.findByIdAndDelete({ _id: id })
    console.log(all_id);

    if (!all_id) {
      res.json({
        estado: false,
        message: "No se pudo eliminar"
      })

    } else {
      res.json({
        estado: true,
        message: "Eliminso"
      })
    }
  } catch (error) {

  }

})

// Logaour 
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
