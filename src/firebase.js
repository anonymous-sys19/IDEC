// Importa las funciones necesarias de los SDK que necesitas
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgqy1AOY0Y-F0tj7s4AvkGIwSEt89pDYg",
  authDomain: "idec-98ffd.firebaseapp.com",
  projectId: "idec-98ffd",
  storageBucket: "idec-98ffd.appspot.com",
  messagingSenderId: "510282474556",
  appId: "1:510282474556:web:8f656b96ea3205a6e3cf39",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene el objeto de autenticación
const auth = getAuth(app);

// Exporta el objeto auth para que pueda ser requerido en otros archivos
module.exports = { auth };

