const express = require('express');
const path = require('path');
const router = require('./routes/index')
const expHBS = require('express-handlebars');


// Connection On server 
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.set('server', process.env.PORT || 5500)


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
router.use(express.static(path.join(__dirname, '/imagenes')));



// On Port: 
app.listen(app.get('server'), () => {
    console.log(`Server is Running ${app.get('server')}`);
})

app.use('/', router);
