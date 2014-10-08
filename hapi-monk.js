var monk = require('monk');

exports.register = function (plugin, options, next) {
    options.url = options.url || 'localhost:27017';

    var db = monk(options.url);

    plugin.expose('db', db);
    //plugin.expose('lib', mongodb);
    //plugin.expose('ObjectID', ObjectID);

    plugin.log([ 'hapi-mongojs', 'info' ], 'MongoDB Client connection created');

    next();
};

exports.register.attributes = {
    name: 'hapi-monk',
    version: '1.0.0',
    description: 'A simple Hapi Monk (MongoDB) Wrapper plugin.'
};