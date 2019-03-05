const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const cors = require('cors');
const config = require('config');

let productRoutes = require('./api/routes/products');
let shopRoutes = require('./api/routes/shop');
let priceRoutes = require('./api/routes/price');
let userRoutes = require('./api/routes/user');

let connection = mongoose.connect(
    config.DBHost,
    {
        useNewUrlParser: true
    }
);

// support only simple bodies
app.use(bodyParser.urlencoded({
    extended: false
}));

if (config.util.getEnv('NODE_ENV') !== 'test') {
    // use morgan to log at command line
    app.use(morgan('dev')); //'combined' outputs the Apache style LOGs
}

// make json easily readable
app.use(bodyParser.json());
app.use(cors())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // *: give acces to all origins
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Request-With, Content-Type, Accept, Authorization, X-OBSERVATORY-AUTH'
//     );

//     if (req.method === 'OPTIONS') {
//         req.header(
//             'Access-Control-Allow-Methods',
//             'PUT, POST, PATCH, DELETE, GET'
//         );
//         return res.status(200).json({});
//     }
//     next();
// });


// Routes which should handle requests
app.use('/observatory/api/products', productRoutes);
app.use('/observatory/api/', userRoutes);
app.use('/observatory/api/shops', shopRoutes);
app.use('/observatory/api/prices', priceRoutes);

// if you reach this we have an error
// ERROR handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;
