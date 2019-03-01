const http = require('http');
const app = require('./app');
const https = require('https');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('certificates/client-key.pem'),
    cert: fs.readFileSync('certificates/client.crt')
};

const port = process.env.PORT || 8765;

// // const server = https.createServer(options, app);
// const server = http.createServer(app);
// server.listen(port);

https.createServer(options, app).listen(port);