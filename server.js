var Hapi = require('hapi'),
    Config = require('./config.json');
    pack = require('./package'),
    swaggerOptions = {
        basePath: 'http://' + Config.server.hostname + ':' + Config.server.port,
        apiVersion: pack.version,
        pathPrefixSize: 2
    },
    dbOptions = {
        "url": Config.mongo.url + "/" + Config.mongo.db,
        "settings": {
            "db": {
                "native_parser": false
            }
        }
    };

// Create a HTTP server with a host and port
var server = Hapi.createServer(Config.server.hostname, Config.server.port, { cors: true, debug: { request: ['error']} });

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

// If its not a module, fire away the server
if (!module.parent) {
    // Register HTTP Routes
    server.route(require('./routes').endpoints);
    // Start Server
    server.start(function () {
        var message = 'API started at: ' + server.info.uri;
        console.log(message);
    });
}

module.exports = server;