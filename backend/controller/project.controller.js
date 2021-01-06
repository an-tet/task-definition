const Project = require("../models/project.model");

const createProject = (req, res) => {
    const {
        title,
        description
    } = req.body.project;

    if (title === '')
        res.status(400).json({
            ok: false,
            message: 'The title field is required'
        });

    let project = new Project({
        title,
        description
    });


    project.save((err, projectDB) => {
        if (err) {
            const message = err.message;

            return res.status(400).json({
                ok: false,
                message
            });
        }

        res.json({
            ok: true,
            message: 'The project was created',
            user: projectDB
        });
    });

};

const getProjects = (req, res) => {
    Project.find({}, (err, projects) => {
        if (err) {
            const message = err.message;

            return res.status(400).json({
                ok: false,
                message
            });
        }

        res.json({
            ok: true,
            projects
        });
    });
};

module.exports = {
    createProject,
    getProjects
};