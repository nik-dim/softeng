// module.exports = checkBlacklist;
const Blacklist = require('../models/blacklist');


module.exports = (req, res, next) => {
    try {
        const temp = req.headers['x-observatory-auth'];
        Blacklist.find({
                token: temp
            })
            .exec()
            .then(result => {
                if (result.length >= 1) {
                    return res.status(409).json({
                        message: "Token in Blacklist"
                    });
                } else {
                    next();
                }
            });
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};