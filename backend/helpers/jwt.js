const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
                id
            },
            process.env.SEED, {
                expiresIn: "10h"
            },
            (err, token) => {
                return err ? reject(err) : resolve(token);
            }
        );
    });
};

module.exports = generateJWT;