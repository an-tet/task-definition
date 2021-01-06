const Router = require('express');
const {
    login,
    signin,
    renewToken,
    recoveryData
} = require('../controller/auth.controller');
const validateJWT = require('../middlewares/validate.midddleware');

const routes = Router();

// const passport = require('passport');

// app.get('login/facebook/task',
//     passport.authenticate('facebook', {
//         failureRedirect: '/login',
//         session: false,
//     }),
//     function (req, res) {
//         res.redirect('/home');
//     });

// app.get('logout', (req, res) => {
//     res.redirect('/');
// });


// app.get('/', (req, res) => {

//     console.log('/ ' + req.isAuthenticated());
//     res.send('<a href= "/login/facebook/task">abrir</a>');
// });

// app.get('login', (req, res) => {
//     console.log();
// });

// Validat5e login user
routes.post('/login', login);

// Create user
routes.post('/signIn', signin);
routes.post('/recoveryData', recoveryData);

routes.get('/renewToken', validateJWT, renewToken);

module.exports = routes;