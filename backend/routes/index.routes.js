const express = require('express');
const app = express();

app.use('/task', require('../routes/task.routes'));
app.use('/auth', require('../routes/auth.routes'));

module.exports = app;