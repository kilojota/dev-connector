const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // By using this function as a second parameter of a expressRouter GET request, we are privatizing the route (With Tokens as a authorization method.)

    // Get token from header ! Tokens are sent within the headers
    const token = req.header('x-auth-token');

    // Check if no token

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //console.log(decoded.user);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
