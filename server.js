var Hapi = require('hapi');
//var Config = require('./config');
var Routes = require('./routes');
var pack = require('./package'),
    swaggerOptions = {
        basePath: 'http://localhost:8080',
        apiVersion: pack.version,
        pathPrefixSize: 2
    };

// Database Parameters
var dbOptions = {
    "url": "localhost/test",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

// Create a HTTP server with a host and port
var server = Hapi.createServer('localhost', 8080, { cors: true, debug: { request: ['error']} });

// Register Swagger API Documentation
server.pack.register({
    plugin: require('hapi-swagger'),
    options: swaggerOptions
}, function (err) {
    if (err) {
        server.log(['error'], 'Plugin "hapi-swagger" load error: ' + err)
    }else{
        server.log(['start'], 'Swagger interface loaded')
    }
});


// Register custom MongoJS session database plugin
server.pack.register({
    plugin: require('./hapi-monk'),
    options: dbOptions
}, function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
        throw err;
    }
});

// Register HTTP Routes
server.route(Routes.endpoints);

if (!module.parent) {
    server.start(function() {
        var message = 'API started at: ' + server.info.uri;
        console.log(message);
    });
}

module.exports = server;