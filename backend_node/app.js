const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const shopRoutes = require('./api/routes/shop');
const priceRoutes = require('./api/routes/price');


const connection = mongoose.connect(
    // "mongodb://localhost:27017/softeng",
    "mongodb://admin:" + 
        process.env.MONGO_ATLAS_PW +
        "@cluster0-shard-00-00-sw2bo.mongodb.net:27017,cluster0-shard-00-01-sw2bo.mongodb.net:27017,cluster0-shard-00-02-sw2bo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    {
        // useMongoClient: true
        useNewUrlParser: true
    }
);

// autoIncrement.initialize(connection);
// mongoose.Promise = global.Promise;


app.use(morgan('dev'));
// support only simple bodies
app.use(bodyParser.urlencoded({extended: false}));
// make json easily readable
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // *: give acces to all origins
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Request-With, Content-Type, Accept, Authroization'
    );
    
    if (req.method === 'OPTIONS'){
        req.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
            );
        return res.status(200).json({});
    } 
    next();  
});


// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/shops', shopRoutes);
app.use('/prices', priceRoutes);


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