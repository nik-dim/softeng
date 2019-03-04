// module.exports = errorHandler;

exports.errorHandler = (err, res) => {
    console.log(err);
    res.status(500).json({
        error: err
    });

};

// module.exports = validateAttributes;

exports.validateAttributes = (body, Schema, res) => {
    var attributes = Object.keys(Schema.schema.paths).slice(1, -1)
    var flag = true;
    attributes.forEach(element => {
        if (!Object.keys(body).includes(element)) {
            flag = false
        }
    });
    if (flag) {
        return flag
    } else {
        res.status(400).json({
            message: 'Bad Request: Specify all attributes of Model'
        })
    }
}