const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const login = (req, res) => {
    let body = req.body;

    User.findOne({
        email: body.email
    }, (err, userDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        if (!userDB)
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o clave incorrectos'
                }
            });

        if (!bcrypt.compareSync(body.password, userDB.password))
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (clave) incorrectos'
                }
            });

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, {
            expiresIn: process.env.END_TOKEN
        });
        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
};


const signin = (req, res) => {

    let body = req.body;

    let user = new User({
        user: body.user,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email
    });

    user.save((err, userDB) => {
        if (err)
            return res.status(400).json({
                ok: false,
                err,
            });

        res.json({
            ok: true,
            user: userDB
        });
    });
};

module.exports = {
    login,
    signin
};