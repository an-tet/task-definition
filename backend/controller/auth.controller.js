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
                    message: 'Email or password are incorrect'
                }
            });

        if (!bcrypt.compareSync(body.password, userDB.password))
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Email or password are incorrect'
                }
            });

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, {
            expiresIn: process.env.END_TOKEN
        });
        res.json({
            ok: true,
            message: 'All ok',
            user: userDB,
            token
        });
    });
};


const signin = (req, res) => {

    let body = req.body;


    if (body.password === body.confirmPassword) {
        let user = new User({
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
        });

        user.save((err, userDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err,
                });

            res.json({
                ok: true,
                message: 'All ok',
                user: userDB
            });
        });

    } else {
        res.status(400).json({
            ok: false,
            err: {
                message: 'The password no match'
            }
        })
    }
};

module.exports = {
    login,
    signin
};