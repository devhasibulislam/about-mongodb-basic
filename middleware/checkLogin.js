const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.PRIVATE_KEY);
        const { username, userID } = decode;
        req.userID = userID;
        req.username = username;
        next();
    } catch (error) {
        res.status(401).json({ error: "unauthorized credentials" })
    }
}

module.exports = checkLogin;