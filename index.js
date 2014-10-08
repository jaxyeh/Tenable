'use strict';

// Load Server instance
var server = require('./server'),
    BasicAuth = require('hapi-auth-basic'),
    Users = require('./models/Users'),
    Routes = require('./routes');

// Register Basic Auth
server.pack.register(BasicAuth, function (err) {

    // Setup Basic Auth strategy
    server.auth.strategy('simple', 'basic', 'required', {validateFunc: Users.validate});

    // Register HTTP Routes
    server.route(Routes.endpoints);

    // Print some information about the incoming request for debugging purposes
    server.ext('onRequest', function (request, next) {
        console.log(request.path, request.query);
        next();
    });

    // Start Server
    server.start(function () {
        console.log('Server started at: ' + server.info.uri);
    });

});

/**
 * An alternative example approach using cookie session
 *
 * May requires to run `npm install hapi-auth-cookie --save`
 */

//server.pack.register(require('hapi-auth-cookie'), function (err) {
//
//    // Session Auth
//    server.auth.strategy('session', 'cookie', 'required', {
//        password: 'secret',
//        cookie: 'tenable-session',
//        redirectTo: false,
//        isSecure: false
//    });
//
//    // Register HTTP Routes
//    server.route(Routes.endpoints);
//
//    // Print some information about the incoming request for debugging purposes
//    server.ext('onRequest', function (request, next) {
//        console.log(request.path, request.query);
//        next();
//    });
//
//    // Start Server
//    server.start(function () {
//        console.log('Server started at: ' + server.info.uri);
//    });
//
//});
