const express = require('express');
const router = express.Router()
const upload = require("../controllers/index")
//const rvr = require('../public/RVR/rvres.json')
const book = 'Enoc_libro/LibrodeEnoc.pdf';
const path = require('path')


// Publiccaciones

router.get('/imagenes/:id', (req, res) => {
    res.sendFile(`imagenes/${id}`)

});

//Routing
router.get('/', (req, res) => {
    res.render('home', { book })
});

//Uploading GET
router.get('/new-upload-file', (req, res) => {
    res.render('login')
});
router.get('/uploader', (req, res) => {
    res.render('upload/uploaded')
});

// UPLOADING POST
router.post('/upload-file', upload.array('uploaded_file'), function (req, res) {

    console.log(req.file)
    res.redirect('/')
});

// router.get('/login', (req, res) => {
//     res.render('login/register')

// });

//Files book enock
router.get('/book', (req, res) => {

    res.render('book/index', { book })

});

module.exports = router;
// recorrer json con nodejs?

//
