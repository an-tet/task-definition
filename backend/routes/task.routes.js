const express = require('express');
const app = express();
const home = require('../controller/task.controller');

app.get('/home', home);

module.exports = app;