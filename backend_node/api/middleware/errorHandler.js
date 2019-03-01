// SOURCE: http://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api#users-folder

module.exports = errorHandler;

function errorHandler() {
    err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};