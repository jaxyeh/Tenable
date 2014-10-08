var Hapi = require('hapi');
//var Config = require('./config');
var Routes = require('./routes');

// Database Parameters
var dbOpts = {
    "url": "localhost/test",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};

// Create a HTTP server with a host and port
var server = Hapi.createServer('localhost', 8080, { cors: true, debug: { request: ['error']} });

// Register custom MongoJS session database plugin
server.pack.register({
    plugin: require('./hapi-monk'),
    options: dbOpts
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