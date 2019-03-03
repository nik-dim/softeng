const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 
        const token = req.headers['x-observatory-auth'];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        // console.log(decoded);
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }
};