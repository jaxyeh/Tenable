var server; // Public variable for server instance

before(function(done) {
    server = require('./server');
    // Print some information about the incoming request for debugging purposes
    server.ext('onRequest', function (request, next) {
        console.log("       DEBUG - " + request.method + ':', request.path);
        next();
    });
    server.start(function () {
        console.log('Web Server started at: ' + server.info.uri);
        done();
    });
});

after(function(done){
    server.stop(function () {
        console.log('Web Server stopped');
        done();
    });
});