const mongoose = require('mongoose');


const URI =  'mongodb+srv://anonimo:cyber@anonimo.d9yhmae.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const conexion = mongoose.connection

module.exports = conexion