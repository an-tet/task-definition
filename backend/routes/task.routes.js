const express = require('express');
const app = express();
const {
    home,
    getTasks
} = require('../controller/task.controller');
const {
    isLoggedIn
} = require('../middlewares/passport.middleware');

app.get('api/home', home);

app.get('api/tasks', isLoggedIn, getTasks);

module.exports = app;