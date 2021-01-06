const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "There is no token in the request",
        });
    }

    try {
        const id = jwt.verify(token, process.env.SEED);
        req.userId = id;
        next();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: "Invalid taken",
        });
    }
};

module.exports = validateJWT;