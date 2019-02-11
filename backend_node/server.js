const http = require('http');
const app = require('./app');

// var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };

const port =  process.env.PORT || 8765;

// const server = https.createServer(options, app);
const server = http.createServer(app);
server.listen(port);