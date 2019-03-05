// module.exports = errorHandler;

exports.errorHandler = (err, res) => {
    console.log(err);
    res.status(500).json({
        error: err
    });

};

// module.exports = validateAttributes;

exports.validateAttributes = (body, Schema, res) => {
    // console.log(Schema.schema.paths);

    var attributes = Object.keys(Schema.schema.paths).slice(1, -1)
    var flag = true;
    attributes.forEach(element => {
        if (!element.startsWith('loc')) {
            if (Schema.schema.paths[element].isRequired) {
                if (!Object.keys(body).includes(element)) {
                    // console.log(element)
                    flag = false
                }
            }
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