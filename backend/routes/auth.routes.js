require('../middlewares/passport.middleware');
const express = require('express');
const app = express();
const {
    login,
    signin
} = require('../controller/auth.controller');

const passport = require('passport');

app.get('/login/facebook',
    passport.authenticate('facebook'));

app.get('/login/facebook',
    passport.authenticate('facebook')
);

app.get('/login/facebook/task',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {

        res.redirect('/home');
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});


app.get('/', (req, res) => {
    res.send('/');
});

// Validat5e login user
app.post('/login', login);

// Create user
app.post('/signin', signin);

module.exports = app;