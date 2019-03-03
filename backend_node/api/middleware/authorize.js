// SOURCE: http://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api#users-folder

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authorize based on user role
        (req, res, next) => {
            // console.log(req);
            // console.log(roles)
            if (roles.length && !roles.includes(req.userData.role)) {
                // user's role is not authorized
                return res.status(401).json({
                    message: 'Unauthorized role'
                });
            }

            // authentication and authorization successful
            next();
        }
    ];
}