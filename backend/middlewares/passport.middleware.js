var express = require('express');
const app = express();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/login/facebook/task'
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login/facebook/task');
}
module.exports = {
    app,
    isLoggedIn
};