const Router = require('express');
const routes = Router();
const {
    createProject,
    getProjects
} = require('../controller/project.controller');
const validateJWT = require('../middlewares/validate.midddleware');

routes.get('/getProjects', validateJWT, getProjects);

routes.post('/createProject', validateJWT, createProject);

module.exports = routes;