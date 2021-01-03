const express = require('express');
const app = express();

app.use(require('../routes/task.routes'));
app.use(require('../routes/auth.routes'));



module.exports = app;