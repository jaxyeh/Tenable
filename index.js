'use strict';

// Load Server instance
var server = require('./server');

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, next) {
    console.log(request.path, request.query);
    next();
});

// Start the Server
server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});
