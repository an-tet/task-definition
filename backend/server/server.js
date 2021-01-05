require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(cors());

// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());


app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({
    extended: true
}));
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));

// Initialize Passport and restore authentication state, if any, from the
// session.
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(__dirname + '/public'));

//Global configuration for routes
app.use('/api', require('../routes/index.routes'));

// Run server
app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});


mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log('Base de datos online');
});


module.exports = {
    app
};