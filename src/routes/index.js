const express = require('express');
const passport = require('passport');
const router = express.Router()
const book = 'Enoc_libro/LibrodeEnoc.pdf';
const path = require('path')
const userSchema = require("../models/user")
// Publiccaciones
const multer = require('multer');

const fs = require('fs');
//const user = require('../models/user');

//cloudonary
const cloudinary = require("cloudinary").v2
const streamifier = require('streamifier'); // Asegúrate de tener instalado 'streamifier'
const { Readable } = require('stream'); 
 
//
 // routes
 const AdminBro = require('admin-bro')
 const expressAdminBro = require('@admin-bro/express')
 const mongooseAdminBro = require('@admin-bro/mongoose')
 
 const user = require('../models/user');
 const conexion = require('../database');
 conexion.once('open', () => console.log("Connexion:  True"))
 conexion.on('error', () => console.log(`Connexion: False [ ${error} ]`))


// Views   Home 
router.get('/', (req, res, next) => {
  res.render('home', {isAdmin})
  // { currentUser: res.locals.currentUser }

});
 //Firebase COnfig

const admin = require('firebase-admin');
const axios = require('axios');

// Inicializar Firebase
var serviceAccount = require("../../serviceAccountKey.json");
const { hostname } = require('os');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://idec-98ffd.firebaseio.com/'
});



// Middleware para verificar la autenticación
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
});

router.get('/login/google', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/plus.login'];
  const state = 'some-random-state-string';
  
  const redirectUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=1074303537600-k97qggrkeih0apfchah4p2rhc3hl9htd.apps.googleusercontent.com&redirect_uri=${encodeURIComponent('https://iglesia-de-dios-finca-dos.onrender.com/auth/google/callback')}&scope=${scopes.join('%20')}&state=${state}`;
  
  res.redirect(redirectUrl);
});

router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  // Intercambio del código de autorización por un token de acceso
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';
  const tokenResponse = await axios.post(tokenEndpoint, {
    code: code,
    client_id: '1074303537600-k97qggrkeih0apfchah4p2rhc3hl9htd.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uri: `https://iglesia-de-dios-finca-dos.onrender.com/auth/google/callback`,
    grant_type: 'authorization_code',
  }); 

  const accessToken = tokenResponse.data.access_token;
  const idToken = tokenResponse.data.id_token;

  // Verificar el ID token con Firebase para obtener información del usuario
  const verifyIdTokenUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`;
  const { data } = await axios.get(verifyIdTokenUrl);

  // Aquí puedes utilizar la información del usuario para autenticar en Firebase
  const { sub, email, name, picture } = data;

  // Puedes usar la información para autenticar al usuario en Firebase
  // Por ejemplo, puedes guardar el UID en la sesión
  req.session.user = {
    uid: sub,
    email: email,
    name: name,
    picture: picture,
  };

  // Redirigir a la página de inicio o a donde desees
  res.redirect('/');
});

// Resto de tu código para configurar el servidor, sesión, etc.

// check is login  checkAuth
//dfglhbsubj

//COnfiguro cloudinary con mis credenciales 

cloudinary.config({
  cloud_name: 'dhxfbv30w',
  api_key: '479318794826922',
  api_secret: 'P_Yg8uY1vwdABFOk42LTcgA5h2U',
  //secure: true,  
});

//Middleware para verificar la autenticacion y el rol de admin
const isAdmin = (req, res, next) => {
  //verifica si el usuario esta Autenticado
  if (req.isAuthenticated()) {
    //Verifica si el Usuario es UN administrador
    if (req.user.rol === "Admin") {
      return next(); //Permite el access si es un usuario admini and autenticado
    }  else{
      res.status(403).send("Access prohivido no eres Admin");

    }
     
  }else{
    res.redirect('/')
  }
};

//Routing
 


//COnfiguro multer para manejar  los archivos
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
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
    //const textOverlay = req.body.mensaje || 'TuTextoPredeterminado';

    // Sube la imagen a Cloudinary usando upload_stream
    const result = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: 'IDEC_Galery',
          public_id: req.file.originalname,
          resource_type: 'auto',
          
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
// passport.authenticate

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));


  // userSchema
  //   .find()
  //   .then(data => {
  //     res.render("administrativo", { data: data.map(datos => datos.toJSON()) })
  //     //res.json(data)

  //   })
  //   .catch((error) => res.json({ mesagge: error }))
router.get('/admin-panel', isAdmin,(req, res) => {
  AdminBro.registerAdapter(mongooseAdminBro)
  const AdminBroOptions =  { resources: [user]}
  
  const adminBro = new AdminBro(AdminBroOptions)
  const routers = expressAdminBro.buildRouter(adminBro)
  router.use(adminBro.options.rootPath, routers)
  res.redirect('admin')
  })
 


//  IS redirect to profile
//VIEW USER ALL 
router.get("/profile", isAuthenticated, (req, res, next) => {
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
router.get('/logout', function (req, res, next) {
  res.clearCookie('access_token');
  res.clearCookie('__session')
  req.logout(function (err) {

    if (err) {
      return next(err);
    }
    res.redirect('signin');
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
