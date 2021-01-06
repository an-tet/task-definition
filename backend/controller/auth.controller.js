const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const generateJWT = require('../helpers/jwt');
const nodemailer = require("nodemailer");
const {
    json
} = require('body-parser');

const login = (req, res) => {
    let body = req.body;
    User.findOne({
        email: body.email
    }, async (err, userDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                message: err.error.msg
            });

        if (!userDB)
            return res.status(400).json({
                ok: false,
                message: 'Email or password are incorrect'
            });

        if (body.password != userDB.password)
            return res.status(400).json({
                ok: false,
                message: 'Email or password are incorrect'
            });

        let token = await generateJWT(userDB.id);
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
            password: body.password,
        });

        user.save((err, userDB) => {
            if (err) {
                const message = err.message;

                return res.status(400).json({
                    ok: false,
                    message
                });
            }

            res.json({
                ok: true,
                message: 'All ok',
                user: userDB
            });
        });

    } else {
        res.status(400).json({
            ok: false,
            message: 'The password no match'
        });
    }
};

const renewToken = (req, res) => {
    const id = req.userId.id;

    try {
        const user = User;
        user.findById(id, async (err, user) => {

            if (err)
                return res.status(401).json({
                    ok: false,
                    err
                });

            const token = await generateJWT(id);

            res.json({
                ok: true,
                user,
                token
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            err: {
                message: "An error occurred, talk to the administrator",
            }
        });
    }
};

const recoveryData = async (req, res) => {

    const email = req.body.email;
    const userModel = User;
    await userModel.findOne({
        email
    }, (err, user) => {
        if (err)
            return res.status(400).json({
                ok: false,
                err
            });

        if (!user)
            return res.status(404).json({
                ok: false,
                err: {
                    message: `The email '${email}' doesnt exist`
                }
            });

        sendEmail(res, email, user.password);
    });
};



const sendEmail = (res, email, password) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });



    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Login data recovery",
        text: `Login data:
  
            Email: ${email}
            Password: ${password}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.error.msg
            });
        } else {
            res.json({
                ok: true,
            });
        }
    });
};

module.exports = {
    login,
    signin,
    renewToken,
    recoveryData
};