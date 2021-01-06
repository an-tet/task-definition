const express = require('express');
const app = express();

app.use('/project', require('../routes/project.routes'));
app.use('/auth', require('../routes/auth.routes'));

module.exports = app;