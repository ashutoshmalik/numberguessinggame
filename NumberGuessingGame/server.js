const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');

// define a default route
const originWhitelist = ['http://localhost:3000','http://localhost:8383'];

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// middleware route that all requests pass through
app.use((request, response, next) => {
    console.log('Server info: Request received');
    
    let origin = request.headers.origin;  
    // only allow requests from trusted origins
    if (originWhitelist.indexOf(origin) > -1) {
        response.header('Access-Control-Allow-Origin', origin);
    }
    
    // only allow get and post requests, separate methods by comma e.g. 'GET, POST'
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.header('Access-Control-Allow-Credentials', true);
  
    // push through to the proper route
    next();
});

require('./app/routes.js')(app);

// listen for requests 
var listener = app.listen(3000, () => {
    console.log("Game server is listening on "+ os.hostname() + ":" + listener.address().port);
});