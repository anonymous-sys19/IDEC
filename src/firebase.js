// Importa las funciones necesarias de los SDK que necesitas
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene el objeto de autenticación
const auth = getAuth(app);

// Exporta el objeto auth para que pueda ser requerido en otros archivos
module.exports = { auth };

