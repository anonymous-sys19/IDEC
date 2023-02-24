const express = require('express');
const path = require('path');
const router = require('./routes/index')
const expHBS = require('express-handlebars');
const cors = require('cors');
const cookieSession = require("cookie-session");
const dbConfig = require("./config/db.config");
const db = require("./models");

// Connection On server 
const app = express()

//config
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// new config  

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.set('server', process.env.PORT || 5500)
// cookiee configure
app.use(
    cookieSession({
        name: "anonimo-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);


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
//Configure database 


const Role = db.role;

db.mongoose
    .connect('mongodb+srv://anonimo:cyber@anonimo.d9yhmae.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//Routes config
app.use('/', router);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

//Configuration dbmongoosedb

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}


// On Port: 
app.listen(app.get('server'), () => {
    console.log(`Server is Running ${app.get('server')}`);
})
