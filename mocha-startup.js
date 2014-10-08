var Routes = require('./routes');
var server; // Public variable for server instance

before(function(done) {

    // Load Server instance
    server = require('./server');

    // Register HTTP Routes
    server.route(Routes.endpoints);

    // Print some information about the incoming request for debugging purposes
    server.ext('onRequest', function (request, next) {
        console.log("       DEBUG - " + request.method + ':', request.path);
        next();
    });

    // Start Server
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