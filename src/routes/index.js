const express = require('express');
const passport = require('passport');
const router = express.Router()
const book = 'Enoc_libro/LibrodeEnoc.pdf';
const path = require('path')
const userSchema = require("../models/user")
// Publiccaciones
const multer = require('multer');
// const mongoose = require('mongoose');
// const controller = require('../controller/controller');
// const UploadModel = require('../model/schema');
const fs = require('fs');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { log } = require('console');
//cloudonary
const cloudinary = require("cloudinary").v2
const streamifier = require('streamifier'); // Asegúrate de tener instalado 'streamifier'
const { Readable } = require('stream'); 
 

//COnfiguro cloudinary con mis credenciales 

cloudinary.config({
  cloud_name: 'dhxfbv30w',
  api_key: '479318794826922',
  api_secret: 'P_Yg8uY1vwdABFOk42LTcgA5h2U',
  //secure: true,  
});
//Routing
 


//COnfiguro multer para manejar  los archivos
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

//// Middleware para verificar el token de autenticación
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
  }
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticación inválido.' });
    }
    console.log(user);
    req.user = user; // Asignar toda la información del usuario a req.user
    next();
  });
}




// Views   Home 
router.get('/', (req, res, next) => {
  res.render('home', { book });

});
//Historia
router.get("/historia", (req, res) => res.render("quienes-somos/historia"))

// Biblia
router.get('/biblia', (req, res) => {
  res.render('book/biblia')
})
// routes
router.get('/upload', (req, res) => {
  res.render('upload/upload-files')
})
//Ruta para manejar la carga de la imagen 

// ...

// Ruta para manejar la carga de imágenes
// Ruta para manejar la carga de imágenes
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Convierte el búfer a un flujo legible
    const stream = Readable.from(req.file.buffer);

    // Mensaje de texto que se superpondrá en la imagen
    const textOverlay = req.body.mensaje || 'TuTextoPredeterminado';

    // Sube la imagen a Cloudinary usando upload_stream
    const result = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: 'IDEC_Galery',
          public_id: req.file.originalname,
          resource_type: 'auto',
          overlay: `text:${textOverlay}`, // Agrega el texto superpuesto
          gravity: 'south', // Ajusta la posición del texto
          font_family: 'Arial', // Ajusta la fuente del texto
          font_size: 20 // Ajusta el tamaño del texto
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pasa el flujo a Cloudinary
      stream.pipe(cloudinaryStream);
    });

    console.log('Imagen subida a Cloudinary:', result);

    // Redirige a la página principal después de la carga
    res.redirect('/');
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary', error);
    res.status(500).send('Error interno del servidor');
  }
});
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

// Ruta para el inicio de sesión
// router.post('/signin', passport.authenticate('local-signin', { session: false }), async (req, res) => {
//   try {
//     const { username } = req.user;
//     const user = await userSchema.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado.' });
//     }
    
//     const token = jwt.sign({ id: user._id, rol: user.rol }, 'secret_key');
//     res.cookie('access_token', token, { httpOnly: true });
//     //res.redirect('/profile'); // Sin pasar el token como parámetro
//     console.log(token);
//     console.log(user);
//     res.json({token})
//   } catch (error) {
//     res.status(500).json({ error: 'Error al iniciar sesión.' });
//   }
// });




// Profile 
// isAuthenticated => Validate if Autenticate
router.get("/profile-admin", authenticateToken, (req, res, next) => {
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
router.get("/profile", authenticateToken, (req, res, next) => {
  res.render("profile")
  //res.json(data)

})

//Public
router.get("/publico", async (req, res, next) => {
  try {
    //Obtengo las imagenes de Claudimary 
    const images = await cloudinary.search
      .expression('folder:IDEC_Galery')
      .execute();

    //renderizo la vista con las imagenes 
    res.render('publico', { images: images.resources })
    
  } catch (error) {
    res.status(500).send("Error interno del Servidor.")
  }
})

// router.delete("/publico/:id", async (req, res) => { //Delete image of publication
//   const id = req.params.id
//   console.log(id);

//   try {
//     const all_id = await UploadModel.findByIdAndDelete({ _id: id })
//     console.log(all_id);

//     if (!all_id) {
//       res.json({
//         estado: false,
//         message: "No se pudo eliminar"
//       })

//     } else {
//       res.json({
//         estado: true,
//         message: "Eliminso"
//       })
//     }
//   } catch (error) {

//   }

// })

// Logaour 
router.get('/logout', function (req, res, next) {
  res.clearCookie('access_token');
  req.logout(function (err) {

    if (err) {
      return next(err);
    }
    res.redirect('login');
  });
});



function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}






module.exports = router;
// recorrer json whidt nodejs?

//
